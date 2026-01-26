# Installation Instructions

## Required Dependencies

This project now uses **Swiper.js** for image sliders and carousels. Please install the dependencies before running the development server.

### Install Dependencies

Run the following command in your terminal:

```bash
npm install
```

This will install all dependencies including:
- `swiper` (v11.1.15) - For image sliders and carousels

### Development Server

After installing dependencies, start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## New Features Added

### 1. **Mobile Menu**
- Hamburger menu for mobile devices
- Slide-in navigation panel
- Responsive and touch-friendly
- Located in `src/components/Header/MobileMenu.tsx`

### 2. **Search Bar with Dropdowns**
- City selector with dropdown list
- Date picker input
- Guest counter with dropdown
- All dropdowns close when clicking outside
- Located in `src/app/(public)/(home)/_components/SearchBar.tsx`

### 3. **Swiper Sliders**

#### Destinations Section
- Horizontal slider for destination cards
- Navigation arrows
- Responsive breakpoints (1 slide on mobile, 2 on tablet, 4 on desktop)
- Located in `src/app/(public)/(home)/_components/DestinationsSection.tsx`

#### Property Cards
- Image carousel for each property
- Custom pagination dots
- Navigation arrows
- Located in `src/app/(public)/(home)/_components/PropertyCard.tsx`

### 4. **Design Fixes**
- Fixed z-index stacking issues
- Resolved container overflow problems
- Improved responsive behavior
- Added proper overflow handling

## Component Structure

```
src/
├── app/
│   └── (public)/
│       └── (home)/
│           └── _components/
│               ├── Hero.tsx (Updated with mobile menu)
│               ├── SearchBar.tsx (New dropdowns)
│               ├── DestinationsSection.tsx (Swiper slider)
│               ├── PropertyCard.tsx (Image slider)
│               └── NewPropertiesSection.tsx (Uses PropertyCard)
└── components/
    └── Header/
        └── MobileMenu.tsx (New mobile navigation)
```

## Responsive Breakpoints

- **max-sm**: < 640px (Mobile)
- **max-md**: < 768px (Tablet)
- **max-lg**: < 1024px (Small Desktop)

## Z-Index Layers

- Mobile Menu: z-50 (panel), z-40 (overlay)
- Search Bar: z-30
- Dropdowns: z-50
- Hero Content: z-10

## Troubleshooting

If you encounter issues:

1. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **PowerShell execution policy error** (Windows):
   - Run PowerShell as Administrator
   - Execute: `Set-ExecutionPolicy RemoteSigned`
   - Try `npm install` again

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
