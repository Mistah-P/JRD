// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .gallery-item, .pricing-card, .contact-item, .contact-form');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        submitBtn.innerHTML = '✓ Message Sent!';
        submitBtn.style.background = '#27ae60';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
});

// Add hover effects to pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when hero stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                stat.textContent = '0' + (text.includes('+') ? '+' : '');
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroIcon = document.querySelector('.fire-extinguisher-icon');
    
    if (hero && heroIcon) {
        const rate = scrolled * -0.5;
        heroIcon.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
    
    // Initialize gallery carousel
    initializeGalleryCarousel();
    
    // Load locations
    loadLocations();
});

// Gallery Carousel Functionality
function initializeGalleryCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselTrack = document.getElementById('carouselTrack');
    
    // Load images from Supabase if available
    loadGalleryImages();
    
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        // Move carousel track
        const translateX = -index * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Load gallery images from Supabase
async function loadGalleryImages() {
    try {
        // Check if galleryManager is available (Supabase is configured)
        if (typeof galleryManager !== 'undefined') {
            const images = await galleryManager.getAllImages();
            
            if (images && images.length > 0) {
                updateCarouselWithImages(images);
            }
        }
    } catch (error) {
        console.log('Gallery images not loaded from Supabase:', error.message);
        // Continue with placeholder images
    }
}

// Update carousel with real images from Supabase
function updateCarouselWithImages(images) {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselIndicators = document.getElementById('carouselIndicators');
    
    if (!carouselTrack || !carouselIndicators) return;
    
    // Clear existing slides and indicators
    carouselTrack.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    // Create slides from Supabase images
    images.forEach((image, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <div class="slide-image">
                <img src="${image.image_url}" alt="${image.title}" loading="lazy">
            </div>
            <div class="slide-content">
                <h3>${image.title}</h3>
                <p>${image.location}</p>
                ${image.description ? `<p style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.8;">${image.description}</p>` : ''}
            </div>
        `;
        carouselTrack.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('button');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.setAttribute('data-slide', index);
        carouselIndicators.appendChild(indicator);
    });
    
    // Re-initialize carousel with new slides
    setTimeout(() => {
        initializeGalleryCarousel();
     }, 100);
 }

// Load locations from Supabase
async function loadLocations() {
    try {
        // Check if locationManager is available (Supabase is configured)
        if (typeof locationManager !== 'undefined') {
            const locations = await locationManager.getAllLocations();
            
            if (locations && locations.length > 0) {
                updateLocationGrid(locations);
            }
        }
    } catch (error) {
        console.log('Locations not loaded from Supabase:', error.message);
        // Continue with placeholder locations
    }
}

// Update location grid with real data from Supabase
function updateLocationGrid(locations) {
    const locationGrid = document.getElementById('locationGrid');
    
    if (!locationGrid) return;
    
    // Clear existing locations
    locationGrid.innerHTML = '';
    
    // Create location cards from Supabase data
    locations.forEach((location) => {
        const locationCard = document.createElement('div');
        locationCard.className = 'location-card';
        locationCard.innerHTML = `
            <div class="location-image">
                <img src="${location.image_url}" alt="${location.title}" loading="lazy">
            </div>
            <div class="location-info">
                <h3>${location.title}</h3>
                <p>${location.address}</p>
                ${location.description ? `<p class="location-description">${location.description}</p>` : ''}
            </div>
        `;
        locationGrid.appendChild(locationCard);
     });
 }

// Contact Popup Functions
function openContactPopup() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeContactPopup() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close popup when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactPopup();
    }
});
// ===
== ADMIN FUNCTIONALITY =====

// Admin Dashboard Functions
function showAdminDashboard() {
    document.getElementById('main-website').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    document.body.style.overflow = 'auto';
    
    // Update URL hash
    window.location.hash = 'admin';
    
    // Initialize admin functionality
    initializeAdmin();
}

function showMainSite() {
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('main-website').style.display = 'block';
    document.body.style.overflow = 'auto';
    
    // Update URL hash
    window.location.hash = '';
}

// Hash-based routing
function handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove the '#'
    
    if (hash === 'admin') {
        showAdminDashboard();
    } else {
        showMainSite();
    }
}

// Listen for hash changes
window.addEventListener('hashchange', handleHashChange);

// Check hash on page load
document.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
});

// Admin Section Management
function showSection(sectionName) {
    // Hide all sections
    document.getElementById('gallery-section').style.display = 'none';
    document.getElementById('location-section').style.display = 'none';
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show selected section and activate tab
    if (sectionName === 'gallery') {
        document.getElementById('gallery-section').style.display = 'block';
        document.querySelector('[onclick="showSection(\'gallery\')"]').classList.add('active');
    } else if (sectionName === 'location') {
        document.getElementById('location-section').style.display = 'block';
        document.querySelector('[onclick="showSection(\'location\')"]').classList.add('active');
    }
}

// Initialize Admin Dashboard
function initializeAdmin() {
    // Initialize Supabase if not already done
    if (typeof supabaseClient === 'undefined') {
        initializeSupabase();
    }
    
    // Load existing gallery images
    loadAdminGalleryImages();
    
    // Setup form handlers
    setupAdminFormHandlers();
    
    // Setup file upload handlers
    setupFileUploadHandlers();
}

// Supabase Configuration
let supabaseClient;
let galleryManager;
let locationManager;

function initializeSupabase() {
    // Replace with your actual Supabase URL and anon key
    // Example: const SUPABASE_URL = 'https://your-project.supabase.co';
    // Example: const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
    const SUPABASE_URL = 'YOUR_SUPABASE_URL';
    const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
    
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Initialize managers
        galleryManager = new GalleryManager(supabaseClient);
        locationManager = new LocationManager(supabaseClient);
        
        console.log('Supabase initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        showMessage('Please configure Supabase credentials in script.js', 'error');
    }
}

// Gallery Manager Class
class GalleryManager {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
        this.tableName = 'gallery_images';
        this.bucketName = 'gallery';
    }
    
    async uploadImage(file, title, location, description) {
        try {
            // Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            
            const { data: uploadData, error: uploadError } = await this.supabase.storage
                .from(this.bucketName)
                .upload(fileName, file);
            
            if (uploadError) throw uploadError;
            
            // Get public URL
            const { data: urlData } = this.supabase.storage
                .from(this.bucketName)
                .getPublicUrl(fileName);
            
            // Save metadata to database
            const { data, error } = await this.supabase
                .from(this.tableName)
                .insert([
                    {
                        title,
                        location,
                        description,
                        image_url: urlData.publicUrl,
                        file_name: fileName,
                        created_at: new Date().toISOString()
                    }
                ])
                .select();
            
            if (error) throw error;
            
            return data[0];
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
    
    async getAllImages() {
        try {
            const { data, error } = await this.supabase
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
    
    async deleteImage(id, fileName) {
        try {
            // Delete from storage
            const { error: storageError } = await this.supabase.storage
                .from(this.bucketName)
                .remove([fileName]);
            
            if (storageError) throw storageError;
            
            // Delete from database
            const { error: dbError } = await this.supabase
                .from(this.tableName)
                .delete()
                .eq('id', id);
            
            if (dbError) throw dbError;
            
            return true;
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    }
}

// Location Manager Class
class LocationManager {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
        this.tableName = 'locations';
        this.bucketName = 'locations';
    }
    
    async uploadLocation(file, title, address, description) {
        try {
            // Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `location-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            
            const { data: uploadData, error: uploadError } = await this.supabase.storage
                .from(this.bucketName)
                .upload(fileName, file);
            
            if (uploadError) throw uploadError;
            
            // Get public URL
            const { data: urlData } = this.supabase.storage
                .from(this.bucketName)
                .getPublicUrl(fileName);
            
            // Save metadata to database
            const { data, error } = await this.supabase
                .from(this.tableName)
                .insert([
                    {
                        title,
                        address,
                        description,
                        image_url: urlData.publicUrl,
                        file_name: fileName,
                        created_at: new Date().toISOString()
                    }
                ])
                .select();
            
            if (error) throw error;
            
            return data[0];
        } catch (error) {
            console.error('Error uploading location:', error);
            throw error;
        }
    }
    
    async getAllLocations() {
        try {
            const { data, error } = await this.supabase
                .from(this.tableName)
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            
            return data;
        } catch (error) {
            console.error('Error fetching locations:', error);
            throw error;
        }
    }
}

// Admin Form Handlers
function setupAdminFormHandlers() {
    // Gallery upload form
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleGalleryUpload);
    }
    
    // Location upload form
    const locationForm = document.getElementById('locationUploadForm');
    if (locationForm) {
        locationForm.addEventListener('submit', handleLocationUpload);
    }
}

// File Upload Handlers
function setupFileUploadHandlers() {
    const fileInput = document.getElementById('imageFile');
    const fileLabel = document.getElementById('fileUploadLabel');
    
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileLabel.innerHTML = `
                    <div>
                        <i class="fas fa-check-circle" style="font-size: 2rem; color: #27ae60; margin-bottom: 1rem;"></i>
                        <p><strong>File selected:</strong> ${file.name}</p>
                        <p style="color: #666; font-size: 0.9rem;">Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                `;
            }
        });
        
        // Drag and drop functionality
        fileLabel.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileLabel.style.borderColor = '#e74c3c';
            fileLabel.style.backgroundColor = '#fff5f5';
        });
        
        fileLabel.addEventListener('dragleave', (e) => {
            e.preventDefault();
            fileLabel.style.borderColor = '#ddd';
            fileLabel.style.backgroundColor = '#f9f9f9';
        });
        
        fileLabel.addEventListener('drop', (e) => {
            e.preventDefault();
            fileLabel.style.borderColor = '#ddd';
            fileLabel.style.backgroundColor = '#f9f9f9';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                fileInput.dispatchEvent(new Event('change'));
            }
        });
    }
}

// Handle Gallery Upload
async function handleGalleryUpload(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const uploadBtn = document.getElementById('uploadBtn');
    
    // Get form values
    const title = formData.get('title');
    const location = formData.get('location');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    
    if (!imageFile || !title || !location) {
        showMessage('Please fill in all required fields and select an image.', 'error');
        return;
    }
    
    // Show loading state
    const originalText = uploadBtn.innerHTML;
    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    uploadBtn.disabled = true;
    
    try {
        // Upload to Supabase
        await galleryManager.uploadImage(imageFile, title, location, description);
        
        showMessage('Image uploaded successfully!', 'success');
        
        // Reset form
        form.reset();
        document.getElementById('fileUploadLabel').innerHTML = `
            <div>
                <i class="fas fa-cloud-upload-alt" style="font-size: 2rem; color: #e74c3c; margin-bottom: 1rem;"></i>
                <p><strong>Click to upload</strong> or drag and drop</p>
                <p style="color: #666; font-size: 0.9rem;">PNG, JPG, GIF up to 10MB</p>
            </div>
        `;
        
        // Reload gallery images
        loadAdminGalleryImages();
        
        // Update main site gallery
        loadGalleryImages();
        
    } catch (error) {
        showMessage('Error uploading image: ' + error.message, 'error');
    } finally {
        // Reset button
        uploadBtn.innerHTML = originalText;
        uploadBtn.disabled = false;
    }
}

// Handle Location Upload
async function handleLocationUpload(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const title = document.getElementById('locationTitle').value;
    const address = document.getElementById('locationAddress').value;
    const description = document.getElementById('locationDescription').value;
    const imageFile = document.getElementById('locationImage').files[0];
    
    if (!imageFile || !title || !address) {
        showMessage('Please fill in all required fields and select an image.', 'error');
        return;
    }
    
    try {
        await locationManager.uploadLocation(imageFile, title, address, description);
        
        showMessage('Location uploaded successfully!', 'success');
        form.reset();
        
        // Update main site locations
        loadLocations();
        
    } catch (error) {
        showMessage('Error uploading location: ' + error.message, 'error');
    }
}

// Load Admin Gallery Images
async function loadAdminGalleryImages() {
    try {
        if (!galleryManager) return;
        
        const images = await galleryManager.getAllImages();
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        
        images.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.className = 'admin-image-card';
            imageCard.innerHTML = `
                <div class="admin-image">
                    <img src="${image.image_url}" alt="${image.title}" loading="lazy">
                </div>
                <div class="admin-image-info">
                    <h4>${image.title}</h4>
                    <p>${image.location}</p>
                    ${image.description ? `<p style="font-size: 0.9rem; opacity: 0.8;">${image.description}</p>` : ''}
                    <button class="delete-btn" onclick="deleteGalleryImage(${image.id}, '${image.file_name}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            galleryGrid.appendChild(imageCard);
        });
        
    } catch (error) {
        console.error('Error loading admin gallery images:', error);
    }
}

// Delete Gallery Image
async function deleteGalleryImage(id, fileName) {
    if (!confirm('Are you sure you want to delete this image?')) {
        return;
    }
    
    try {
        await galleryManager.deleteImage(id, fileName);
        showMessage('Image deleted successfully!', 'success');
        
        // Reload gallery
        loadAdminGalleryImages();
        loadGalleryImages();
        
    } catch (error) {
        showMessage('Error deleting image: ' + error.message, 'error');
    }
}

// Show Message Function
function showMessage(message, type = 'info') {
    const messageBox = document.getElementById('messageBox');
    if (!messageBox) return;
    
    messageBox.className = `message ${type}`;
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we should show admin on load
    if (window.location.hash === '#admin') {
        showAdminDashboard();
    }
});