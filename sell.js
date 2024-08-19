document.addEventListener("DOMContentLoaded", function () {
    let tg = window.Telegram.WebApp;
    const sell_cont = document.getElementById('sell_cont')

    document.getElementById('list-new-item').addEventListener('click', function () {
        document.getElementById('new-item-form').style.display = 'block';
        document.getElementById('listed-items').style.display = 'none';
    });

    document.getElementById('check-listed-items').addEventListener('click', function () {
        document.getElementById('new-item-form').style.display = 'none';
        document.getElementById('listed-items').style.display = 'block';
    });

    const sellForm = document.getElementById("sell-form");

    sellForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(sellForm);

        // Validate that at least one image is selected
        const itemImages = document.getElementById("item-images").files;
        if (itemImages.length === 0) {
            alert("Please attach at least one image.");
            return;
        }

        // Get only the first five images if more than five are attached
        let imageFiles = Array.from(itemImages);
        if (imageFiles.length > 5) {
            imageFiles = imageFiles.slice(0, 5);
        }

        // Append images to FormData
        imageFiles.forEach(file => formData.append('images', file));

        // retrieve the chat id and append
        const chatId = localStorage.getItem('chatId');
        if (chatId) {
            formData.append('chat_id', chatId);
        }

        // Send data to backend
        fetch('https://gebeya-f802e981fddb.herokuapp.com/list_item', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert(data.chat_id);
                alert(data.price);
                alert(data.description);
                alert(data.title);
                sellForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to list the item. Please try again.');
        });
    });

    // Remove focus from the input to hide the keyboard
    sell_cont.addEventListener('click', function(event) {
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
