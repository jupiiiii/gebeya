document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Telegram WebApp instance
    let tg = window.Telegram.WebApp;

    // Handle form submission
    const signupForm = document.getElementById("signup_form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Create an object to hold the data
        const formData = {
            username: username,
            email: email,
            password: password
        };

        // Send the data to Telegram
        tg.sendData(JSON.stringify(formData));

        // Optionally, you can close the WebApp after sending the data
        tg.close();
    });
});
