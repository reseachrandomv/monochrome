# MONOCHROME — demo fashion boutique
Static HTML/CSS/JS demo by Malaak. **All products, prices, contacts and the brand are fictional demo content.**

Files: `index.html` (home), `shop.html` (search + filters), `product.html?id=…`, `checkout.html` (bag + checkout), `data.js` (products — edit here), `app.js` (cart, UI, effects), `style.css`.
- WhatsApp number: change `WA` at the top of `app.js`.
- Cart is saved in the browser's localStorage. Orders are **not** stored or charged; the confirmation offers a WhatsApp message with the order.
- Easter egg: press **L** (or type "mono", or tap "psst" in the footer) for Lookbook mode.

## Going live with real payments
1. **Pick a gateway.** Maldives: BML Connect (Bank of Maldives) or MIB payment gateway; international: Stripe or PayPal. Never take card numbers in your own form.
2. **Add a small backend** (e.g. Netlify/Vercel/Cloudflare Functions). The browser sends the cart (product ids + qty) to it; the backend looks up the **real prices from a database**, creates a payment/checkout session with the gateway's secret key (kept as an environment variable, never in this repo), and returns the hosted payment URL.
3. **Redirect** the customer to the gateway's hosted page, then back to a success page.
4. **Confirm with a webhook** from the gateway before marking the order paid and sending emails.
5. **Store orders & stock** in a database (Supabase, Firebase, Airtable) and decrement inventory on paid orders.
6. Or skip custom code: move the catalogue to Shopify / Shopify Lite buy buttons, or WooCommerce, which include payments and inventory.

## Hosting
GitHub Pages serves this repo's `main` branch. Push changes and the site updates in 1–2 minutes.
