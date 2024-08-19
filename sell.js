document.addEventListener("DOMContentLoaded", function () {

    // JavaScript to toggle between listing a new item and checking listed items
    document.getElementById('list-new-item').addEventListener('click', function () {
        document.getElementById('new-item-form').style.display = 'block';
        document.getElementById('listed-items').style.display = 'none';
    });

    document.getElementById('check-listed-items').addEventListener('click', function () {
        document.getElementById('new-item-form').style.display = 'none';
        document.getElementById('listed-items').style.display = 'block';
    });

    // Form submission
    const sellForm = document.getElementById("sell-form");

    sellForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get form data
        const itemTitle = document.getElementById("item-title").value.trim();
        const itemPrice = document.getElementById("item-price").value.trim();
        const itemDescription = document.getElementById("item-description").value.trim();
        const itemCity = document.getElementById("item-city").value.trim();
        const itemImages = document.getElementById("item-images").files;

        // Validate: Ensure at least one image is attached
        if (itemImages.length === 0) {
            alert("Please attach at least one image.");
            return;
        }

        // Get only the first five images if more than five are attached
        let imageFiles = Array.from(itemImages);
        if (imageFiles.length > 5) {
            imageFiles = imageFiles.slice(0, 5);
        }

        // Prepare data to send to the bot
        const formData = {
            title: itemTitle,
            price: itemPrice,
            description: itemDescription,
            city: itemCity
            //images: imageFiles // Contains up to 5 images
        };

        // Log data to the console for debugging
        console.log(formData);

        // Send the form data to the bot using tg.sendData
        tg.sendData(JSON.stringify(formData));

        // Show a success message or reset the form if needed
        alert("Item successfully listed!");
        sellForm.reset();
    });

    // Remove focus from the input to hide the keyboard
    sellForm.addEventListener('click', function(event) {
        // Check if the clicked element is not an input field or textarea
        if (!event.target.closest('input') && !event.target.closest('textarea')) {
            // Find all input and textarea elements
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.blur(); // Remove focus from the input to hide the keyboard
            });
        }
    });
});
