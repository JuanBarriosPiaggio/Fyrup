# Fyrup Website

A modern, redesigned website for Fyrup - London's leading provider of passive fire protection and fire risk assessments.

## 🔥 About

This website showcases Fyrup's fire protection services with a premium, modern design featuring:

- Fire Risk Assessments
- Fire Stopping
- Fire Doors
- Fire Dampers

Built with Next.js 14, TypeScript, and Tailwind CSS for optimal performance and user experience.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About pages (Values, Guarantee)
│   ├── services/          # Service pages
│   ├── contact/           # Contact page
│   ├── faqs/              # FAQs page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── public/                # Static assets
└── package.json           # Dependencies
```

## 🎨 Design Features

- **Dark Hero Sections** with gradient overlays and mesh backgrounds
- **Rounded Containers** (rounded-2xl, rounded-3xl) for modern aesthetic
- **Bold Typography** with large headings (text-5xl to text-7xl)
- **Red/Orange Gradient Accents** (#DC2626 to #EA580C) for fire safety theme
- **Premium Spacing** with generous padding and margins
- **Smooth Animations** with hover effects and transitions
- **Responsive Design** optimized for all devices

## 🖼️ Adding Your Logo

### Replace the Placeholder Logo

1. Download your Fyrup logo from the original website
2. Convert to SVG format (recommended) or use PNG
3. Replace the placeholder files:
   - `public/logo.svg` - Main logo
   - `app/favicon.ico` - Browser favicon
   - Optionally add: `public/logo.png` for broader compatibility

### Update the Header Component

If using a custom logo file, update `components/Header.tsx`:

```tsx
// Replace the text logo with an image
<Link href="/" className="flex items-center">
  <Image src="/logo.svg" alt="Fyrup" width={120} height={40} />
</Link>
```

## 📝 Content

All content has been preserved from the original Fyrup website including:

- Company information and contact details
- Service descriptions
- HOPP values (Honest, Open, Professional, Passionate)
- All original copy and messaging

## 🛠️ Build for Production

```bash
npm run build
npm start
```

## 📦 Deployment

This Next.js application can be deployed to:

- **Vercel** (recommended) - Zero configuration
- **Netlify**
- **Railway**
- **AWS**
- Any Node.js hosting platform

### Environment Variables

No environment variables are currently required. For production, you may want to add:

- Email service API keys (for contact form)
- Analytics tracking IDs
- CMS credentials (if adding a CMS)

## 🎯 Key Pages

- **Home** (`/`) - Hero section, services overview, quote form
- **About - Values** (`/about/values`) - HOPP core values
- **About - Guarantee** (`/about/guarantee`) - Service commitments
- **Fire Risk Assessments** (`/services/fire-risk-assessments`)
- **Fire Stopping** (`/services/fire-stopping`)
- **Fire Doors** (`/services/fire-doors`)
- **Fire Dampers** (`/services/fire-dampers`)
- **Contact** (`/contact`) - Contact form and information
- **FAQs** (`/faqs`) - Frequently asked questions

## 🎨 Color Palette

- **Primary Red**: #DC2626 (red-600)
- **Secondary Orange**: #EA580C (orange-600)
- **Dark Slate**: #0F172A (slate-900)
- **Light Gray**: #F9FAFB (gray-50)
- **Text Dark**: #111827 (gray-900)

## 📱 Features

- ✅ Fully responsive design
- ✅ SEO optimized with metadata
- ✅ Accessible navigation
- ✅ Interactive forms
- ✅ Smooth animations
- ✅ Fast page loads
- ✅ Modern UI/UX

## 📞 Contact Information

- **Phone**: 020 3576 2292
- **Email**: info@fyrup.co.uk
- **Address**: 45-55 Commercial Street, London, E1 6BD

## 📄 License

© 2026 Fyrup. All rights reserved.

## 🔧 Technical Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 💡 Future Enhancements

Potential additions for future versions:

- Blog/News section
- Case studies/portfolio
- Client testimonials
- Live chat support
- Online booking system
- Email integration for contact forms
- CMS integration (Sanity, Contentful, etc.)
- Image optimization with actual photos
- Google Maps integration
- Performance monitoring

---

Built with ❤️ for Fyrup - Protecting London for over 15 years
