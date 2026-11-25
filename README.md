# Flora Chaos

A premium React Native + Expo mobile UI for an AI-assisted plant health companion.

## Current milestone

The premium UI is connected to Supabase for **authentication, profiles, user-owned
scan records and private image storage**. Without credentials the app stays in its
explicitly labelled preview mode with sample data, so navigation is unchanged.

AI disease detection is intentionally **not** implemented. Saving a photo creates a
`pending` scan with no disease label and no confidence score.

## Run locally

```bash
npm install
cp .env.example .env   # then fill in your public Supabase URL and anon key
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or `w` for web.

If `.env` is absent, **Explore the UI preview** enters the sample-data experience.
With Supabase configured, the `(app)` routes are protected and login/signup call the real API.

## Useful commands

```bash
npm run lint              # ESLint
npx expo install --check  # dependency compatibility with Expo SDK
npx expo export --platform ios --output-dir /tmp/flora-export
```

## Structure

```
app/                     Expo Router routes (splash, auth, protected tabs, result)
src/components/          Reusable UI, layout, scan, home and result components
src/config/env.js        Public EXPO_PUBLIC_* configuration
src/context/             AuthProvider (session, profile, actions)
src/data/sample.js       Clearly labelled preview content
src/hooks/               Local filtering, real image picker, user scans
src/lib/                 Reusable Supabase client and helpers
src/services/            Auth, database and storage services
src/theme/               Colours, spacing, radius, typography and shadows
supabase/migrations/     SQL for profiles, plant_scans, RLS and storage
```

## Design

Dark forest green, lime, white and soft neutrals. Fraunces headings and Manrope
body text are loaded with `expo-font`. All screens share the tokens in
`src/theme/index.js`.

## Security

No secrets are committed. `.env.example` documents only the public Supabase URL
and anon key. Access control is enforced by RLS; never place a service-role key or
inference token in the app bundle. See `supabase/README.md` for migration and RLS details.
