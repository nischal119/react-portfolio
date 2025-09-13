# Nischal Dhungel - Full Stack Developer Portfolio

A modern, responsive portfolio website built with React, showcasing professional projects, skills, and achievements. This portfolio is optimized for search engines and performance.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **SEO Optimized**: Comprehensive meta tags, structured data, and semantic HTML
- **Performance**: Optimized images, lazy loading, and Core Web Vitals optimization
- **Responsive**: Mobile-first design that works on all devices
- **PWA Ready**: Progressive Web App capabilities with manifest.json
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Dynamic Content**: Firebase integration for projects and certificates

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **UI Components**: Material-UI, Lucide React Icons
- **Animations**: AOS (Animate On Scroll), Framer Motion
- **Backend**: Firebase Firestore
- **Deployment**: Vercel
- **SEO**: React Helmet Async, Structured Data

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── SEO.jsx         # SEO meta tags and structured data
│   ├── ImageOptimized.jsx # Optimized image component
│   └── ...
├── Pages/              # Main page components
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About section
│   ├── Portofolio.jsx  # Portfolio showcase
│   └── Contact.jsx     # Contact form
├── firebase.js         # Firebase configuration
└── main.jsx           # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/portfolio-v5.git
cd portfolio-v5
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
cp .env.example .env
# Add your Firebase configuration
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Add your configuration to `src/firebase.js`
4. Create collections: `projects` and `certificates`

### SEO Configuration

The SEO component (`src/components/SEO.jsx`) includes:
- Meta tags for search engines
- Open Graph tags for social media
- Twitter Card tags
- JSON-LD structured data
- Canonical URLs

### Performance Optimization

- Image optimization with lazy loading
- Code splitting and tree shaking
- Preconnect and DNS prefetch for external resources
- Optimized bundle size

## 📊 SEO Features

- **Meta Tags**: Comprehensive title, description, and keyword tags
- **Structured Data**: JSON-LD schema for Person, WebSite, and CreativeWork
- **Open Graph**: Facebook and social media optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Prevent duplicate content issues

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
# Deploy the dist folder to your hosting provider
```

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Lazy loading of components
- **Caching**: Optimized caching strategies

## 🔍 SEO Checklist

- ✅ Meta tags and descriptions
- ✅ Structured data (JSON-LD)
- ✅ Open Graph and Twitter Cards
- ✅ Sitemap.xml and robots.txt
- ✅ Semantic HTML structure
- ✅ Alt tags for images
- ✅ Canonical URLs
- ✅ Mobile optimization
- ✅ Page speed optimization
- ✅ SSL certificate

## 📱 PWA Features

- **Manifest**: App-like experience
- **Service Worker**: Offline capabilities (can be added)
- **Installable**: Add to home screen
- **Responsive**: Works on all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **Website**: [https://eki.my.id](https://eki.my.id)
- **Email**: [your-email@example.com]
- **LinkedIn**: [https://linkedin.com/in/nischal-dhungel](https://linkedin.com/in/nischal-dhungel)
- **GitHub**: [https://github.com/nischal119](https://github.com/nischal119)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Material-UI for the component library
- Firebase for the backend services
- Vercel for the hosting platform
