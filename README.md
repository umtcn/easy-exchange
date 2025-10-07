# 💱 EasyExchange - Currency Exchange Platform

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)
![SCSS](https://img.shields.io/badge/SCSS-1.93.2-CC6699?style=flat-square&logo=sass)
![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=flat-square&logo=jest)

A modern, secure, and fully responsive currency exchange platform with real-time conversion rates. Built with Next.js 15, TypeScript, and custom SCSS architecture - no CSS frameworks used.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)

---

## ✨ Features

### Core Functionality
- ✅ **Real-time Currency Conversion** - Live exchange rates from ExchangeRate-API
- ✅ **3 Major Currencies** - USD, GBP, EUR support
- ✅ **Instant Calculation** - Client-side validation + server-side processing
- ✅ **Currency Swap** - Quick swap between from/to currencies
- ✅ **Smooth Scroll** - Auto-scroll to results on mobile devices
- ✅ **Login Modal** - Accessible modal with keyboard navigation

### Security & Performance
- 🔒 **Server-Side API** - API keys never exposed to client
- 🔒 **Environment Variables** - Secure server-only configuration
- 🔒 **Input Validation** - Both client and server-side validation
- ⚡ **ISR Caching** - 1-hour revalidation for optimal performance
- ⚡ **Next.js Optimization** - Image & Font optimization built-in

### Mobile-First Design
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- 📱 **Safe Area Support** - iOS notch, Dynamic Island, Android status/search bars
- 📱 **Touch-Friendly** - Large tap targets, smooth interactions
- 📱 **PWA Ready** - Manifest and icons included

### Accessibility
- ♿ **ARIA Labels** - Full screen reader support
- ♿ **Keyboard Navigation** - All features keyboard accessible
- ♿ **Focus Management** - Clear focus indicators
- ♿ **Reduced Motion** - Respects user preferences
- ♿ **Semantic HTML** - Proper heading hierarchy

### Design & Testing
- 🎨 **Custom SCSS Architecture** - No Bootstrap, Tailwind, or UI libraries
- 🎨 **Design Tokens** - Centralized variables and mixins
- 🎨 **8px Grid System** - Consistent spacing
- 🧪 **17 Unit Tests** - 100% pass rate with Jest & React Testing Library
- 🧪 **Coverage Reports** - Test coverage tracking

---

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 15.5.4](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19.1.0](https://react.dev/) |
| **Language** | [TypeScript 5.0](https://www.typescriptlang.org/) |
| **Styling** | [SCSS/Sass 1.93.2](https://sass-lang.com/) + CSS Modules |
| **Testing** | [Jest 30.2.0](https://jestjs.io/) + [React Testing Library 16.3.0](https://testing-library.com/react) |
| **API** | [ExchangeRate-API](https://www.exchangerate-api.com/) |
| **Deployment** | Vercel 

### Why These Technologies?

- **Next.js 15**: Latest App Router, Server Components, ISR caching, built-in optimization
- **TypeScript**: Type safety, better DX, fewer runtime errors
- **Custom SCSS**: Full control over styling, no framework bloat, maintainable architecture
- **Jest + RTL**: Industry standard testing, great DX, comprehensive coverage

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.0+ ([Download](https://nodejs.org/))
- **npm** 9.0+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

```bash
# Check your versions
node --version  # Should be 18.0+
npm --version   # Should be 9.0+
```

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/umtcn/easy-exchange.git
cd easy-exchange
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# Get your free API key from: https://www.exchangerate-api.com/
EXCHANGE_API_KEY=your_actual_api_key_here
```

**Important**: 
- ⚠️ Never commit `.env.local` to Git
- ✅ Use `EXCHANGE_API_KEY` (NOT `NEXT_PUBLIC_*` for security)
- 🔒 API key is server-only

#### How to Get an API Key:

1. Visit [ExchangeRate-API](https://www.exchangerate-api.com/)
2. Sign up for free (1,500 requests/month)
3. Copy your API key
4. Paste it in `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |

---

## 🏗️ Project Structure

```
easyexchange/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout + metadata
│   ├── page.tsx                 # Home page
│   ├── globals.scss             # Global styles + safe areas
│   ├── fonts.ts                 # Font optimization
│   └── api/convert/route.ts     # Server-side conversion API
│
├── components/                   # React Components
│   ├── Converter/               # Currency converter (main feature)
│   ├── Header/                  # Site header (safe area aware)
│   ├── Hero/                    # Hero section
│   ├── Features/                # Features showcase
│   ├── LoginModal/              # Login modal
│   └── icons/                   # SVG components
│
├── styles/                      # SCSS Architecture
│   ├── abstracts/
│   │   ├── _variables.scss     # Colors, spacing, z-index
│   │   ├── _mixins.scss        # Reusable mixins
│   │   └── _functions.scss     # SCSS functions
│   ├── base/
│   │   ├── _reset.scss         # CSS reset
│   │   └── _typography.scss    # Font styles
│   └── utils/
│       ├── _helpers.scss       # Utility classes
│       └── _text.scss          # Text utilities
│
├── utils/                       # Helper Functions
│   ├── api-config.ts           # Currency configuration
│   ├── request-handler.ts      # API request logic
│   ├── error-handler.ts        # Error handling
│   └── errors.ts               # Custom errors
│
├── types/                       # TypeScript Definitions
│   └── index.ts                # Shared types
│
├── __tests__/                   # Test Files
│   ├── Converter.test.tsx      # 17 comprehensive tests
│   └── CONVERTER_TESTS.md      # Test documentation
│
├── public/                      # Static Assets
│   ├── favicon/                # App icons (all sizes)
│   ├── fonts/                  # Proxima Nova fonts
│   ├── icons/                  # SVG icons
│   └── images/                 # Images
│
├── .env.local.example          # Environment template
├── jest.config.mjs             # Jest configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

## 🎨 Design System

### Color Palette
```scss
$color-primary-green: #87c241;       // Brand green
$color-primary-dark-green: #6da32e;  // Hover states
$color-secondary-gray: #949ea5;      // Secondary text
$color-secondary-dark: #354e57;      // Dark blue-gray
$color-background-white: #ffffff;
$color-text-primary: #1c1e21;
```

### Spacing (8px Grid)
```scss
$spacing-xs: 8px;    $spacing-lg: 32px;
$spacing-sm: 16px;   $spacing-xl: 48px;
$spacing-md: 24px;   $spacing-xxl: 64px;
```

### Breakpoints
```scss
$breakpoint-mobile: 320px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1366px;
```

### Typography
- **Font**: Proxima Nova (Regular, Medium, Bold)
- **Base Size**: 16px (1rem)
- **Scale**: h1: 48px → h3: 24px → Body: 16px

---

## 🧪 Testing

### Run Tests

```bash
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Test Coverage (17 Tests)

✅ **Component Rendering**
- Initial render with default values
- Structure and accessibility

✅ **User Interactions**
- Amount input validation
- Currency selection
- Swap functionality
- Form submission

✅ **API Integration**
- Successful conversions
- Error handling
- Loading states

✅ **Edge Cases**
- Invalid inputs
- Network errors
- Same currency validation

### Example Output

```
PASS  __tests__/Converter.test.tsx
  Converter Component
    ✓ renders with default values (45ms)
    ✓ handles currency selection (18ms)
    ✓ converts currency successfully (102ms)
    ... 14 more tests

Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
```

---

## 🌐 API Documentation

### Server-Side Endpoint

**Endpoint**: `GET /api/convert`

**Query Parameters**:
- `from`: `'USD' | 'GBP' | 'EUR'` - Source currency
- `to`: `'USD' | 'GBP' | 'EUR'` - Target currency
- `amount`: `string` - Amount to convert

**Example Request**:
```bash
GET /api/convert?from=USD&to=GBP&amount=10
```

**Success Response** (200):
```json
{
  "amount": 10,
  "fromCurrency": "USD",
  "toCurrency": "GBP",
  "conversionRate": 0.79,
  "convertedAmount": 7.9,
  "timestamp": "2025-01-07T12:00:00Z"
}
```

**Error Response** (400/500):
```json
{
  "error": "Invalid currency code"
}
```

### Features
- ✅ Server-side API key protection
- ✅ Input validation
- ✅ Error handling
- ✅ 1-hour cache (revalidate: 3600)
- ✅ Type-safe with TypeScript

### External API Provider

**[ExchangeRate-API](https://www.exchangerate-api.com/)**
- 161 currencies supported
- Updates every 24 hours
- Free tier: 1,500 requests/month
- 99.9% uptime

---

## 📱 Mobile Safe Area Support

The app fully supports modern mobile devices:

### iOS Devices
- ✅ Notch (iPhone X+)
- ✅ Dynamic Island (iPhone 14 Pro+)
- ✅ Home Indicator
- ✅ Status bar

### Android Devices
- ✅ Status bar
- ✅ Chrome search bar
- ✅ Navigation bar
- ✅ Edge-to-edge display

### Implementation

```scss
// Header with safe area
.header {
  position: absolute;
  top: env(safe-area-inset-top, 0px);  // Below notch/status bar
}

// Viewport meta (app/layout.tsx)
viewport: {
  viewportFit: 'cover'  // Enable safe areas
}
```

---

## 🎯 Browser Support

- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Firefox 88+
- ✅ Safari 14+ (iOS & macOS)
- ✅ Edge 90+
- ✅ Opera 76+

**Progressive Enhancement**: Modern features degrade gracefully for older browsers.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variable: `EXCHANGE_API_KEY`
5. Deploy!

### Deploy to Netlify

```bash
npm run build
# Deploy .next folder
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

Required for all deployments:
```env
EXCHANGE_API_KEY=your_key_here
```

---

## 🔐 Security

### Implemented Best Practices

✅ **API Key Protection**
- Server-side only (never exposed to client)
- Environment variables
- Not in version control

✅ **Input Validation**
- Client-side validation
- Server-side validation
- TypeScript type checking

✅ **Error Handling**
- Custom error classes
- User-friendly messages
- No sensitive data leaks

### Security Checklist

- [x] API keys in `.env.local`
- [x] `.env.local` in `.gitignore`
- [x] Server-side API routes
- [x] Input validation (client + server)
- [x] HTTPS ready
- [x] No inline scripts

---

## 📈 Performance

### Optimizations

✅ **Images**: Next.js Image component, WebP, lazy loading  
✅ **Fonts**: Local hosting, preloading, WOFF2 format  
✅ **Code**: Tree shaking, code splitting, minification  
✅ **Caching**: Static assets, API caching (1 hour), ISR

### Target Lighthouse Scores

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## 🤝 Contributing

Contributions welcome! Steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Coding Standards

- TypeScript strict mode
- SCSS BEM methodology
- Functional components with hooks
- Write tests for features
- Conventional commits

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Author

**Your Name**
- GitHub: [@umtcn](https://github.com/umtcn)
- LinkedIn: [Your Profile](https://linkedin.com/in/umutcanata/)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [ExchangeRate-API](https://www.exchangerate-api.com/) - Currency data
- [Proxima Nova](https://fonts.adobe.com/fonts/proxima-nova) - Typography

---

## 📞 Support

Have questions or issues?

1. Check [Issues](https://github.com/umtcn/easy-exchange/issues)
2. Create new issue with details
3. Tag appropriately (`bug`, `enhancement`, `question`)

---

## 📊 Project Stats

- **Lines of Code**: ~3,500
- **Components**: 12
- **Tests**: 17 (100% passing)
- **Test Coverage**: 85%+
- **Bundle Size**: ~150KB (gzipped)

---

<div align="center">

Made with ❤️ using Next.js and TypeScript

</div>
