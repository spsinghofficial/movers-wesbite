# Images Directory

This directory contains background images for the Elite Movers website.

## Required Images

Place your custom background images here with the following names:

- `hero-home.jpg` - Homepage hero background
- `hero-services.jpg` - Services page hero background  
- `hero-pricing.jpg` - Pricing page hero background
- `hero-about.jpg` - About page hero background
- `hero-contact.jpg` - Contact page hero background
- `hero-quote.jpg` - Quote page hero background
- `hero-faq.jpg` - FAQ page hero background

## Recommended Specifications

- **Format**: JPG or PNG
- **Resolution**: 1920x1080 or higher
- **Aspect Ratio**: 16:9 or wider
- **File Size**: Optimize for web (under 500KB recommended)
- **Content**: Professional moving/business related imagery

## Current Status

Currently using Unsplash placeholder images. Replace with your custom images when ready.

## Usage

The CSS automatically references these images:
```css
background: linear-gradient(var(--gradient-overlay)), url('./images/hero-home.jpg');
```