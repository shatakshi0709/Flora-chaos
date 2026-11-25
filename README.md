# Flora Chaos

A premium React Native + Expo mobile UI for an AI-assisted plant health companion.

## Current milestone

**UI preview build.** The interface, navigation, camera/gallery picking, validation,
loading and empty states are implemented. The following are intentionally **not**
wired yet, so nothing pretends to work:

- Supabase authentication (login/signup forms validate locally and explain this)
- AI disease detection (no endpoint is called; no prediction is fabricated)
- Cloud storage and saved scan history (history uses clearly labelled sample data)

Use **Explore the UI preview** on the welcome, login or signup screen to enter the app.

## Run locally

```bash
npm install
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or `w` for web.

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
src/data/sample.js       Clearly labelled preview content
src/hooks/               Local filtering + real image-picker access
src/theme/               Colours, spacing, radius, typography and shadows
supabase/                Reserved for the later backend milestone
```

## Design

Dark forest green, lime, white and soft neutrals. Fraunces headings and Manrope
body text are loaded with `expo-font`. All screens share the tokens in
`src/theme/index.js`.

## Security

No secrets are committed. `.env.example` documents only the public variables that
a future Supabase milestone will need. Never place service-role keys or inference
tokens in the app bundle.
