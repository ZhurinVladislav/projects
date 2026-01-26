# Quick Start Guide

Get up and running with the updated TravelGrande website in minutes.

## 1. Install Dependencies

First, install the required packages including Swiper.js:

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 3. What's New?

### ✅ Mobile Menu
- Look for the **hamburger menu** icon on mobile/tablet (< 768px width)
- Click to open sliding navigation panel
- Click overlay or X to close

### ✅ Search Dropdowns
- **City** - Click to see city options
- **Date** - Native date picker
- **Guests** - Select number of guests (1-9+)

### ✅ Image Sliders
- **Destinations** - Swipe through destinations (arrows at top right)
- **Property Cards** - Each property has multiple images (use arrows or swipe)

## 4. Test Mobile View

### In Chrome/Edge:
1. Press `F12` to open DevTools
2. Click the device toolbar icon (or `Ctrl+Shift+M`)
3. Select a mobile device (iPhone, Galaxy, etc.)
4. Test the mobile menu and sliders

### Breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 5. Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 6. File Locations

### If you need to customize:

**Mobile Menu:**
```
src/components/Header/MobileMenu.tsx
```

**Search Bar:**
```
src/app/(public)/(home)/_components/SearchBar.tsx
```

**Destinations Slider:**
```
src/app/(public)/(home)/_components/DestinationsSection.tsx
```

**Property Cards:**
```
src/app/(public)/(home)/_components/PropertyCard.tsx
src/app/(public)/(home)/_components/NewPropertiesSection.tsx
```

**Global Styles:**
```
src/app/globals.css
```

## 7. Troubleshooting

### Problem: Swiper not working
**Solution:** Make sure you ran `npm install` after updating package.json

### Problem: Mobile menu not showing
**Solution:** Resize browser to < 768px width or use mobile device emulator

### Problem: Horizontal scroll appearing
**Solution:** Check that overflow-x-hidden is applied (should be by default)

### Problem: Dropdowns not closing
**Solution:** Click outside the dropdown or press ESC key

### Problem: Images not loading
**Solution:** Check network connection and clear browser cache

## 8. Quick Style Changes

### Change primary color:
Edit `src/app/globals.css`:
```css
:root {
  --primary: #C8AC71; /* Change this */
}
```

### Change mobile menu width:
Edit `src/components/Header/MobileMenu.tsx`:
```tsx
className="... w-[280px] ..." // Change width here
```

### Change slider speed:
Edit Swiper components:
```tsx
<Swiper
  speed={300} // Add this prop
  ...
>
```

## 9. Key Features to Test

- [x] Mobile menu opens/closes smoothly
- [x] Search dropdowns work correctly
- [x] City selection updates display
- [x] Guest counter shows correct pluralization
- [x] Destination slider navigates with arrows
- [x] Property images slide with arrows and dots
- [x] Touch swipe works on mobile devices
- [x] No horizontal scrolling on any screen size
- [x] All links navigate correctly
- [x] Responsive layout adapts to screen size

## 10. Next Steps

1. **Customize content** - Update text, images, and links
2. **Add real data** - Connect to backend API
3. **Implement booking** - Add booking functionality
4. **Add filters** - Implement property filtering
5. **SEO optimization** - Add meta tags and structured data

## Need Help?

- Read **CHANGES.md** for detailed implementation info
- Read **INSTALLATION.md** for setup details
- Check browser console for error messages
- Verify Node.js version (should be 18+)

---

**Ready to go!** 🚀

Your TravelGrande website is now equipped with:
- ✨ Smooth image sliders
- 📱 Mobile-friendly navigation  
- 🔍 Interactive search dropdowns
- 📐 Perfect responsive design

Start customizing and building your dream travel platform!
