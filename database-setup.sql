-- Fire Safety Website Database Setup for Supabase
-- Run these commands in your Supabase SQL Editor

-- =============================================
-- 1. CREATE TABLES
-- =============================================

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations Table
CREATE TABLE IF NOT EXISTS locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table (for authentication)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- 2. CREATE STORAGE BUCKETS
-- =============================================

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for location images
INSERT INTO storage.buckets (id, name, public)
VALUES ('locations', 'locations', true)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 3. SET UP ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. CREATE POLICIES
-- =============================================

-- Gallery Images Policies
-- Allow public read access
CREATE POLICY "Allow public read access on gallery_images" ON gallery_images
    FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert on gallery_images" ON gallery_images
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on gallery_images" ON gallery_images
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on gallery_images" ON gallery_images
    FOR DELETE USING (auth.role() = 'authenticated');

-- Locations Policies
-- Allow public read access
CREATE POLICY "Allow public read access on locations" ON locations
    FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert on locations" ON locations
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on locations" ON locations
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on locations" ON locations
    FOR DELETE USING (auth.role() = 'authenticated');

-- Admin Users Policies
-- Only allow authenticated users to read their own data
CREATE POLICY "Users can read own data" ON admin_users
    FOR SELECT USING (auth.uid() = id);

-- =============================================
-- 5. STORAGE POLICIES
-- =============================================

-- Gallery bucket policies
CREATE POLICY "Allow public read access on gallery bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Allow authenticated upload to gallery bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete from gallery bucket" ON storage.objects
    FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Locations bucket policies
CREATE POLICY "Allow public read access on locations bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'locations');

CREATE POLICY "Allow authenticated upload to locations bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'locations' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete from locations bucket" ON storage.objects
    FOR DELETE USING (bucket_id = 'locations' AND auth.role() = 'authenticated');

-- =============================================
-- 6. CREATE INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at ON gallery_images(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_locations_created_at ON locations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- =============================================
-- 7. CREATE SAMPLE ADMIN USER
-- =============================================

-- Insert a sample admin user (password: admin123)
-- Note: In production, use a strong password and proper hashing
INSERT INTO admin_users (email, password_hash, name)
VALUES (
    'admin@firesafety.com',
    '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq', -- This is a placeholder hash
    'Admin User'
)
ON CONFLICT (email) DO NOTHING;

-- =============================================
-- 8. CREATE FUNCTIONS (OPTIONAL)
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_gallery_images_updated_at
    BEFORE UPDATE ON gallery_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SETUP COMPLETE!
-- =============================================

-- Your database is now ready for the Fire Safety website.
-- Make sure to:
-- 1. Update your Supabase credentials in supabase-config.js
-- 2. Create a proper admin user with a secure password
-- 3. Test the upload functionality

-- Sample data (optional - remove in production)
INSERT INTO gallery_images (title, location, description, image_url)
VALUES 
    ('Fire Extinguisher Installation', 'ABC Corporation Office', 'Complete fire safety system installation', 'https://via.placeholder.com/600x400/ff6b35/ffffff?text=Fire+Safety+1'),
    ('Smoke Detector Setup', 'XYZ Restaurant', 'Advanced smoke detection system', 'https://via.placeholder.com/600x400/ff6b35/ffffff?text=Fire+Safety+2')
ON CONFLICT DO NOTHING;

INSERT INTO locations (title, address, description, image_url)
VALUES 
    ('Main Branch', '123 Fire Safety Street, City Center', 'Our main headquarters with full showroom and service center', 'https://via.placeholder.com/600x400/ff6b35/ffffff?text=Main+Branch'),
    ('North Branch', '456 Safety Avenue, North District', 'Specialized in commercial fire safety solutions', 'https://via.placeholder.com/600x400/ff6b35/ffffff?text=North+Branch')
ON CONFLICT DO NOTHING;