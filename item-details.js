document.addEventListener("DOMContentLoaded", function () {
    // Extract the item ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    console.log(itemId); // Ensure this logs the correct itemId

    // Fetch item details from the server
    fetch(`https://gebeya-f802e981fddb.herokuapp.com/get_item_details?id=${itemId}`)
        .then(response => response.json())
        .then(itemDetails => {
            // Log item details to the console for debugging
            console.log(itemDetails);

            // Check if itemDetails has the required fields
            if (!itemDetails || itemDetails.error) {
                console.error('Item details not found');
                return;
            }

            // Split the item pictures and create an array of image URLs
            const images = itemDetails.item_pic.split(',');

            // Load the initial main image
            const mainImage = document.getElementById("main-image");
            mainImage.src = images[0];

            // Create thumbnail images
            const thumbnailsContainer = document.querySelector('.thumbnails');
            images.forEach((imageSrc, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = imageSrc;
                thumbnail.addEventListener('click', () => {
                    mainImage.src = imageSrc;
                });
                thumbnailsContainer.appendChild(thumbnail);
            });

            // Add event listeners to arrows for navigating through images
            let currentImageIndex = 0;

            function updateMainImage(index) {
                if (index >= 0 && index < images.length) {
                    currentImageIndex = index;
                    mainImage.src = images[currentImageIndex];
                }
            }

            document.getElementById("prev-arrow").addEventListener('click', () => {
                updateMainImage(currentImageIndex - 1);
            });

            document.getElementById("next-arrow").addEventListener('click', () => {
                updateMainImage(currentImageIndex + 1);
            });

            // Swipe functionality
            let startX;

            function handleSwipeLeft() {
                updateMainImage(currentImageIndex + 1);
            }

            function handleSwipeRight() {
                updateMainImage(currentImageIndex - 1);
            }

            mainImage.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
            });

            mainImage.addEventListener('touchend', (event) => {
                const endX = event.changedTouches[0].clientX;
                const diffX = startX - endX;

                if (Math.abs(diffX) > 30) { // Threshold for swipe detection
                    if (diffX > 0) {
                        handleSwipeLeft();
                    } else {
                        handleSwipeRight();
                    }
                }
            });

            // Open modal when main image is clicked
            mainImage.addEventListener('click', () => {
                const modal = document.getElementById("image-modal");
                const modalImage = document.getElementById("modal-image");
                modal.style.display = "block";
                modalImage.src = mainImage.src;
            });

            // Close modal when the close button is clicked
            const closeModal = document.querySelector(".modal .close");
            closeModal.addEventListener('click', () => {
                const modal = document.getElementById("image-modal");
                modal.style.display = "none";
            });

            // Close modal when clicking outside of the modal content
            window.addEventListener('click', (event) => {
                const modal = document.getElementById("image-modal");
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });

            // Populate the rest of the item details
            document.getElementById("item-price").textContent = itemDetails.item_price;
            document.getElementById("item-title").textContent = itemDetails.item_name;
            document.getElementById("item-description").textContent = itemDetails.item_description;
            document.getElementById("date").textContent = itemDetails.date;

            // Handle Send Message button click
            document.getElementById("send-message").addEventListener('click', () => {
                alert('Message sent to the seller!');
            });
        })
        .catch(error => {
            console.error('Error fetching item details:', error);
        });
});
