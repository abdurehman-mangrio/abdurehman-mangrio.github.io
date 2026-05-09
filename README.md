# Abdul Rehman - Professional Portfolio

![Portfolio Showcase](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20|%20CSS3%20|%20JS-blue?style=for-the-badge)

Welcome to the source code for my professional portfolio website! This repository contains a fully responsive, modern, and highly interactive digital presence built to showcase my expertise in **Full-Stack MERN Development** and **Cybersecurity**.

## 🚀 Features

- **Modern Glassmorphism UI:** Features a high-end dark mode aesthetic using CSS variables, frosted glass backdrops (`backdrop-filter`), and vibrant neon gradients.
- **Advanced 3D Interactivity:** Integrates `VanillaTilt.js` combined with CSS `preserve-3d` to create stunning 3D popping effects on all project and service cards.
- **Dynamic Particle Canvas:** A custom JavaScript-rendered floating particle network background that reacts to the page layout.
- **Automated Data Animations:** Custom `IntersectionObserver` scripts trigger smooth number-counting animations for statistics when scrolled into view.
- **Typewriter & Custom Cursor:** Includes a dynamic hero typing effect and a custom glowing mouse cursor for a premium user experience.
- **Modular CSS Architecture:** Styles are strictly separated into global (`style.css`) and page-specific (`pages.css`) logic for maintainability and clean code.

## 📂 Project Structure

```text
├── css/
│   ├── style.css       # Global variables, typography, navigation, and footer
│   └── pages.css       # Page-specific grid layouts (About, Projects, Blog)
├── js/
│   └── main.js         # Canvas background, 3D Tilt, scroll observers, animations
├── index.html          # Homepage / Hero / Featured Services
├── about.html          # About Me / Timeline / Fun Facts
├── projects.html       # Dynamic Filterable Projects Showcase
├── cybersecurity.html  # Security Expertise / Certifications / Tools
├── blog.html           # Technical Blog Posts
└── contact.html        # Contact Form with automatic mailto formatting
```

## 🛠️ Technologies Used

- **HTML5:** Semantic markup for accessibility and SEO.
- **CSS3:** Custom variables, flexbox/grid, keyframe animations, glassmorphism.
- **Vanilla JavaScript (ES6+):** Complete DOM manipulation, canvas rendering, and event handling without heavy frameworks.
- **Libraries:**
  - [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) - For fade/slide scroll animations.
  - [VanillaTilt.js](https://micku7zu.github.io/vanilla-tilt.js/) - For 3D card tilt interactions.
  - [FontAwesome 6](https://fontawesome.com/) - For vector icons.

## ⚙️ How to Run Locally

Since this is a static website, running it is incredibly simple. You do not need Node.js or any build steps.

1. Clone the repository:
   ```bash
   git clone https://github.com/abdurehman-mangrio/portfolio.git
   ```
2. Navigate to the directory:
   ```bash
   cd portfolio
   ```
3. Use any local server to run it. For example, using Python or Node:
   - **Node.js:** `npx serve -s .`
   - **Python:** `python -m http.server 3000`
   - Or simply install the "Live Server" extension in VS Code.

4. Open `http://localhost:3000` in your browser.

## 🌐 Deployment

This project is fully optimized and ready to be deployed to static hosting providers such as:
- **Vercel**
- **Netlify**
- **GitHub Pages**

Simply connect your repository to your preferred provider, and the site will instantly go live!

---
*Designed & Developed by [Abdul Rehman](https://github.com/abdurehman-mangrio)*
