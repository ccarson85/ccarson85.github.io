# Christopher Carson Music

Professional website for Christopher Carson, piano teacher and performer in MetroWest Boston.

## Overview

This is a static HTML website designed for hosting on GitHub Pages with a custom domain. The site features a professional dark theme with brown and gold tones, showcasing piano lessons, educational philosophy, and professional accomplishments.

## Setup Instructions

### Prerequisites

- A GitHub account
- Git installed on your local machine
- Your logo image file (square aspect ratio, ideally 200x200px or larger)

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ccarson85/ccarson85.github.io.git
   cd ccarson85.github.io
   ```

2. **Add your logo**
   - Place your logo image in the `images/` directory
   - Rename it to `logo.png` (or update the path in `index.html` line 23)
   - Recommended dimensions: 200x200px (PNG or JPG format)

3. **Test locally**
   - Open `index.html` in your web browser to preview the site
   - Or use a simple HTTP server:
     ```bash
     # Python 3
     python -m http.server 8000

     # Python 2
     python -m SimpleHTTPServer 8000
     ```
   - Visit `http://localhost:8000` in your browser

### Deploying to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be published at `https://ccarson85.github.io`

### Setting Up Custom Domain (chriscarsonmusic.com)

The `CNAME` file is already configured with your custom domain. Follow these steps to complete the setup:

1. **Configure DNS with your domain registrar**

   Add the following DNS records at your domain registrar:

   **For apex domain (chriscarsonmusic.com):**
   - Type: `A`
   - Host: `@`
   - Value: `185.199.108.153`

   - Type: `A`
   - Host: `@`
   - Value: `185.199.109.153`

   - Type: `A`
   - Host: `@`
   - Value: `185.199.110.153`

   - Type: `A`
   - Host: `@`
   - Value: `185.199.111.153`

   **For www subdomain:**
   - Type: `CNAME`
   - Host: `www`
   - Value: `ccarson85.github.io`

2. **Configure custom domain in GitHub**
   - Go to your repository Settings > Pages
   - Under "Custom domain", enter `chriscarsonmusic.com`
   - Click "Save"
   - Check "Enforce HTTPS" (may take a few minutes to become available)

3. **Wait for DNS propagation**
   - DNS changes can take up to 24-48 hours to propagate
   - You can check status at: https://www.whatsmydns.net/

## Project Structure

```
ccarson85.github.io/
│
├── index.html          # Main HTML file with all sections
├── styles.css          # Styling with dark brown/gold theme
├── script.js           # Navigation and interactive features
├── CNAME              # Custom domain configuration
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── images/            # Directory for images
    └── logo.png       # Your logo (add this file)
```

## Customization

### Updating Content

Edit `index.html` to modify:
- Contact information
- Studio locations
- Biography details
- Services offered

### Changing Colors

The color scheme is defined in CSS variables at the top of `styles.css`:

```css
:root {
    --color-primary: #2a1810;        /* Deep brown */
    --color-secondary: #3d2817;       /* Medium brown */
    --color-accent: #c9a961;          /* Gold */
    --color-bg: #1a0f0a;              /* Very dark brown background */
    --color-text: #e8d5c4;            /* Warm light text */
}
```

Modify these values to adjust the color palette.

### Adding New Sections

To add a new section:
1. Add a new `<section>` in `index.html` with a unique `id`
2. Add a corresponding navigation link in the `<nav>` menu
3. Style as needed in `styles.css`

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Mobile Menu**: Hamburger menu for mobile navigation
- **Professional Theme**: Dark brown and gold color scheme
- **Accessibility**: Keyboard navigation support and reduced motion preferences
- **SEO Optimized**: Meta tags and semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Maintenance

### Regular Updates

- Update content as needed by editing `index.html`
- Add new performance dates or achievements in the About section
- Keep contact information current

### Adding Images

- Place images in the `images/` directory
- Reference them in HTML: `<img src="images/your-image.jpg" alt="Description">`
- Optimize images before uploading (recommend using tools like TinyPNG)

## Support

For issues or questions about GitHub Pages:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## License

© 2025 Christopher Carson Music. All rights reserved.
