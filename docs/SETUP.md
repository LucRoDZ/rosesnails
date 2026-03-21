# RosesNails — Setup Guide

## Prerequisites
- Node.js 18+
- npm 9+
- Git

---

## 1. Clone & Install

```bash
git clone <your-repo-url>
cd rosesnails
npm install
cp .env.example .env.local
```

---

## 2. Clerk Setup

1. Go to https://dashboard.clerk.com -> Create new application
2. Choose "Email/password" + "Google" sign-in methods
3. Copy your keys to `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. In Clerk dashboard -> Redirects:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/mes-rendez-vous`
   - After sign-up: `/mes-rendez-vous`

---

## 3. Supabase Setup

1. Go to https://app.supabase.com -> Create new project
2. Copy keys to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Settings -> API -> Service Role)
3. Run the SQL schema:
   - Go to SQL Editor in Supabase dashboard
   - Paste and run the contents of `supabase/schema.sql`

### Connecting Clerk with Supabase RLS
Since we use Clerk user IDs, the webhook stores the Clerk `userId` in `appointments.user_id`.
For the client-side read (anon key), you need to pass the userId via Supabase's auth context.

**Option A (Recommended for V1):** Use the service role key on the server-side page `/mes-rendez-vous` with a `.eq("user_id", clerkUserId)` filter -- this bypasses RLS but the filter is enforced in code. The schema already does this.

**Option B:** Integrate Clerk JWT with Supabase (see https://clerk.com/docs/integrations/databases/supabase).

---

## 4. Cal.com Setup

1. Go to https://app.cal.com -> Create account
2. Set your username to match `brand.calcom.username` in `src/config/brand.ts`
3. Create your event types (one per service)
4. Configure webhook:
   - Go to Settings -> Developer -> Webhooks
   - Add webhook URL: `https://yourdomain.com/api/webhooks/calcom`
   - Secret: generate a secure random string -> copy to `CALCOM_WEBHOOK_SECRET`
   - Enable events: `BOOKING_CREATED`, `BOOKING_CANCELLED`, `BOOKING_RESCHEDULED`

### Passing Clerk userId to Cal.com
To link bookings to Clerk users, configure Cal.com to pass the user ID:
- In the embed config, add metadata: `{ clerkUserId: "<clerk-user-id>" }`
- Or use Cal.com's guest checkout with the email as the identifier

---

## 5. Instagram Widget

Replace the placeholder in `src/components/sections/InstagramFeed.tsx`:

**Option 1 - Curator.io (recommended, free tier)**
1. Go to https://curator.io -> Create feed -> Connect Instagram
2. Get your feed ID
3. Replace the placeholder div with the Curator embed code

**Option 2 - Behold.so**
See https://behold.so for embed instructions.

---

## 6. Local Development

```bash
npm run dev
```

Open http://localhost:3000

---

## 7. Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or connect your GitHub repo to Vercel dashboard and add all environment variables.

### Required Vercel environment variables:
Copy all keys from `.env.local` to your Vercel project settings.

---

## Checklist QA Manuelle

- [ ] Page d'accueil se charge correctement (mobile + desktop)
- [ ] 3D hero s'affiche et s'anime
- [ ] Fallback 3D fonctionne (desactiver WebGL dans Chrome DevTools)
- [ ] Section prestations affiche tous les services
- [ ] Portfolio affiche les placeholders (ou vraies images)
- [ ] Avis s'affichent correctement
- [ ] FAQ accordion fonctionne
- [ ] Section contact affiche les bonnes infos
- [ ] Bouton sticky "Prendre RDV" apparait au scroll (mobile)
- [ ] Cal.com embed se charge
- [ ] Connexion Clerk fonctionne (sign in / sign up)
- [ ] Redirection vers /mes-rendez-vous apres connexion
- [ ] Acces /mes-rendez-vous sans connexion -> redirige
- [ ] Mes rendez-vous s'affichent pour un utilisateur connecte
- [ ] Webhook Cal.com ecrit en base (tester avec ngrok + Cal.com)
- [ ] Webhook duplique ignore (renvoyer le meme payload)
- [ ] Widget Instagram lazy-load (n'apparait qu'en scrollant)
- [ ] Navigation clavier correcte (tab, enter, echap)
- [ ] Pas de console errors critiques
- [ ] Build prod sans erreurs

## Checklist Pre-prod

- [ ] Toutes les variables d'environnement configurees sur Vercel
- [ ] Domaine configure
- [ ] Cal.com webhook URL mise a jour avec le vrai domaine
- [ ] Images portfolio remplacees par de vraies photos
- [ ] Widget Instagram configure
- [ ] Mentions legales verifiees
- [ ] Test complet sur mobile reel (iOS + Android)
- [ ] Google Analytics ou autre outil analytics configure (optionnel V1)
