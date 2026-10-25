# TEMO EXCHANGE — Prototype

A mobile-friendly front-end prototype for an agricultural marketplace supporting cash, barter, and mixed offers.

## Current prototype features
- Marketplace with search and filters
- Sample agricultural listings
- Create listing form
- Saved listings
- Match requests and offer/trade flow
- Basic admin verification desk
- Responsive layout for mobile devices

## Important limitations
This is a prototype, not a production trading platform. Demo data is stored in the browser using localStorage, so it is not shared between devices and may be lost if browser storage is cleared. Sample listings are demonstration records and are not verified real offers.

There is no production user authentication, shared online database, server-side moderation, payment processing, escrow, or token functionality in this version. Do not enter sensitive or real financial information.

## Publish with GitHub Pages
1. Sign in to GitHub and create a **new public repository** named `temo-exchange`.
2. Upload `index.html` and this `README.md` to the repository's root (top-level folder).
3. Open the repository's **Settings**.
4. Select **Pages**.
5. Under the build/deployment section, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Wait for GitHub Pages to finish deploying. The site address will usually be:
   `https://YOUR-GITHUB-USERNAME.github.io/temo-exchange/`
8. Replace `YOUR-GITHUB-USERNAME` with your GitHub username.

## Suggested next development phase
Before launching for real users, add a secure backend and shared database, account registration and login, image storage, server-side validation, listing moderation, audit logs, and secure trade/offer workflows. Payment, escrow, or token features must not be enabled until applicable legal and regulatory requirements have been reviewed.
