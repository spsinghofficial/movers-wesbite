# Movers Business Static Website - Claude Instructions

## Project Overview
Create a professional static website for a moving company using modern web technologies. The site should be responsive, SEO-optimized, and conversion-focused.

## Technology Stack
- HTML5
- CSS3 (with Tailwind CSS for styling)
- Vanilla JavaScript (for interactions)
- Static site - no backend required
- Form submissions via Formspree or Netlify Forms

## Website Structure

### 1. Homepage (index.html)

#### Hero Section
Headline: "Professional Moving Services You Can Trust"
Subheading: "Making Your Move Stress-Free Since [Year]"
CTA Buttons: "Get Free Quote" | "Call Now: (555) 123-4567"
Hero Image: Professional movers in action

#### Key Features Section
- ✓ Licensed & Insured
- ✓ 24/7 Customer Support  
- ✓ Transparent Pricing
- ✓ Professional Team
- ✓ On-Time Guarantee
- ✓ Full-Service Packing

#### Services Overview (with icons)
1. **Local Moving**
   - "Swift and careful moving within the city and surrounding areas"
   
2. **Long-Distance Moving**
   - "Coast-to-coast relocation with tracking and insurance"
   
3. **Commercial Moving**
   - "Office relocation with minimal business disruption"
   
4. **Packing Services**
   - "Professional packing with premium materials"

#### Why Choose Us Section
Title: "Why Families Trust [Company Name]"

15+ Years of Experience
10,000+ Successful Moves
98% Customer Satisfaction
Fully Licensed & Insured
Competitive Pricing
Free In-Home Estimates


#### Testimonials Section
Customer 1: "The team was professional, efficient, and handled our belongings with care. Highly recommend!"

Sarah M., [City]

Customer 2: "Best moving experience we've had. On time, on budget, and zero damage."

John D., [City]

Customer 3: "They made our cross-country move seamless. Excellent communication throughout."

Maria L., [City]


#### CTA Section
"Ready to Make Your Move?"
"Get Your Free Quote in 60 Seconds"
[Quote Form Button]

### 2. Services Page (services.html)

#### Residential Moving
Title: "Residential Moving Services"
Content:

Full-service home moving
Apartment & condo specialists
Senior relocation services
Packing and unpacking
Furniture disassembly/reassembly
Specialty item handling (pianos, artwork, antiques)

Pricing: "Starting at $[X]/hour for 2 movers and truck"

#### Commercial Moving
Title: "Commercial & Office Moving"
Content:

Office relocation planning
IT equipment handling
Furniture installation
Weekend & after-hours moving
Minimal downtime guarantee
Employee relocation coordination

Pricing: "Custom quotes based on scope"

#### Additional Services

Packing Supplies & Materials
Storage Solutions (Short & Long-term)
Junk Removal
Moving Labor Only
Piano & Specialty Moving
International Relocation


### 3. Pricing Page (pricing.html)

#### Transparent Pricing Structure
Local Moving Rates:

2 Movers + Truck: $120/hour
3 Movers + Truck: $160/hour
4 Movers + Truck: $200/hour
Additional Mover: $40/hour

Long-Distance Moving:

Based on weight and distance
Free in-home estimate
Binding quotes available

No Hidden Fees - Includes:
✓ Fuel charges
✓ Equipment & dollies
✓ Furniture pads
✓ Basic insurance
✓ Taxes

#### Moving Cost Calculator
```html
<!-- Interactive form -->
Moving From: [ZIP Code]
Moving To: [ZIP Code]
Home Size: [Dropdown: Studio/1BR/2BR/3BR/4BR+]
Moving Date: [Date Picker]
Additional Services: [Checkboxes]
[Calculate Estimate Button]
4. About Us Page (about.html)
Title: "Your Trusted Moving Partner Since [Year]"

Our Story:
"Founded in [Year], [Company Name] began with a simple mission: to take the stress out of moving. What started as a small family business with one truck has grown into [City]'s most trusted moving company, serving thousands of satisfied customers."

Our Values:
- Integrity: Honest pricing, no hidden fees
- Care: Your belongings treated as our own
- Reliability: On-time, every time
- Excellence: Continuous training and improvement

Meet Our Team:
[Team photos and brief bios]

Certifications & Memberships:
- American Moving & Storage Association
- Better Business Bureau A+ Rating
- State License #[Number]
- Fully Insured & Bonded
5. Contact Page (contact.html)
Contact Information
Call Us: (555) 123-4567
Email: info@[company].com
Address: [Your Address]

Business Hours:
Monday-Friday: 8:00 AM - 8:00 PM
Saturday: 9:00 AM - 6:00 PM
Sunday: 10:00 AM - 4:00 PM
Contact Form
Fields:
- Name*
- Email*
- Phone*
- Moving Date
- Moving From (ZIP)
- Moving To (ZIP)
- Service Type [Dropdown]
- Message
[Submit Button]
Emergency Moving
"Need Emergency Moving Services?"
"We offer 24/7 emergency moving for urgent situations"
Call Now: (555) 123-4567
6. Quote Page (quote.html)
Detailed Quote Form
Personal Information:
- Full Name*
- Email*
- Phone*
- Preferred Contact Method

Move Details:
- Moving Date*
- Flexible on Date? [Yes/No]
- Moving From Address*
- Moving To Address*
- Property Type [House/Apartment/Office]
- Floors/Elevator Access
- Home Size
- Estimated Weight/Items

Services Needed:
□ Packing Service
□ Unpacking Service  
□ Storage Needed
□ Piano/Special Items
□ Disassembly/Assembly
□ Packing Supplies Only

Additional Information:
[Text area for special requirements]

[Get My Free Quote Button]
7. FAQ Page (faq.html)
Q: How far in advance should I book?
A: We recommend booking at least 2-4 weeks in advance, especially during peak season (May-September).

Q: What items can't you move?
A: Hazardous materials, perishables, plants, pets, and personal valuables like jewelry or important documents.

Q: Is my move insured?
A: Yes, basic liability coverage is included. Additional insurance options are available.

Q: Do you provide packing materials?
A: Yes, we offer complete packing supplies or can include them in full-service packing.

Q: Can I pack my own belongings?
A: Absolutely! We offer flexible service options to fit your needs and budget.

Q: What payment methods do you accept?
A: Cash, check, and all major credit cards. Payment is due upon delivery.

Q: Do you offer storage services?
A: Yes, we provide both short-term and long-term storage solutions.

Q: How is the cost calculated?
A: Local moves are hourly, long-distance moves are based on weight and distance.
SEO Content Requirements
Meta Tags for Each Page
html<title>Page Specific Title | Company Name Moving Services</title>
<meta name="description" content="Page specific description 150-160 chars">
<meta name="keywords" content="movers, moving company, relocation, [city] movers">
Schema Markup
json{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "Company Name",
  "url": "https://website.com",
  "telephone": "+1-555-123-4567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "324"
  }
}
Design Guidelines
Color Scheme
css:root {
  --primary: #2563eb; /* Professional blue */
  --secondary: #10b981; /* Trust green */
  --accent: #f59e0b; /* CTA orange */
  --text-dark: #1f2937;
  --text-light: #6b7280;
  --background: #ffffff;
  --background-alt: #f3f4f6;
}
Typography

Headers: Bold, Sans-serif (Inter, Poppins)
Body: Clean, readable (Open Sans, Roboto)
Font sizes: Responsive using rem units

Mobile Responsiveness

Mobile-first approach
Hamburger menu for navigation
Touch-friendly buttons (min 44x44px)
Optimized images with lazy loading

Features to Implement
Essential Features

Click-to-Call Buttons (mobile)
Sticky Navigation with phone number
Live Chat Widget (Tawk.to or similar)
Google Maps Integration for service areas
Trust Badges (BBB, Licensed, Insured)
Social Proof (reviews, testimonials)
Loading Speed (<3 seconds)
SSL Certificate