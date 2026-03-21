# RosesNails — Architecture Notes

## Key choices

### Stack
- **Next.js App Router**: Server Components for SEO and static pages, Client Components only when needed (interactivity, 3D, auth).
- **Tailwind CSS v4**: Single styling approach, consistent. Design tokens via CSS custom properties for flexibility.
- **Clerk**: Managed auth, no custom server auth code. Centralized middleware.
- **Supabase**: Postgres DB with RLS. Two clients: anon (client-side) and service_role (server-side/webhook).
- **Cal.com**: Slot management fully externalized. No calendar logic in the code.

### Component Architecture
```
src/
├── app/                    # Next.js routes (App Router)
│   ├── page.tsx            # Homepage (static)
│   ├── (protected)/        # Protected route group
│   │   └── mes-rendez-vous/
│   ├── api/webhooks/       # Cal.com Webhook
│   └── layout.tsx          # Root layout + providers
├── components/
│   ├── 3d/                 # React Three Fiber (lazy-loaded)
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page sections (Hero, Services...)
│   └── ui/                 # Atomic components (Badge, Skeleton...)
├── config/
│   ├── brand.ts            # Centralized business config
│   └── services.ts         # Service catalog
├── lib/
│   ├── supabase.ts         # Supabase clients
│   ├── appointments.ts     # Appointments service layer
│   └── webhook.ts          # Webhook utilities
└── types/                  # Centralized TypeScript types
```

### Data Flow

**Booking:**
1. Client opens Cal.com embed
2. Cal.com manages the booking
3. Cal.com sends a webhook -> `/api/webhooks/calcom`
4. The webhook verifies the signature, deduplicates, upserts to DB

**My Appointments:**
1. Clerk auth -> userId
2. Server Component fetches Supabase (service_role, filtered by userId)
3. Server render -> no loading spinner for data

### Performance
- Landing pages: static (SSG), zero server JS
- 3D scene: lazy-loaded via `lazy()` + IntersectionObserver
- Instagram widget: lazy-loaded, never blocking
- Images: next/image with automatic optimization

### Security
- Server secrets only in API routes and Server Components
- Webhook signature verified before any processing
- Supabase RLS: users see only their own data
- No service role key exposure on client side
- Webhook input validation before upsert
