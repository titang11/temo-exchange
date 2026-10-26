# TEMO Exchange

TEMO Exchange is an agricultural marketplace for cash, barter and mixed offers. The current app is hosted on GitHub Pages and uses Supabase for authentication, shared data, access control and transaction workflows.

## Open the app

https://titang11.github.io/temo-exchange/

## Current features

- Marketplace listings with search, location and trade-type filters.
- Stock tracking, cost per unit, minimum order quantity, availability date and expected harvest date.
- Saved listings and “I have / I need” matching.
- Wanted-product alerts when a published listing matches an active need preference.
- Offers and trades, with both parties confirming completion.
- Connected agricultural service orders for harvesting, machinery, processing, packaging, storage, transport and delivery.
- Service quote submission and approval; order delivery completes only after the customer and seller both confirm.
- Payment records linked to accepted/completed offers. The other transaction party must confirm or dispute a recorded payment.
- Finance dashboard separating confirmed cash received, cash due, barter estimates, costs and expenses.
- Expenses can be linked to an agricultural service order.
- Group purchasing requests for cooperatives and buyers who want to combine demand.
- Community feed with member updates, public listings and sourced agricultural resources.
- Accepted connections and one-way follows.
- User reporting and restricted, audited moderation of reported posts.
- Staff-only direct/group messages and official announcements.
- Administrator-created staff invitations through a protected Supabase Edge Function.
- Password reset and signed-in password change.
- Account opening/KYC workflow, separate email/phone/address statuses, and profile-change review.
- Role-restricted account review, verification and administrator workspaces.
- Responsive Android/mobile layout.

## Security and privacy rules

- New listings require approval before publication.
- User access is enforced by Supabase Row Level Security (RLS), not only by hidden UI controls.
- Administrators can manage public marketplace listings and platform operations.
- Administrators do not have blanket access to community stories or private staff conversations. Moderation leads can review specifically reported posts through a restricted, audited workflow.
- Staff messaging is limited to authorised staff accounts and conversation members.
- Staff accounts are invited by an administrator. Staff set their own password from the invitation email; no shared initial password is displayed.
- The admin-create-staff Edge Function uses server-side Supabase credentials. Never place a Supabase service-role key in index.html or any public repository file.

## Important limitations

- **Payments are records only.** TEMO does not move money, verify a bank/mobile-money transfer automatically, provide escrow or process refunds. The other transaction party must confirm or dispute a recorded payment.
- Barter values are estimates and must not be treated as cash income.
- Phone and address statuses show submission/review state; automated phone OTP and official identity-document verification are not implemented.
- Agricultural news and knowledge resources are not automatically imported. An administrator must publish a resource with a real source and URL.
- The new workflows have passed JavaScript syntax checks and database/RLS checks, but still need end-to-end testing with separate member, seller, buyer, service-provider, reviewer and administrator accounts before public commercial use.
- Supabase's leaked-password protection setting is currently reported as disabled. Enable it in the Supabase Auth security settings before launch.
- Existing sample listings are illustrative. Verify listing quality, stock, identity and commercial terms before any real transaction.

## Staff account setup

The protected **Staff messages** workspace contains the staff invitation form for administrators. The deployed Supabase Edge Function is **admin-create-staff**; its source is in **supabase/functions/admin-create-staff/index.ts**.

Make sure the Supabase Auth URL configuration allows this redirect URL:

https://titang11.github.io/temo-exchange/

The function requires a valid signed-in administrator session. It does not allow staff roles to be assigned from public registration.

## Deployment

GitHub Pages deploys the root index.html automatically from the configured branch. Supabase schema changes and the admin-create-staff Edge Function have also been applied to the connected Supabase project. After each change, open the app and test the relevant workflow with accounts that have the correct roles.

## Before launch checklist

1. Enable leaked-password protection in Supabase Auth.
2. Confirm the GitHub Pages redirect URL is allowed in Supabase Auth.
3. Test KYC submission, request-for-information and approval with separate member/reviewer/admin accounts.
4. Test offers, stock deduction, partial payment records, payment confirmation/dispute, service quotes and two-party delivery confirmation.
5. Test that ordinary users cannot read staff messages and administrators cannot browse private stories or unreported posts.
6. Populate the knowledge centre with verified source links and test wanted-product notifications.
7. Review outstanding Supabase security-advisor warnings. Several SECURITY DEFINER RPCs are intentionally callable by authenticated users and enforce role/participant checks; they still require a careful security review before launch.
8. Confirm legal, tax, consumer-protection, privacy and agricultural trading requirements for the regions in which TEMO Exchange will operate.
