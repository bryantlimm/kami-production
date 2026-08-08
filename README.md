# Kami Production — Website

A React + Firebase company profile site with a built-in admin dashboard.

- Public site: Home, About Us, Booking (sign-in, full booking system comes later)
- Admin portal at `/admin`: one "Website" menu that edits every section of the public site
- All content (text, news, clients, testimonials, products, contact info, footer, photos) lives in Firebase — no code edits needed to update the site day to day

Follow the steps below **in order**. Steps 1–2 happen on your computer, steps 3–7 happen on the Firebase website, step 8 connects them.

---

## 1. Install Node.js

Node.js lets you run and build the project on your computer.

1. Go to https://nodejs.org and download the **LTS** version.
2. Install it (just click through the installer).
3. Confirm it worked — open a terminal and run:
   ```
   node -v
   npm -v
   ```
   Both should print a version number.

## 2. Install the project's packages

In a terminal, go into this project folder and run:
```
npm install
```
This downloads React, Firebase, and everything else the project needs into a `node_modules` folder. It can take a minute.

---

## 3. Create your Firebase project

1. Go to https://console.firebase.google.com
2. Click **Add project**, name it `kami-production` (or anything), continue through the prompts (Google Analytics is optional — you can skip it).
3. Once created, you'll land on the project dashboard.

## 4. Register a Web App

1. On the project dashboard, click the **`</>`** (web) icon to add a web app.
2. Nickname it `kami-production-web`. You don't need Firebase Hosting checked yet (we'll set that up in step 8).
3. Firebase will show you a `firebaseConfig` object with keys like `apiKey`, `authDomain`, etc. **Keep this tab open** — you'll need these values in step 8.

## 5. Turn on Authentication

1. In the left sidebar, go to **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab and click **Add user**. Create the account your friend will use to log into `/admin` — this is the site owner's login (e.g. `owner@kamiproduction.com` + a password). Copy the **User UID** shown next to it — you'll need it in step 7.

## 6. Turn on Firestore Database

1. **Build → Firestore Database → Create database**.
2. Choose **Start in production mode**, pick a location close to your users, click **Enable**.

We'll deploy the real security rules in step 8 — production mode just means it starts locked down, which is what we want.

## 7. Mark that user as an admin

This is what separates your friend's login from a regular customer who signs up on the Booking page.

1. Still in Firestore, click **Start collection**.
2. Collection ID: `admins`
3. Document ID: paste the **User UID** you copied in step 5.
4. Add one field: `role` (string) = `admin`. Save.

Anyone whose UID has a matching document in `admins` can edit the website. No one else can, even if they create an account through the public Booking page.

## 8. Turn on Storage

1. **Build → Storage → Get started**. Accept the default location, click **Done**.

This is where uploaded photos (hero images, news covers, client logos, product photos) are stored.

---

## 9. Connect the code to your Firebase project

1. In the project folder, copy `.env.example` to a new file named `.env.local`:
   ```
   cp .env.example .env.local
   ```
2. Open `.env.local` and paste in the values from the `firebaseConfig` object you saw in step 4. It should look like:
   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=kami-production.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=kami-production
   VITE_FIREBASE_STORAGE_BUCKET=kami-production.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```
   `.env.local` is already in `.gitignore` so it won't be committed anywhere.

## 10. Deploy the security rules

Install the Firebase command-line tool once:
```
npm install -g firebase-tools
firebase login
```
Then, from the project folder:
```
firebase use --add
```
Pick your `kami-production` project when prompted. Then deploy the rules:
```
firebase deploy --only firestore:rules,storage:rules
```

## 11. Run it locally

```
npm run dev
```
Open the URL it prints (usually `http://localhost:5173`). You'll see the public site with placeholder text (it falls back to sample copy until you fill in real content).

Go to `http://localhost:5173/admin`, sign in with the account you made in step 5, and start filling in:
Hero → About Us → Why Us → News → Clients → Testimonials → Products → Contact Details → Footer.

Every save updates the live site immediately — refresh the home page in another tab to see it.

---

## 12. Put it online (Firebase Hosting)

Once you're happy with it locally:
```
npm run build
firebase deploy --only hosting
```
Firebase will print a live URL like `https://kami-production.web.app`. Later you can point your own domain (`kamiproduction.com`) at it from **Hosting → Add custom domain** in the console.

---

## How the content is structured (for reference)

- `content/hero`, `content/about`, `content/whyUs`, `content/contact`, `content/footer` — single documents, one per site section
- `news`, `clients`, `testimonials`, `products` — collections, one document per item, editable as lists in the admin

## Known limitation (fine for now, worth knowing)

The Booking page lets any visitor create their own account (for the future booking system). Those accounts **cannot** edit the website — only the UID you added to the `admins` collection can, enforced by the security rules in `firestore.rules` and `storage.rules`. If you ever want a second admin (e.g. an employee), repeat step 7 with their UID.

## Next phase: the booking system

The Booking page currently just signs users in and shows a "coming soon" message. When you're ready to build real bookings (equipment catalog with availability, date-based reservations, order status in the admin), that plugs into the same Firebase project — just say the word.
