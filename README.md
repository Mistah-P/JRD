# JRD Fire Safety Website

A professional fire safety equipment business website with admin dashboard and Supabase integration.

## Features

- 🔥 Fire safety themed design
- 📱 Fully responsive layout
- 🖼️ Dynamic image gallery with carousel
- 👨‍💼 Admin dashboard for content management
- 🗄️ Supabase backend integration
- 📍 Location management
- 💰 Pricing sections
- 📞 Contact forms

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the SQL commands from `database-setup.sql`
4. Go to Settings > API to get your project URL and anon key

### 2. Configure Supabase Credentials

Edit `script.js` and replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 3. Deploy

Deploy the files to your hosting platform (Vercel, Netlify, etc.)

## Admin Access

- Visit `https://your-domain.com/#admin` to access the admin dashboard
- Upload images for gallery and locations
- Manage content dynamically

## File Structure

```
├── index.html          # Main website
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── database-setup.sql  # Supabase database setup
└── README.md          # This file
```

## Admin Features

### Gallery Management
- Upload installation photos
- Add titles, locations, and descriptions
- Delete existing images
- Real-time updates to main site

### Location Management
- Upload branch/location photos
- Add branch information
- Manage multiple locations

## Customization

### Colors
The fire safety theme uses these main colors:
- Primary Red: `#e74c3c`
- Secondary Red: `#c0392b`
- Orange: `#f39c12`
- Dark Blue: `#2c3e50`

### Content
- Update contact information in the Contact section
- Modify pricing in the Pricing section
- Change company information throughout the site

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Notes

The current setup allows public access to admin functions. For production use, consider:
- Adding authentication
- Restricting admin access
- Implementing user roles
- Adding CSRF protection

## Support

For technical support or customization requests, contact the development team.

## License

This project is proprietary software for JRD Fire Safety Solutions.