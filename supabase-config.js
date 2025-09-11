// Supabase Configuration
// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://mprkjtpgvysisatrjzjm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wcmtqdHBndnlzaXNhdHJqemptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1ODMyNjQsImV4cCI6MjA3MzE1OTI2NH0.6jF7SsfY0B70XN4XR5FWS5b6_3mOgxnPTBO7nVOXYhg';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Gallery Images Management
class GalleryManager {
    constructor() {
        this.bucketName = 'gallery';
        this.tableName = 'gallery_images';
    }

    // Upload image to Supabase storage
    async uploadImage(file, fileName) {
        try {
            const { data, error } = await supabaseClient.storage
                .from(this.bucketName)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    // Get public URL for uploaded image
    getImageUrl(fileName) {
        const { data } = supabaseClient.storage
            .from(this.bucketName)
            .getPublicUrl(fileName);
        return data.publicUrl;
    }

    // Save image metadata to database
    async saveImageMetadata(imageData) {
        try {
            const { data, error } = await supabaseClient
                .from(this.tableName)
                .insert([
                    {
                        image_url: imageData.imageUrl,
                        title: imageData.title,
                        location: imageData.location,
                        description: imageData.description,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error saving image metadata:', error);
            throw error;
        }
    }

    // Get all gallery images
    async getAllImages() {
        try {
            const { data, error } = await supabaseClient
                .from(this.tableName)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    }

    // Delete image and metadata
    async deleteImage(imageId, fileName) {
        try {
            // Delete from storage
            const { error: storageError } = await supabaseClient.storage
                .from(this.bucketName)
                .remove([fileName]);

            if (storageError) throw storageError;

            // Delete from database
            const { error: dbError } = await supabaseClient
                .from(this.tableName)
                .delete()
                .eq('id', imageId);

            if (dbError) throw dbError;
            return true;
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    }

    // Update image metadata
    async updateImageMetadata(imageId, updateData) {
        try {
            const { data, error } = await supabaseClient
                .from(this.tableName)
                .update(updateData)
                .eq('id', imageId);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating image metadata:', error);
            throw error;
        }
    }
}

// Admin Authentication
class AdminAuth {
    constructor() {
        this.adminEmail = 'admin@jrdfiresafety.com'; // Change this to your admin email
    }

    // Simple admin login (you can enhance this with proper authentication)
    async login(email, password) {
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;
            
            // Check if user is admin
            if (data.user.email === this.adminEmail) {
                localStorage.setItem('isAdmin', 'true');
                return { success: true, user: data.user };
            } else {
                throw new Error('Unauthorized: Admin access required');
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    // Logout
    async logout() {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
            localStorage.removeItem('isAdmin');
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    }

    // Check if user is logged in as admin
    isLoggedIn() {
        return localStorage.getItem('isAdmin') === 'true';
    }

    // Get current session
    async getCurrentSession() {
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            return session;
        } catch (error) {
            console.error('Session error:', error);
            return null;
        }
    }
}

// Location Manager Class
class LocationManager {
    constructor() {
        this.bucketName = 'locations';
        this.tableName = 'locations';
    }

    async uploadLocation(file, title, address, description = '') {
        try {
            // Upload image to Supabase Storage
            const fileName = `location_${Date.now()}_${file.name}`;
            const { data: uploadData, error: uploadError } = await supabaseClient.storage
                .from(this.bucketName)
                .upload(fileName, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: urlData } = supabaseClient.storage
                .from(this.bucketName)
                .getPublicUrl(fileName);

            // Save location data to database
            const { data, error } = await supabaseClient
                .from(this.tableName)
                .insert([
                    {
                        title: title,
                        address: address,
                        description: description,
                        image_url: urlData.publicUrl
                    }
                ]);

            if (error) {
                throw error;
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error uploading location:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllLocations() {
        try {
            const { data, error } = await supabaseClient
                .from(this.tableName)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error fetching locations:', error);
            return [];
        }
    }

    async deleteLocation(locationId) {
        try {
            const { error } = await supabaseClient
                .from(this.tableName)
                .delete()
                .eq('id', locationId);

            if (error) {
                throw error;
            }

            return { success: true };
        } catch (error) {
            console.error('Error deleting location:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize instances
const galleryManager = new GalleryManager();
const locationManager = new LocationManager();
const adminAuth = new AdminAuth();

// Export for use in other files
window.galleryManager = galleryManager;
window.locationManager = locationManager;
window.adminAuth = adminAuth;
window.supabase = supabaseClient;