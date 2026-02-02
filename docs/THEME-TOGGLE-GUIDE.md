# Theme Toggle System - Implementation Guide

## ✅ What's Been Implemented

A complete theme switching system that allows clients to preview two color schemes:

### **Current Theme (Orange)**
- Primary: `#f97316` (Orange 500)
- Hover: `#ea580c` (Orange 600)
- Accent: `#fb923c` (Orange 400)
- Background: `#fafaf9`
- Headings: `#1c1917`

### **New Theme (Copper)**
- Primary: `#B37D56` (Copper)
- Hover: `#D4A07E` (Light Accent)
- Accent: `#D4A07E` (Light Accent)
- Background: `#FAF9F6` (Off-white)
- Headings: `#4D3124` (Dark Earth)

---

## 🎯 How It Works

### For Users:
1. Look for the **palette icon** (🎨) in the header (top right on desktop, in mobile menu)
2. Click to toggle between "Orange" and "Copper" themes
3. The choice is saved in browser localStorage and persists across page visits

### For Developers:

#### CSS Variables (`globals.css`):
```css
:root {
  --primary: #f97316;        /* Main buttons, badges */
  --primary-hover: #ea580c;  /* Hover states */
  --primary-dark: #c2410c;   /* Dark variant */
  --accent: #fb923c;         /* Links, highlights */
  --heading: #1c1917;        /* Heading text */
}

[data-theme="copper"] {
  --primary: #B37D56;
  --primary-hover: #D4A07E;
  --primary-dark: #7D513A;
  --accent: #D4A07E;
  --heading: #4D3124;
}
```

#### Usage in Components:
Instead of hardcoded Tailwind colors:
```jsx
// ❌ Old way
className="bg-primary-600 hover:bg-primary-700"

// ✅ New way
className="bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
```

---

## 📁 Files Modified

### New Files:
- `components/ThemeToggle.tsx` - Toggle button component

### Updated Files:
- `tailwind.config.ts` - Added copper color palette
- `app/globals.css` - Added CSS variable system for themes
- `components/Header.tsx` - Integrated ThemeToggle, updated hover colors
- `app/page.tsx` - Converted all hardcoded colors to CSS variables

---

## 🎨 Design Guidelines (As Requested)

### Copper Theme Philosophy:
- **Modern, professional, high-end architectural feel**
- **Spacious layouts** - Colors used as intentional focal points
- **Clean off-white background** (#FAF9F6) lets copper tones pop
- **Typography**: Dark Earth (#4D3124) for headings, neutral grey for body
- **Buttons**: Primary Copper (#B37D56) with white text, transitions to Light Accent (#D4A07E) on hover

### Where Colors Are Applied:
1. **Buttons & CTAs** - Primary copper
2. **Badges & Labels** - Primary copper background
3. **Borders & Accents** - Primary copper for emphasis
4. **Icons** - Primary copper for consistency
5. **Hover States** - Light accent for smooth transitions
6. **Links** - Accent color for subtle highlights
7. **Headings** - Dark Earth for strong hierarchy

---

## 🔧 Adding Theme Support to New Components

When creating new components, use CSS variables:

```tsx
// Buttons
<button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)]">
  Click Me
</button>

// Links
<a className="text-[var(--accent)] hover:text-[var(--primary)]">
  Learn More
</a>

// Headings
<h1 className="text-[var(--heading)]">
  Title
</h1>

// Borders
<div className="border-l-4 border-[var(--primary)]">
  Content
</div>
```

---

## 🚀 Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:** http://localhost:3000

3. **Find theme toggle** in the header (palette icon)

4. **Click to switch themes** - entire site updates instantly

5. **Refresh page** - theme persists (saved in localStorage)

---

## 📱 Responsive Behavior

- **Desktop:** Theme toggle appears in header with label "Try Copper" / "Orange"
- **Mobile:** Theme toggle appears at top of mobile menu

---

## 🎯 Benefits

✅ **Client Preview** - Easy for clients to see both options  
✅ **Instant Switching** - No page reload required  
✅ **Persistent** - Choice saved in browser  
✅ **Scalable** - Easy to add more themes in future  
✅ **Maintainable** - Single source of truth for colors  
✅ **Professional** - Smooth transitions between themes  

---

## 🔮 Future Enhancements

Potential additions:
- Third theme option
- Admin panel to customize colors
- Per-page theme overrides
- Automatic theme based on time of day
- User preference sync with account system

---

## 📊 Color Reference

### Current Theme (Orange):
```
Primary:       #f97316  ■
Primary Hover: #ea580c  ■
Primary Dark:  #c2410c  ■
Accent:        #fb923c  ■
Heading:       #1c1917  ■
Background:    #fafaf9  ▢
```

### Copper Theme:
```
Primary:       #B37D56  ■
Primary Hover: #D4A07E  ■
Primary Dark:  #7D513A  ■
Accent:        #D4A07E  ■
Heading:       #4D3124  ■
Background:    #FAF9F6  ▢
```

---

**Status:** ✅ Fully Implemented and Ready to Use!

**Date:** January 23, 2026
