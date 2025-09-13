-- JRD Fire Safety Database Setup for Supabase
-- Run these commands in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create locations table
CREATE TABLE IF NOT EXISTS public.locations (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('gallery', 'gallery', true),
    ('locations', 'locations', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security policies for gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access to gallery_images
CREATE POLICY "Public read access for gallery_images" ON public.gallery_images
    FOR SELECT USING (true);

-- Allow public insert access to gallery_images (you may want to restrict this)
CREATE POLICY "Public insert access for gallery_images" ON public.gallery_images
    FOR INSERT WITH CHECK (true);

-- Allow public update access to gallery_images (you may want to restrict this)
CREATE POLICY "Public update access for gallery_images" ON public.gallery_images
    FOR UPDATE USING (true);

-- Allow public delete access to gallery_images (you may want to restrict this)
CREATE POLICY "Public delete access for gallery_images" ON public.gallery_images
    FOR DELETE USING (true);

-- Set up Row Level Security policies for locations
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to locations
CREATE POLICY "Public read access for locations" ON public.locations
    FOR SELECT USING (true);

-- Allow public insert access to locations (you may want to restrict this)
CREATE POLICY "Public insert access for locations" ON public.locations
    FOR INSERT WITH CHECK (true);

-- Allow public update access to locations (you may want to restrict this)
CREATE POLICY "Public update access for locations" ON public.locations
    FOR UPDATE USING (true);

-- Allow public delete access to locations (you may want to restrict this)
CREATE POLICY "Public delete access for locations" ON public.locations
    FOR DELETE USING (true);

-- Set up storage policies for gallery bucket
CREATE POLICY "Public read access for gallery bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Public insert access for gallery bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Public update access for gallery bucket" ON storage.objects
    FOR UPDATE USING (bucket_id = 'gallery');

CREATE POLICY "Public delete access for gallery bucket" ON storage.objects
    FOR DELETE USING (bucket_id = 'gallery');

-- Set up storage policies for locations bucket
CREATE POLICY "Public read access for locations bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'locations');

CREATE POLICY "Public insert access for locations bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'locations');

CREATE POLICY "Public update access for locations bucket" ON storage.objects
    FOR UPDATE USING (bucket_id = 'locations');

CREATE POLICY "Public delete access for locations bucket" ON storage.objects
    FOR DELETE USING (bucket_id = 'locations');

-- Insert some sample data (optional)
INSERT INTO public.gallery_images (title, location, description, image_url, file_name) VALUES
    ('Corporate Office Complex', '50+ ABC Extinguishers Installed', 'Complete fire safety installation for a 10-story office building', 'https://via.placeholder.com/800x600/e74c3c/ffffff?text=Office+Complex', 'sample-office.jpg'),
    ('Manufacturing Plant', 'Complete Fire Suppression System', 'Industrial-grade fire suppression system with foam and CO2 units', 'https://via.placeholder.com/800x600/f39c12/ffffff?text=Manufacturing+Plant', 'sample-manufacturing.jpg'),
    ('Logistics Warehouse', 'High-Capacity Foam Systems', 'Large-scale warehouse protection with automated foam systems', 'https://via.placeholder.com/800x600/27ae60/ffffff?text=Warehouse', 'sample-warehouse.jpg');

INSERT INTO public.locations (title, address, description, image_url, file_name) VALUES
    ('Main Branch', '123 Fire Safety Boulevard, Safety City, SC 12345', 'Our main headquarters with full showroom and service center', 'https://via.placeholder.com/600x400/e74c3c/ffffff?text=Main+Branch', 'main-branch.jpg'),
    ('North Branch', '456 Safety Avenue, North District, ND 67890', 'Specialized in commercial fire safety solutions', 'https://via.placeholder.com/600x400/f39c12/ffffff?text=North+Branch', 'north-branch.jpg');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at ON public.gallery_images(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_locations_created_at ON public.locations(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON public.gallery_images
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON public.locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.gallery_images TO anon, authenticated;
GRANT ALL ON public.locations TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;