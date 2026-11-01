# Customer portal operations

The portal is not ready for public use until the migration, customer identity process, production abuse controls, and iPaymu Sandbox end-to-end tests have been completed.

## Customer and staff flow

1. A customer creates an account and submits an application, website, server, or consulting request from `/portal/pesan`.
2. Staff review the request in Payload Admin under **Orders**, then update its status and customer-visible progress note. Never put passwords, API keys, or server credentials in progress notes.
3. Staff independently verify the customer's identity and set **Identity Confirmed** on the customer account. Email ownership is not automatically verified; never associate invoices with an unverified identity.
4. Staff agree on a quote with the customer and create an invoice with the same customer and order. Amounts are positive whole Rupiah. The system does not currently send email or generate a quote-acceptance workflow.
5. In Sandbox mode, the customer can start one hosted iPaymu checkout per invoice. An ambiguous provider failure is held for staff review and is not retried automatically. Contact iPaymu to reconcile it; the portal has no self-service payment retry yet.
6. A signed callback with matching invoice amount, reference and session marks the invoice paid. Returning from the provider page does not mark an invoice paid.

## Configuration and testing

Configure only in a non-production Vercel environment until the real Sandbox flow is verified:

- `IPAYMU_MODE=sandbox`
- `IPAYMU_VA` and `IPAYMU_API_KEY` from the Sandbox account, stored as secrets.
- `IPAYMU_SITE_URL`: the public HTTPS origin for that environment, registered with iPaymu for return and callback URLs. Do not use the production hostname for a preview callback.
- Configure iPaymu callbacks as `application/x-www-form-urlencoded` to `/api/portal/ipaymu/callback`.

No payment button is shown without all of the above. Production payment mode is deliberately disabled. Sandbox credentials are different from live credentials. Verify static IP/domain requirements with iPaymu and test actual callback signatures, amounts, retries, and expiration against its Sandbox before enabling anything for customers.

## Database migration

The existing site database predates Payload migration files. `20261101_164807_baseline.json` is a snapshot of that existing schema for generating future diffs; it is not an executable migration and must not be applied to the existing database. The executable customer-portal migration is additive. It was tested against a local database initialized with the baseline; the real target schema must still be checked for drift and backed up before running it. Never use schema push against production.

Local tests require an isolated disposable PostgreSQL database, not the website database:

```sh
NODE_ENV=development PAYLOAD_SECRET=local-test-secret DATABASE_URL=postgres://USER:PASSWORD@127.0.0.1:5432/DATABASE bun test src/lib/portal
```

## Known gaps before release

- No configured email adapter, email verification or self-service password reset. Identity verification is currently manual.
- Public registration and order submission need durable rate limiting and abuse protection.
- No automated renewal, provisioning, cancellation, quote acceptance, notifications, or server credential delivery.
- No actual iPaymu Sandbox run has been performed. Callback normalization must be verified with real provider payloads.
- Checkout is limited to one attempt per invoice. Reconciliation and renewed billing require staff intervention.
