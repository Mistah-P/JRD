# Fire Safety Website - Admin Setup & Usage Guide

## 🚀 Initial Setup

### 1. Database Setup (Supabase)

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization and enter project details:
   - **Name**: Fire Safety Website
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your location
4. Wait for project creation (2-3 minutes)

#### Step 2: Run Database Scripts
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `database-setup.sql`
3. Paste it in the SQL Editor and click **Run**
4. Verify tables are created in **Table Editor**

#### Step 3: Get API Credentials
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public key** (starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)

#### Step 4: Update Configuration
1. Open `supabase-config.js`
2. Replace the placeholder values:
```javascript
const supabaseUrl = 'YOUR_PROJECT_URL_HERE';
const supabaseKey = 'YOUR_ANON_KEY_HERE';
```

### 2. Admin Account Setup

#### Option A: Using Supabase Auth (Recommended)
1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User**
3. Enter:
   - **Email**: admin@yourdomain.com
   - **Password**: Create a strong password
   - **Email Confirm**: Yes
4. Save the credentials securely

#### Option B: Manual Database Entry
1. Go to **SQL Editor** in Supabase
2. Run this query (replace with your details):
```sql
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES (
    'admin@yourdomain.com',
    crypt('your_password', gen_salt('bf')),
    NOW()
);
```

### 3. Website Deployment

#### For Static Hosting (Netlify/Vercel/GitHub Pages)
1. Upload all files to your hosting platform
2. Set `index.html` as the main page
3. Ensure all file paths are correct

#### For Custom Server
1. Upload files to your web server
2. Configure web server to serve static files
3. Ensure HTTPS is enabled (required for Supabase)

---

## 📱 Admin Dashboard Usage

### Accessing Admin Dashboard
1. Navigate to `yourdomain.com/admin-dashboard.html`
2. Enter your admin credentials
3. Click **Login**

### Gallery Management

#### Adding New Gallery Images
1. Click **Gallery Management** tab
2. Fill out the form:
   - **Title**: Descriptive name (e.g., "Fire Extinguisher Installation")
   - **Location**: Where the work was done
   - **Description**: Brief description of the work
   - **Image**: Select image file (JPG/PNG, max 5MB)
3. Click **Upload Image**
4. Wait for success message

#### Managing Existing Images
- View all uploaded images in the **Current Gallery Images** section
- Click **Delete** to remove unwanted images
- Images are automatically displayed on the main website

### Location Management

#### Adding New Locations
1. Click **Location Management** tab
2. Fill out the form:
   - **Branch Name**: Name of your branch/office
   - **Address**: Complete address
   - **Description**: What services this location offers
   - **Image**: Photo of the location/building
3. Click **Upload Location**
4. Wait for success message

#### Managing Existing Locations
- View all locations in the **Current Locations** section
- Click **Delete** to remove locations
- Locations appear in the "Our Location" section on main website

---

## 🌐 Website Features Overview

### Main Website Sections

1. **Hero Section**: Main banner with company introduction
2. **About Us**: Company information and services
3. **Recent Fire Safety Installations**: Dynamic gallery from admin uploads
4. **Our Location**: Dynamic locations from admin uploads
5. **Products**: Fire safety equipment showcase
6. **Fire Safety Equipment Pricing**: Pricing table with contact popup
7. **Contact**: Contact information and form

### Interactive Features

#### Contact Popup
- Triggered by "Order Now" buttons in pricing section
- Shows:
  - Company location
  - Phone number for orders
  - Facebook link
- Can be closed by:
  - Clicking the X button
  - Clicking outside the popup
  - Pressing Escape key

#### Image Gallery
- Automatic slideshow of uploaded images
- Navigation arrows for manual browsing
- Responsive design for mobile devices

#### Location Grid
- Displays all uploaded locations
- Responsive card layout
- Hover effects for better user experience

---

## 🔧 Maintenance & Troubleshooting

### Regular Maintenance

1. **Weekly Tasks**:
   - Check and update gallery images
   - Verify all links are working
   - Review contact form submissions

2. **Monthly Tasks**:
   - Update pricing information if needed
   - Check website performance
   - Backup database (Supabase handles this automatically)

### Common Issues & Solutions

#### "Images not uploading"
- **Check**: Internet connection
- **Check**: Image file size (must be under 5MB)
- **Check**: Image format (JPG, PNG, WebP only)
- **Solution**: Try refreshing the page and uploading again

#### "Can't login to admin dashboard"
- **Check**: Email and password are correct
- **Check**: Account exists in Supabase Auth
- **Solution**: Reset password through Supabase dashboard

#### "Images not showing on website"
- **Check**: Supabase storage bucket permissions
- **Check**: Image URLs in database
- **Solution**: Re-upload the images through admin dashboard

#### "Website loading slowly"
- **Check**: Image file sizes (optimize large images)
- **Check**: Internet connection
- **Solution**: Compress images before uploading

### Getting Help

1. **Supabase Issues**: Check [Supabase Documentation](https://supabase.com/docs)
2. **Website Issues**: Contact your web developer
3. **Hosting Issues**: Contact your hosting provider

---

## 📞 Contact Information Update

### Updating Contact Details
To update phone numbers, addresses, or social media links:

1. **In Contact Popup**: Edit `index.html`, search for `contactModal`
2. **In Contact Section**: Edit `index.html`, search for `contact` section
3. **In Footer**: Edit `index.html`, search for `footer` section

### Updating Social Media Links
- Facebook: Update the `href` attribute in the contact popup
- Add more social media: Copy the Facebook link structure

---

## 🔒 Security Best Practices

1. **Use Strong Passwords**: Minimum 12 characters with mixed case, numbers, symbols
2. **Regular Updates**: Keep Supabase project updated
3. **Backup Regularly**: Export data from Supabase monthly
4. **Monitor Access**: Check Supabase logs for unusual activity
5. **HTTPS Only**: Ensure website always uses HTTPS

---

## 📈 Analytics & Monitoring

### Recommended Tools
1. **Google Analytics**: Track website visitors
2. **Supabase Dashboard**: Monitor database usage
3. **PageSpeed Insights**: Check website performance

### Key Metrics to Monitor
- Page load times
- Image upload success rates
- Contact form submissions
- Mobile vs desktop usage

---

*This guide covers all essential aspects of managing your Fire Safety website. Keep this document handy for reference and share it with team members who will be managing the website.*