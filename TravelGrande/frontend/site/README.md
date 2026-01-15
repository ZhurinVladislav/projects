# TravelGrande

**Unique Houses & Apartments** - Только избранные дома для вашего идеального путешествия

This is a Next.js 16 project for TravelGrande, a premium accommodation rental platform featuring hand-picked exclusive properties.

## Features

- 🏠 **Curated Properties** - Only verified, premium accommodations
- 🎨 **Modern Design** - Clean, responsive layout with Tailwind CSS 4
- 🔍 **Smart Search** - Filter by city, date, and number of guests
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Fast Performance** - Built with Next.js 16 and React 19

## Tech Stack

- **Framework:** Next.js 16.1.2
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4
- **TypeScript:** 5.x
- **Fonts:** Custom Radiotechnika + Open Sans + Times New Roman

## Color Palette

- **Primary Gold:** `#C8AC71`
- **Secondary Gold:** `#BE8817`
- **Dark Text:** `#2B2A29`
- **Gray Text:** `#ACACAC`
- **Light Background:** `#FBF7F0`
- **Border:** `#E5E5E5`
- **White:** `#FFFFFF`

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── (public)/
│   │   └── (home)/
│   │       ├── _components/     # Home page components
│   │       │   ├── Hero.tsx
│   │       │   ├── SearchBar.tsx
│   │       │   ├── WhySection.tsx
│   │       │   ├── DestinationsSection.tsx
│   │       │   ├── NewPropertiesSection.tsx
│   │       │   ├── HowWeChooseSection.tsx
│   │       │   ├── AboutSection.tsx
│   │       │   └── CTASection.tsx
│   │       └── page.tsx         # Home page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── Header/                  # Header component
│   └── Footer/                  # Footer component
├── config/
│   ├── site.config.ts          # Site configuration
│   └── pages.config.ts         # Page routes
└── shared/
    └── data/
        └── menu.data.ts        # Navigation menu data
```

## Page Sections

### Home Page

1. **Hero Section** - Large banner with search functionality
2. **Why TravelGrande** - Key features and benefits
3. **Destinations** - Popular cities and locations
4. **New Properties** - Latest property listings
5. **How We Choose** - Selection process explanation
6. **About** - Company mission and values
7. **CTA** - Call-to-action for user engagement

## Customization

### Colors

Edit colors in `src/app/globals.css`:

```css
:root {
  --primary: #C8AC71;
  --secondary: #BE8817;
  /* ... other colors */
}
```

### Site Information

Update site details in `src/config/site.config.ts`:

```typescript
export const SITE = {
  APP_NAME: 'TravelGrande',
  APP_DESCRIPTION: 'Unique Houses & Apartments',
  E_MAIL: 'info@travelgrande.ru',
  PHONE_MAIN: '+79388654699',
};
```

## Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Then start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This project is proprietary and confidential.
