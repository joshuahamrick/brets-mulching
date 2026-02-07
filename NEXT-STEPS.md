# Next steps after code is on GitHub

Repo: **https://github.com/joshuahamrick/brets-mulching**

Your friend is already a collaborator. Do these in order.

---

## Step 1: Get a live URL (no domain needed)

Use **Vercel** or **Netlify** so every push to `main` updates a public URL.

### Option A – Vercel (recommended)

1. Go to **https://vercel.com** and sign in (use “Continue with GitHub”).
2. Click **Add New… → Project**.
3. Import **joshuahamrick/brets-mulching** from the list (or paste the repo URL if it doesn’t show).
4. Leave settings as-is (root directory, no build command for static HTML).
5. Click **Deploy**.
6. In about a minute you’ll get a URL like:  
   **`brets-mulching-xxxx.vercel.app`**  
   That’s your live site. Share it with your friend.

### Option B – Netlify

1. Go to **https://netlify.com** and sign in with GitHub.
2. **Add new site → Import an existing project**.
3. Choose **GitHub** and authorize, then select **brets-mulching**.
4. Build settings: leave **Build command** blank; **Publish directory** = `.` (or leave default).
5. Click **Deploy site**.
6. You’ll get a URL like **`something-random.netlify.app`**. You can change it to **`brets-mulching.netlify.app`** in Site settings → Domain management.

---

## Step 2: Share the live URL with your friend

Send him the Vercel or Netlify URL. That’s the “prod” link. Every push to `main` will update it (he can refresh to see changes).

---

## Step 3: How your friend can work (from phone or laptop)

- **From phone:** He can use **ClaudeBox** (claudebox.io) or **GitHub Codespaces** in the browser, open this repo, and prompt the AI to edit. Then he commits and pushes to `main`; the live URL updates.
- **From laptop:** He can clone the repo, use **Cursor** or **Claude Code**, make changes, then push to `main`.

**Clone command for him:**  
`git clone git@github.com:joshuahamrick/brets-mulching.git`

---

## Step 4: Optional – custom domain later

When you’re ready for a real domain, add it in Vercel or Netlify:

- **Vercel:** Project → Settings → Domains → Add.
- **Netlify:** Site settings → Domain management → Add custom domain.

No need to do this until you want it.
