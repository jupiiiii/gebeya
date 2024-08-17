document.addEventListener("DOMContentLoaded", function () {
    // Replace with your actual API URL
    fetch('http://127.0.0.1:5000/get_items')
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

                itemBox.innerHTML = `
                    <img src="${item.item_pic}" alt="${item.item_name}">
                    <div class="item-details">
                        <div class="price-and-icon">
                            <p class="item-price"><strong>${item.item_price}</strong></p>
                            <i class="fas fa-heart like-icon"></i>
                        </div>
                        <p class="item-title">${item.item_name}</p>
                        <p class="item-description">${item.item_description}</p>
                    </div>
                `;

                // Append the item box to the list
                itemsList.appendChild(itemBox);
            });
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
});
