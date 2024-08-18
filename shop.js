document.addEventListener("DOMContentLoaded", function () {
    // Replace with your actual API URL
    fetch('https://gebeya-f802e981fddb.herokuapp.com/get_items')
        .then(response => response.json())
        .then(items => {
            console.log(items);  // Log the items to check the structure
            const itemsList = document.querySelector('.items-list');

            // Clear existing items in case this is a refresh
            itemsList.innerHTML = '';

            // Loop through each item and add to the DOM
            items.forEach(item => {
                const itemBox = document.createElement('div');
                itemBox.classList.add('item-box');

                // Set the data-id attribute with the item's unique identifier
                itemBox.setAttribute('data-id', item.id); // Assuming `item.id` is the unique ID of the item

                // Split the item pictures and create an array of image URLs
                const images = item.item_pic.split(',');

                // Inner HTML for the item box
                itemBox.innerHTML = `
        <img src="${images[0]}" alt="${item.item_name}">
        <div class="item-details">
            <div class="price-and-icon">
                <p class="item-price"><strong>${item.item_price}</strong></p>
                <i class="fas fa-heart like-icon"></i>
            </div>
            <p class="item-title">${item.item_name}</p>
            <p class="item-description">${item.item_description}</p>
        </div>
    `;

                // Add a click event listener to the item box
                itemBox.addEventListener('click', function () {
                    const itemId = this.getAttribute('data-id'); // Get the item ID from the data-id attribute
                    console.log('Item ID:', itemId); // Debugging line to check itemId
                    if (itemId) {
                        window.location.href = `item-details.html?id=${itemId}`; // Redirect to the details page with the item ID
                    } else {
                        console.error('Item ID is undefined');
                    }
                });

                // Append the item box to the list
                itemsList.appendChild(itemBox);
            });


        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });


    // document.querySelectorAll('.item-box').forEach(itemBox => {
    //     itemBox.addEventListener('click', function () {
    //         const itemId = this.dataset.id; // Assuming you store the item ID in a data-id attribute
    //         window.location.href = `item-details.html?id=${itemId}`;
    //     });
    // });
});
