# NovaFolio - Senior Full-Stack & AI Solutions Developer Portfolio

A modern, high-performance, copyright-free personal developer portfolio designed from the ground up with 2025/2026 tech aesthetics, glassmorphism, dynamic theme engine, interactive project modals, and an embedded AI assistant.

---

## 🛡️ 100% Original & Copyright-Safe

This portfolio has been completely redesigned with bespoke code, original vector illustrations, and custom SVGs to guarantee:
- **No Third-Party Copyright Infringement**: No copied personal assets, proprietary school project screenshots, or licensed photographs.
- **Custom Vector Graphics**: All project mockups, avatars, and certificate credentials are built directly with scalable vector SVGs in `assets/`.
- **Modular, Semantic Codebase**: Clean, accessible HTML5, custom modern CSS variables, and zero bloated frameworks.

---

## ✨ Features & Architecture

1. **Floating Frosted Navigation Header**:
   - Modern glassmorphism with smooth backdrop blur.
   - Intelligent ScrollSpy active section detection.
   - Mobile responsive slide-down navigation drawer.
2. **Hero Showcase**:
   - Animated typing cursor with customizable roles via [Typed.js](https://github.com/mattboldt/typed.js/).
   - Live system telemetry terminal with interactive code snippet.
   - Key engineering metrics counter strip (Projects Shipped, Years Experience, Client SLA).
3. **About Me & Dual-Track Timeline**:
   - High-level engineering philosophy, core pillars, and snapshot matrix.
   - Interactive tab switcher between **Work Experience** and **Education & Milestones**.
4. **Skills Matrix**:
   - Categorized technology cards: Frontend, Backend, Cloud & Databases, and AI & DevOps.
   - Live discipline filter buttons.
5. **Services Section**:
   - 6 high-demand engineering services with glowing border hover effects and direct inquiry CTAs.
6. **Featured Projects & Architecture Inspector**:
   - Category filtering (*All*, *AI & Systems*, *Full-Stack SaaS*, *Cloud & DevOps*, *Mobile Apps*).
   - High-fidelity SVG architecture mockups.
   - **Interactive Project Details Modal**: Deep-dive into problem statements, metrics, tech stacks, and action buttons.
7. **Verified Credentials & Certifications**:
   - High-resolution SVG certificates with verification seals (AWS, Google Cloud, Meta, DeepLearning.AI).
   - Interactive **Certificate Lightbox Modal** with zoom display.
8. **Testimonials & Endorsements**:
   - Clean client and colleague review cards with star ratings.
9. **Interactive AI Portfolio Assistant ("NovaBot")**:
   - Floating widget with robot launcher and online pulse indicator.
   - Quick action prompt chips (*Tech Stack*, *Projects*, *Experience*, *Services*, *Rates*, *Contact*).
   - Built-in intelligent conversational matching engine.
10. **Dynamic Theme Engine**:
    - **Light & Dark Mode Switcher** with smooth CSS variable transitions.
    - **5 Accent Color Themes**: Cyber Violet, Electric Cyan, Emerald Mint, Solar Amber, and Neon Rose.
    - Persists preferences in browser `localStorage`.
11. **Direct Contact Section**:
    - Direct contact details with one-click **Copy Email** clipboard feedback.
    - Interactive inquiry form with client-side validation and simulated dispatch.

---

## 📁 Project Structure

```text
portfolio-website/
├── index.html               # Main website markup & semantic sections
├── style.css                # CSS variables, glassmorphism, responsive grid
├── script.js                # Modular JS: typing, modals, filters, NovaBot AI, themes
├── serve.py                 # Lightweight Python local preview server
├── README.md                # Documentation & customization guide
└── assets/
    ├── images/
    │   └── avatar.svg       # Modern tech developer avatar illustration
    ├── projects/
    │   ├── nexusflow.svg    # AI workspace & RAG platform mockup
    │   ├── hyperscale.svg   # Cloud retail POS & inventory mockup
    │   ├── omnipulse.svg    # Distributed telemetry & monitoring mockup
    │   ├── zenith.svg       # Telehealth & mobile health app mockup
    │   ├── cryptosphere.svg # FinTech trading terminal mockup
    │   └── foodcraft.svg    # On-demand delivery & logistics mockup
    └── certificates/
        ├── aws-solutions-architect.svg
        ├── google-cloud-engineer.svg
        ├── meta-fullstack.svg
        └── deeplearning-ai.svg
```

---

## 🚀 How to Run Locally

### Option 1: Python Server (Recommended)
Run the bundled server script from the terminal:
```bash
python serve.py
```
This opens `http://localhost:8000/index.html` in your default web browser.

### Option 2: Direct Browser Open
Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.

---

## 🎨 How to Personalize for Yourself

1. **Your Name & Title**:
   - Open `index.html` and search for `Alex Rivera`. Replace with your own name.
   - Update the logo monogram (`AR`) in `<span class="logo-box">AR</span>`.
   - Update your bio and email address in the hero and contact sections.

2. **Your Typing Roles**:
   - Open `script.js` and locate `initTypingAnimation()`.
   - Edit the `strings` array to match your titles:
     ```javascript
     strings: [
       'Full-Stack Developer',
       'Frontend Engineer',
       'Mobile App Creator'
     ]
     ```

3. **Your Projects & Screenshots**:
   - Add your screenshots to `assets/projects/` or link to your own images.
   - Edit the project card descriptions, tags, and data attributes in `index.html`.

4. **Customize NovaBot Responses**:
   - Open `script.js` and locate `getNovaBotResponse()`.
   - Tailor the responses to match your actual background, rates, and contact links.

---

## 🌐 Deploy to GitHub Pages (Free)

1. Create a repository on GitHub (e.g. `portfolio` or `<your-username>.github.io`).
2. Push all files from this directory to the repository.
3. In GitHub, go to **Settings** > **Pages** > select branch `main` and root `/`.
4. Your site will be live instantly!
