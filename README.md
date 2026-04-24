# ☀ Rayenna Energy — Website

Official website for [Rayenna Energy](https://rayenna.energy), a solar energy solutions provider based in Kochi, Kerala.

Built with [Astro](https://astro.build) — deploys as pure HTML/CSS/JS.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed → [nodejs.org](https://nodejs.org)
- A code editor → [Cursor](https://cursor.sh) (recommended)
- Git → [git-scm.com](https://git-scm.com)

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rayenna-energy.git
cd rayenna-energy

# Install dependencies
npm install

# Start local dev server (auto-reloads on save)
npm run dev
```

Open your browser at **http://localhost:4321**

### Build for Production

```bash
npm run build     # Builds to /dist folder
npm run preview   # Preview the production build locally
```

---

## 📁 Project Structure

```
rayenna-energy/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Main layout (navbar + footer)
│   ├── pages/
│   │   ├── index.astro            # Home page
│   │   ├── about.astro            # About Us
│   │   ├── services.astro         # Our Services
│   │   ├── contact.astro          # Contact Us
│   │   └── blog/
│   │       ├── index.astro        # Blog listing
│   │       └── [slug].astro       # Blog post template
│   └── styles/
│       └── global.css             # Brand colors, fonts, utilities
├── public/
│   ├── images/                    # Static images
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml             # Auto-deploy to GitHub Pages
├── astro.config.mjs
└── package.json
```

---

## ✍️ How to Make Common Changes

### Add a New Blog Post
1. Create a new file in `src/pages/blog/` — e.g. `my-new-post.astro`
2. Copy the structure from an existing post file
3. Update the title, content, and meta
4. Add it to the posts array in `src/pages/blog/index.astro`
5. Commit and push — it goes live automatically

### Change Brand Colors
Edit `src/styles/global.css` — look for the `:root { }` block at the top.

### Update Contact Details
Edit `src/layouts/Layout.astro` (footer section).

### Add a New Page
Create `src/pages/your-page-name.astro`. It's automatically available at `/your-page-name`.

---

## 🌐 Deployment

### GitHub Pages (Free)
1. Push code to `main` branch
2. Go to GitHub repo → Settings → Pages → Source: **GitHub Actions**
3. Every push to `main` auto-deploys via `.github/workflows/deploy.yml`

### Custom Domain (rayenna.energy)
1. Create `public/CNAME` with content: `rayenna.energy`
2. In Cloudflare DNS, add:
   - `CNAME www → YOUR_USERNAME.github.io`
   - `A @ → 185.199.108.153` (GitHub Pages IPs)
3. Enable "Enforce HTTPS" in GitHub Pages settings

### Netlify (Alternative — also free)
1. Connect your GitHub repo at [app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add custom domain in Netlify dashboard

---

## 📝 Content Management

Blog posts are currently `.astro` files. To make them easier to edit as pure Markdown:

```bash
# Future upgrade: use Astro Content Collections
# Each post becomes a .md file in src/content/blog/
```

This is a great future enhancement — just add it when needed in Cursor.

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [Astro](https://astro.build) | Static site framework |
| HTML/CSS/JS | Zero client JS by default |
| [Google Fonts](https://fonts.google.com) | Montserrat + Open Sans |
| GitHub Actions | CI/CD auto-deploy |
| Cloudflare | DNS + CDN |

---

## 📞 Support

Built and maintained by Rayenna Energy team.  
Web development powered by [Next Mile Media](https://nextmile.media).
