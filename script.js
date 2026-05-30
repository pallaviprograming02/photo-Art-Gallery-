// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                // Reset animation
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'fadeIn 0.6s ease';
                }, 10);
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentIndex = 0;
let visibleImages = [];

// Function to update visible images
function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
}

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateVisibleImages();
        currentIndex = visibleImages.indexOf(item);
        showLightbox(currentIndex);
    });
});

function showLightbox(index) {
    const item = visibleImages[index];
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay h3');

    lightboxImg.src = img.src;
    lightboxCaption.textContent = overlay ? overlay.textContent : '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Previous image
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    showLightbox(currentIndex);
});

// Next image
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % visibleImages.length;
    showLightbox(currentIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
            showLightbox(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % visibleImages.length;
            showLightbox(currentIndex);
        }
    }
});

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

// Initialize visible images on page load
updateVisibleImages();
