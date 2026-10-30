// DEMO WhatsApp number — replace with the boutique's real number (country code, digits only)
const WA="9600000000";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>"MVR "+n.toLocaleString("en-US");
const byId=id=>PRODUCTS.find(p=>p.id===id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* ---------- cart (localStorage) ---------- */
const Cart={
  get(){try{return JSON.parse(localStorage.getItem("mono_cart"))||[]}catch{return[]}},
  set(c){localStorage.setItem("mono_cart",JSON.stringify(c));renderCart()},
  add(id,size,color,qty){const c=this.get();const k=`${id}|${size}|${color}`;const f=c.find(i=>i.k===k);f?f.qty+=qty:c.push({k,id,size,color,qty});this.set(c)},
  qty(k,d){const c=this.get();const f=c.find(i=>i.k===k);if(!f)return;f.qty=Math.max(1,Math.min(10,f.qty+d));this.set(c)},
  rm(k){this.set(this.get().filter(i=>i.k!==k))},
  total(){return this.get().reduce((s,i)=>s+byId(i.id).price*i.qty,0)},
  count(){return this.get().reduce((s,i)=>s+i.qty,0)}
};
/* ---------- shell ---------- */
function shell(){
  const page=document.body.dataset.page;
  const ann="Free island delivery over MVR 1,500 (demo) ✦ Demo store — no real payments ✦ New season: SS27 Monochrome ✦ ";
  document.body.insertAdjacentHTML("afterbegin",`<div class="pt"><span>Mono</span></div><div class="cur"></div>
<div class="ann"><div>${ann.repeat(6)}</div></div>
<header><a class="logo" href="index.html">Monochrome®</a>
<nav><a href="shop.html" class="${page==="shop"?"on":""}">Shop</a><a href="shop.html?c=men">Men</a><a href="shop.html?c=women">Women</a><a href="shop.html?c=accessories">Accessories</a><a href="shop.html?c=sale">Sale</a></nav>
<div class="hd-r"><button class="mnav-btn">Menu</button><button class="bag-btn" data-cursor="Bag">Bag<b>0</b></button></div></header>
<div class="mnav"><button>Close</button><a href="index.html">Home</a><a href="shop.html">Shop all</a><a href="shop.html?c=men">Men</a><a href="shop.html?c=women">Women</a><a href="shop.html?c=accessories">Accessories</a><a href="shop.html?c=sale">Sale</a></div>`);
  document.body.insertAdjacentHTML("beforeend",`<footer><div class="fl">
<div><h4>Shop</h4><ul><li><a href="shop.html?c=new">New arrivals</a></li><li><a href="shop.html?c=men">Men</a></li><li><a href="shop.html?c=women">Women</a></li><li><a href="shop.html?c=sale">Sale</a></li></ul></div>
<div><h4>Help</h4><ul><li><a href="checkout.html">Bag &amp; checkout</a></li><li><a class="wa" href="#" target="_blank" rel="noopener">WhatsApp us</a></li><li><a href="mailto:hello@example.com">hello@example.com (demo)</a></li></ul></div>
<div><h4>Follow</h4><ul><li><a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://www.tiktok.com/" target="_blank" rel="noopener">TikTok</a></li><li><a href="https://www.pinterest.com/" target="_blank" rel="noopener">Pinterest</a></li></ul></div>
<div><h4>Studio (demo)</h4><ul><li>Sample Street, Malé</li><li>Maldives</li><li><button class="secret" data-lookbook>psst… press L</button></li></ul></div></div>
<div class="huge">Monochrome</div>
<div class="legal"><span>© <span class="yr"></span> Monochrome — fictional demo brand</span><span>Photos: Unsplash · Site by Malaak</span></div></footer>
<div class="scrim"></div><aside class="drawer" aria-label="Shopping bag"><div class="dh"><h3>Your bag</h3><button class="x">Close</button></div><div class="items"></div><div class="df"><div class="tot"><span>Subtotal</span><span class="st">MVR 0</span></div><a class="pill dark" href="checkout.html">Checkout →</a></div></aside>
<div class="lb" role="dialog" aria-label="Lookbook"><div class="lb-top"><span>Lookbook mode — SS27</span><button class="lbx">Exit ✕</button></div><div class="lb-stage">${LOOKBOOK.map((p,i)=>`<img src="${I(p,1100)}" alt="Lookbook ${i+1}" loading="lazy">`).join("")}<div class="lb-word">Look 01</div></div><div class="lb-nav"><button class="lbp">← Prev</button><span class="lbn">1 / ${LOOKBOOK.length}</span><button class="lbnx">Next →</button></div></div>
<div class="toast"></div>`);
  $$(".yr").forEach(e=>e.textContent=new Date().getFullYear());
  $$(".wa").forEach(a=>a.href=`https://wa.me/${WA}?text=${encodeURIComponent("Hi Monochrome, I have a question about an order.")}`);
  $(".mnav-btn").onclick=()=>$(".mnav").classList.add("open");
  $(".mnav button").onclick=()=>$(".mnav").classList.remove("open");
  $(".bag-btn").onclick=openCart;$(".scrim").onclick=closeCart;$(".x").onclick=closeCart;
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeLB()}});
  renderCart();
}
const openCart=()=>document.body.classList.add("cart-open"),closeCart=()=>document.body.classList.remove("cart-open");
function toast(t){const e=$(".toast");e.textContent=t;e.classList.add("show");clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove("show"),2400)}
function itemHTML(i,edit=true){const p=byId(i.id);if(!p)return"";return `<div class="it"><img src="${I(p.imgs[0],200)}" alt="${esc(p.name)}"><div><h5>${esc(p.name)}</h5><small>${esc(i.size)} · ${esc(i.color)}</small>${edit?`<div class="qty"><button data-q="-1" data-k="${esc(i.k)}" aria-label="Decrease">−</button><span>${i.qty}</span><button data-q="1" data-k="${esc(i.k)}" aria-label="Increase">+</button></div><br><button class="rm" data-rm="${esc(i.k)}">Remove</button>`:`<small>Qty ${i.qty}</small>`}</div><span>${money(p.price*i.qty)}</span></div>`}
function renderCart(){
  const c=Cart.get().filter(i=>byId(i.id));const n=Cart.count();
  const b=$(".bag-btn b");if(b){b.textContent=n;}
  const box=$(".drawer .items");if(box)box.innerHTML=c.length?c.map(i=>itemHTML(i)).join(""):`<p class="empty">Your bag is empty.</p>`;
  const st=$(".drawer .st");if(st)st.textContent=money(Cart.total());
  if(document.body.dataset.page==="checkout")renderCheckout();
}
document.addEventListener("click",e=>{const q=e.target.closest("[data-q]");if(q)Cart.qty(q.dataset.k,+q.dataset.q);const r=e.target.closest("[data-rm]");if(r)Cart.rm(r.dataset.rm);if(e.target.closest("[data-lookbook]"))openLB()});
/* ---------- cursor, reveals, transitions ---------- */
function fx(){
  const cur=$(".cur");let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;
  if(matchMedia("(pointer:fine)").matches){
    addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY});
    (function loop(){cx+=(x-cx)*.2;cy+=(y-cy)*.2;cur.style.left=cx+"px";cur.style.top=cy+"px";requestAnimationFrame(loop)})();
    document.addEventListener("mouseover",e=>{const t=e.target.closest(".pc,[data-cursor],.col");cur.classList.toggle("big",!!t);cur.textContent=t?(t.dataset.cursor||(t.classList.contains("pc")?"View":"Shop")):""});
  }
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}}),{threshold:.12});
  window.observe=()=>$$(".rv:not(.in),.clip:not(.in)").forEach(el=>io.observe(el));observe();
  // manifesto word lighting
  const m=$(".manifesto p");if(m){m.innerHTML=m.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(" ");
    const ws=$$(".w",m);const on=()=>{const r=m.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.3)));const k=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle("lit",i<k))};addEventListener("scroll",on,{passive:true});on();}
  // page transitions
  const pt=$(".pt");requestAnimationFrame(()=>setTimeout(()=>pt.classList.add("gone"),60));
  addEventListener("pageshow",e=>{if(e.persisted)pt.classList.add("gone")});
  document.addEventListener("click",e=>{const a=e.target.closest("a");if(!a||a.target||e.metaKey||e.ctrlKey)return;const h=a.getAttribute("href");if(!h||h.startsWith("#")||h.startsWith("http")||h.startsWith("mailto")||h.startsWith("tel"))return;
    e.preventDefault();pt.classList.add("enter");pt.classList.remove("gone");void pt.offsetWidth;pt.classList.remove("enter");setTimeout(()=>location.href=h,650)});
}
/* ---------- lookbook easter egg: press L, or type "mono", or tap the footer link ---------- */
let lbi=0;
function lbShow(i){const im=$$(".lb-stage img");lbi=(i+im.length)%im.length;im.forEach((m,j)=>m.classList.toggle("on",j===lbi));$(".lb-word").textContent="Look "+String(lbi+1).padStart(2,"0");$(".lbn").textContent=`${lbi+1} / ${im.length}`}
function openLB(){$(".lb").classList.add("open");lbShow(0);toast("✦ You found Lookbook mode");}
function closeLB(){$(".lb")&&$(".lb").classList.remove("open")}
function lbInit(){$(".lbx").onclick=closeLB;$(".lbp").onclick=()=>lbShow(lbi-1);$(".lbnx").onclick=()=>lbShow(lbi+1);
  let typed="";document.addEventListener("keydown",e=>{if(/input|textarea|select/i.test(e.target.tagName))return;
    if($(".lb.open")){if(e.key==="ArrowRight")lbShow(lbi+1);if(e.key==="ArrowLeft")lbShow(lbi-1);return}
    if(e.key.toLowerCase()==="l")openLB();typed=(typed+e.key).slice(-4).toLowerCase();if(typed==="mono")openLB()});
  let sx=0;$(".lb-stage").addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});$(".lb-stage").addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)lbShow(lbi+(d<0?1:-1))});
  $(".lb-stage").addEventListener("click",()=>lbShow(lbi+1));}
/* ---------- product cards ---------- */
function card(p){const t=p.tags.includes("sale")?'<span class="tag sale">Sale</span>':p.tags.includes("new")?'<span class="tag">New</span>':"";
  return `<a class="pc rv" href="product.html?id=${p.id}">${""}<div class="im">${t}<img src="${I(p.imgs[0],700)}" alt="${esc(p.name)}" loading="lazy"><img src="${I(p.imgs[1],700)}" alt="" loading="lazy"></div><div class="row"><span>${esc(p.name)}</span><span>${p.was?`<s>${money(p.was)}</s>`:""}${money(p.price)}</span></div><div class="cat">${p.cat}</div></a>`}
/* ---------- pages ---------- */
const pages={
 home(){$("#new").innerHTML=PRODUCTS.filter(p=>p.tags.includes("new")).slice(0,4).map(card).join("");
  $("#best").innerHTML=PRODUCTS.filter(p=>p.tags.includes("best")).slice(0,4).map(card).join("");
  $("#nl").onsubmit=e=>{e.preventDefault();const v=$("#nl input").value.trim();const m=$("#nlm");
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){m.textContent="Please enter a valid email.";return}
   m.textContent="Thanks! (Demo: this email was not saved — connect Mailchimp or Klaviyo to collect sign-ups.)";e.target.reset()}},
 shop(){const qs=new URLSearchParams(location.search);let cat=qs.get("c")||"all",q=qs.get("q")||"";
  const inp=$("#q");inp.value=q;
  const draw=()=>{$$(".chip").forEach(c=>c.classList.toggle("on",c.dataset.c===cat));
   const list=PRODUCTS.filter(p=>(cat==="all"||p.cat===cat||p.tags.includes(cat))&&(p.name+" "+p.desc+" "+p.cat).toLowerCase().includes(q.toLowerCase()));
   $("#grid").innerHTML=list.length?list.map(card).join(""):`<p class="empty">Nothing matches “${esc(q)}”.</p>`;
   $("#cnt").textContent=`${list.length} piece${list.length===1?"":"s"}`;$("#t").textContent={all:"Shop",men:"Men",women:"Women",accessories:"Accs.",new:"New in",sale:"Sale"}[cat]||"Shop";
   history.replaceState(null,"",`?c=${cat}${q?`&q=${encodeURIComponent(q)}`:""}`);observe()};
  $$(".chip").forEach(c=>c.onclick=()=>{cat=c.dataset.c;draw()});inp.oninput=()=>{q=inp.value;draw()};draw()},
 product(){const p=byId(new URLSearchParams(location.search).get("id"))||PRODUCTS[0];document.title=`${p.name} — Monochrome (demo)`;
  let size="",color=p.colors.length===1?p.colors[0]:"",qty=1;
  $("#pd").innerHTML=`<div class="gal"><div class="main"><img id="mi" src="${I(p.imgs[0],1200)}" alt="${esc(p.name)}"></div><div class="thumbs">${p.imgs.map((m,i)=>`<button class="${i?"":"on"}" data-i="${i}" aria-label="Image ${i+1}"><img src="${I(m,200)}" alt=""></button>`).join("")}</div></div>
  <div class="info"><p class="cat" style="font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--g)">${p.cat} · demo product</p><h1>${esc(p.name)}</h1><p class="price">${p.was?`<s>${money(p.was)}</s>`:""}${money(p.price)}</p><p>${esc(p.desc)}</p>
  <span class="lbl">Size</span><div class="opts" id="sz">${p.sizes.map(s=>`<button>${s}</button>`).join("")}</div>
  <span class="lbl">Colour</span><div class="opts" id="cl">${p.colors.map(c=>`<button class="${c===color?"on":""}">${c}</button>`).join("")}</div>
  <span class="lbl">Quantity</span><div class="qty"><button id="qm" aria-label="Decrease">−</button><span id="qv">1</span><button id="qp" aria-label="Increase">+</button></div>
  <div class="err" id="perr"></div><button class="pill dark add" id="add">Add to bag — ${money(p.price)}</button>
  <p style="font-size:.8rem;color:var(--g);margin-top:1rem">Sample product and price for demonstration. Free returns within 14 days (demo policy).</p></div>`;
  $$(".thumbs button").forEach(b=>b.onclick=()=>{$$(".thumbs button").forEach(x=>x.classList.remove("on"));b.classList.add("on");const mi=$("#mi");mi.style.opacity=0;setTimeout(()=>{mi.src=I(p.imgs[b.dataset.i],1200);mi.style.opacity=1},200)});
  const pick=(id,set)=>$$(`#${id} button`).forEach(b=>b.onclick=()=>{$$(`#${id} button`).forEach(x=>x.classList.remove("on"));b.classList.add("on");set(b.textContent);$("#perr").textContent=""});
  pick("sz",v=>size=v);pick("cl",v=>color=v);
  $("#qm").onclick=()=>{qty=Math.max(1,qty-1);$("#qv").textContent=qty};$("#qp").onclick=()=>{qty=Math.min(10,qty+1);$("#qv").textContent=qty};
  $("#add").onclick=()=>{if(!size||!color){$("#perr").textContent=!size?"Please choose a size.":"Please choose a colour.";return}
   Cart.add(p.id,size,color,qty);const b=$(".bag-btn");b.classList.add("pop");setTimeout(()=>b.classList.remove("pop"),300);openCart()};
  $("#rel").innerHTML=PRODUCTS.filter(x=>x.id!==p.id&&x.cat===p.cat).slice(0,4).map(card).join("")},
 checkout(){renderCheckout();
  $("#co").onsubmit=e=>{e.preventDefault();const f=e.target;let ok=true;
   const chk=(n,test,msg)=>{const el=f[n];const good=test((el.value||"").trim());el.classList&&el.classList.toggle("bad",!good);$(`[data-e=${n}]`).textContent=good?"":msg;if(!good)ok=false};
   chk("fname",v=>v.length>1,"Enter your full name.");chk("email",v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),"Enter a valid email.");
   chk("phone",v=>/^\+?[0-9\s-]{7,15}$/.test(v),"Enter a valid phone number.");chk("address",v=>v.length>5,"Enter your delivery address.");chk("island",v=>v.length>1,"Enter island / city.");
   const pay=f.querySelector("input[name=pay]:checked");$("[data-e=pay]").textContent=pay?"":"Choose a payment method.";if(!pay)ok=false;
   const items=Cart.get().filter(i=>byId(i.id));if(!items.length){$("[data-e=pay]").textContent="Your bag is empty.";ok=false}
   if(!ok){const b=f.querySelector(".bad");b&&b.scrollIntoView({behavior:"smooth",block:"center"});return}
   const ref="MC-"+Date.now().toString(36).toUpperCase().slice(-6);
   const lines=items.map(i=>`• ${byId(i.id).name} (${i.size}, ${i.color}) x${i.qty} — ${money(byId(i.id).price*i.qty)}`).join("\n");
   const msg=`New order ${ref} — Monochrome\n${lines}\nSubtotal: ${money(Cart.total())} (delivery fee confirmed on WhatsApp)\nName: ${f.fname.value}\nPhone: ${f.phone.value}\nEmail: ${f.email.value}\nAddress: ${f.address.value}, ${f.island.value}\nPayment: ${pay.value}`;
   const total=money(Cart.total());
   $("#main").innerHTML=`<div class="done"><p class="lbl" style="color:var(--g)">Demo order — no payment taken</p><h1 class="rv">Thank<br><span class="serif">you,</span> ${esc(f.fname.value.split(" ")[0])}</h1><p class="ref">Reference ${ref} · ${total}</p>
    <p style="max-width:520px;margin:0 auto 2rem">This is a demonstration store: nothing was charged and the order is not stored. To place it for real, send it to the boutique on WhatsApp.</p>
    <a class="pill dark" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">Send order on WhatsApp</a> <a class="pill ghost" href="shop.html">Keep shopping</a></div>`;
   Cart.set([]);observe();scrollTo(0,0)}}
};
function renderCheckout(){const box=$("#sumitems");if(!box)return;const c=Cart.get().filter(i=>byId(i.id));
  box.innerHTML=c.length?c.map(i=>itemHTML(i)).join(""):`<p class="empty" style="font-size:1.4rem;padding:2rem 0">Your bag is empty — <a href="shop.html" style="text-decoration:underline">shop now</a>.</p>`;
  const st=Cart.total(),ship=st>=1500||st===0?0:75;$("#sst").textContent=money(st);$("#ssh").textContent=ship?money(ship):"Free";$("#stt").textContent=money(st+ship)}
document.addEventListener("DOMContentLoaded",()=>{shell();lbInit();fx();const p=pages[document.body.dataset.page];p&&p();observe()});
