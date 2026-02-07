# ClaudeBox setup for Bret's Mulching

Use this so you or your friend can work on the site from a phone (or browser) with Claude Code.

**Repo:** https://github.com/joshuahamrick/brets-mulching

---

## 1. Sign up / sign in (you and your friend)

1. Open **https://claudebox.io** (on phone or laptop).
2. Click **“Start coding for free”** or **“Sign In”** → **https://claudebox.io/login**.
3. Sign in (Google, GitHub, or email—whatever ClaudeBox offers).
4. **Free tier:** 60 minutes, no credit card. After that: bring your own Anthropic API key or pay per use / subscribe ($9–49/mo).

---

## 2. Start a session

1. After login, start a **new session** (new container).
2. You’ll get a **terminal** and a **chat** (and usually a **file browser**).
3. The container is Linux with `git`, `npm`, etc. Sessions are ephemeral unless you add Persistent Storage.

---

## 3. Clone the repo

In the **terminal** inside ClaudeBox:

```bash
git clone https://github.com/joshuahamrick/brets-mulching.git
cd brets-mulching
```

**If GitHub asks for auth (private repo or rate limits):**

- **HTTPS (easiest on phone):** Use a **GitHub Personal Access Token** instead of your password.
  - GitHub → Settings → Developer settings → Personal access tokens → Generate (classic).
  - Scope: `repo`.
  - When `git clone` or `git push` asks for password, paste the token.
- **SSH:** If you already have SSH keys on the machine, you can use:
  `git clone git@github.com:joshuahamrick/brets-mulching.git`  
  (On a fresh ephemeral session you’d need to add your SSH key each time unless you use Persistent Storage.)

---

## 4. Tell Claude to work in this project

In the **chat**:

- “We’re working in the folder `brets-mulching`. It’s a static HTML/CSS/JS site for a land-clearing business. Use the terminal and files in this directory.”
- Or: “Open the project in `~/brets-mulching` (or `./brets-mulching` from home). All edits and git commands should happen there.”

Then ask for what you want, e.g.:

- “Summarize what this site does.”
- “Update the contact page to add a second phone number.”
- “Change the hero text on the homepage to X.”

Claude will read the repo, suggest edits, and run commands (including git) in that folder.

---

## 5. Push changes back to GitHub

When you’re happy with the changes:

**Option A – Let Claude do it (easiest)**  
In chat:

- “Commit all changes with message: [your message] and push to `origin main`.”

Claude will run `git add`, `git commit`, and `git push`. If GitHub asks for auth, use your **Personal Access Token** when prompted for password.

**Option B – Do it yourself in the terminal**

```bash
cd ~/brets-mulching   # or wherever you cloned
git config user.email "your@email.com"
git config user.name "Your Name"
git add .
git commit -m "Describe your change"
git push -u origin main
```

Use your GitHub **username** and **Personal Access Token** (as password) when `git push` asks.

---

## 6. See the site update

- If you’ve already deployed the repo to **Vercel** or **Netlify** (see **NEXT-STEPS.md**), every push to `main` updates the live URL. Open that URL on your phone or laptop and refresh to see changes.

---

## 7. Optional: Persistent Storage (ClaudeBox add-on)

By default, sessions are **ephemeral**: when you leave, the container is destroyed and the clone is gone. Next time you start a session you run `git clone` again.

If you want the repo (and SSH keys / config) to **persist** between sessions:

- In ClaudeBox, add **Persistent Storage** (billing add-on).
- Put the clone (and any keys) in the persistent volume so you don’t have to re-clone and re-auth every time.

---

## Quick reference

| Step            | Action |
|-----------------|--------|
| **Open ClaudeBox** | https://claudebox.io → Login |
| **Clone**       | `git clone https://github.com/joshuahamrick/brets-mulching.git && cd brets-mulching` |
| **Auth (HTTPS)**| GitHub Personal Access Token when git asks for password |
| **Work**        | Chat: “We’re in brets-mulching. [Your request].” |
| **Push**        | Chat: “Commit and push to origin main” or use terminal |
| **Live site**   | Deploy with Vercel/Netlify (NEXT-STEPS.md); same URL updates on push |

---

Share this file with your friend so you both use the same setup.
