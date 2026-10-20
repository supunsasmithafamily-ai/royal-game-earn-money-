# SASMITHA CASTLE

A starter monorepo for a storybook-style match-3 game using React + Vite, a separate Next.js admin dashboard, and Firebase Authentication / Firestore / Storage.

## Apps
- `apps/game`: React + Vite player game.
- `apps/admin`: Next.js admin dashboard starter.
- `packages/shared`: shared game configuration.
- `firebase/firestore.rules`: baseline rules to protect player progress.

## Run in GitHub Codespaces
1. Open this repository in Codespaces.
2. Run `npm install`.
3. Copy `.env.example` to `apps/game/.env.local` and set the `VITE_FIREBASE_*` values from Firebase Console.
4. Copy `.env.example` to `apps/admin/.env.local` and set the `NEXT_PUBLIC_FIREBASE_*` values and `NEXT_PUBLIC_ADMIN_UID`.
5. Run `npm run dev:game` to preview the game, or `npm run dev:admin` for the admin app.

## Firebase setup
1. In Firebase Console, create a project and register a Web App.
2. Enable Authentication -> Sign-in method -> Email/Password.
3. Create a Cloud Firestore database.
4. Enable Storage if you want to upload character/castle artwork.
5. Copy the Web App config into the relevant environment variables. Do not commit `.env.local`.
6. Publish `firebase/firestore.rules` using Firebase Console or Firebase CLI.
7. Create the trusted admin user in Firebase Authentication and put that user's UID in `NEXT_PUBLIC_ADMIN_UID`.

## Vercel deployment
Deploy `apps/game` and `apps/admin` as separate Vercel projects from the same GitHub repository.
- Game Root Directory: `apps/game`
- Admin Root Directory: `apps/admin`
Set each app's environment variables in Vercel Project Settings -> Environment Variables.
The game can run without Firebase configured in local demo mode, but account creation and cloud saving require valid Firebase config.

## Important notes
- This is a working starter/demo, not a finished commercial game. Art is made with CSS and emoji; add licensed artwork and test on target devices before launch.
- The admin panel is a starter. Production admin access should be enforced using Firebase custom claims or server-side authorization, not just a client-side UID check.
- Firestore rules below let users read/write only their own progress. Game-wide content editing needs a separate admin-only rule strategy.
