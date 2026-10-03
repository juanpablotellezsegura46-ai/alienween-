# ALIENWEEN

Starter full-stack project for the ALIENWEEN event website.

## Stack
- Vite + vanilla JavaScript frontend
- Supabase database, authentication, and Edge Functions
- Vercel hosting

## Important
The frontend is a starter and does not issue tickets locally. Ticket creation and check-in must go through the Edge Functions so the secret service role key never reaches the browser.

## Local setup
1. Install Node.js (18+).
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Run `npm run dev`.

## Supabase setup
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Deploy the Edge Functions in `supabase/functions/` using the Supabase CLI.
4. Set function secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_EMAIL`.
5. Create an admin user in Supabase Auth with the email matching `ADMIN_EMAIL`.
6. Configure the frontend environment variables.

## Vercel deployment
Import this project into Vercel, set the two `VITE_` environment variables, and deploy.

## Before real use
- Replace demo event details and branding.
- Add and test the admin login flow.
- Test ticket creation, duplicate check-in rejection, and access control.
- Load-test the expected peak traffic.
- Keep the Supabase service-role key only in Edge Function secrets.
