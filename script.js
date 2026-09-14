// Get all gallery images
const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

// Create lightbox elements
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");

lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>

    <button class="lightbox-prev">&#10094;</button>

    <img class="lightbox-image" src="" alt="Gallery image">

    <button class="lightbox-next">&#10095;</button>
`;

document.body.appendChild(lightbox);


// Get lightbox elements
const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeButton = lightbox.querySelector(".lightbox-close");
const previousButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");


// Store visible images
let visibleImages = [];
let currentIndex = 0;


// Update the list of visible images
function updateVisibleImages() {
    visibleImages = Array.from(
        document.querySelectorAll(".gallery-item:not([style*='display: none']) img")
    );
}


// Open lightbox
function openLightbox(index) {
    updateVisibleImages();

    if (visibleImages.length === 0) {
        return;
    }

    currentIndex = index;

    lightboxImage.src = visibleImages[currentIndex].src;
    lightboxImage.alt = visibleImages[currentIndex].alt;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";
}


// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");

    document.body.style.overflow = "";
}


// Show next image
function showNextImage() {
    if (visibleImages.length === 0) {
        return;
    }

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    lightboxImage.src = visibleImages[currentIndex].src;
    lightboxImage.alt = visibleImages[currentIndex].alt;
}


// Show previous image
function showPreviousImage() {
    if (visibleImages.length === 0) {
        return;
    }

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    lightboxImage.src = visibleImages[currentIndex].src;
    lightboxImage.alt = visibleImages[currentIndex].alt;
}



galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        updateVisibleImages();

        const clickedImage = item.querySelector("img");

        currentIndex = visibleImages.indexOf(clickedImage);

        openLightbox(currentIndex);
    });

});


// Close button
closeButton.addEventListener("click", closeLightbox);


// Next button
nextButton.addEventListener("click", showNextImage);


// Previous button
previousButton.addEventListener("click", showPreviousImage);


// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Category filtering
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.category;

        // Change active button
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Show or hide gallery items
        galleryItems.forEach((item) => {

            const itemCategory = item.dataset.category;

            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

        updateVisibleImages();
    });

});


// Keyboard controls
document.addEventListener("keydown", (event) => {

    // Escape → close lightbox
    if (event.key === "Escape") {
        closeLightbox();
    }

    // Right arrow → next image
    if (event.key === "ArrowRight") {

        if (lightbox.classList.contains("show")) {
            showNextImage();
        }

    }

    // Left arrow → previous image
    if (event.key === "ArrowLeft") {

        if (lightbox.classList.contains("show")) {
            showPreviousImage();
        }

    }

});