document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Telegram WebApp instance
    let tg = window.Telegram.WebApp;

    // Handle form submission
    const signupForm = document.getElementById("signup_form");
    const loginForm = document.getElementById("login_form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Create an object to hold the data
        const formData = {
            signup: 'signup',
            username: username,
            email: email,
            password: password
        };

        // Send the data to Telegram
        tg.sendData(JSON.stringify(formData));

        // Optionally, you can close the WebApp after sending the data
        tg.close();
    });

    // Collect form data
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check if either username or email is provided along with password
    if ((!username && !email) || !password) {
        alert("Please enter either a username or an email along with the password.");
        return; // Stop further execution if validation fails
    }

    // Prepare formData object
    const formData = {
        login: 'login',
        username: username || null, // Set to null if not provided
        email: email || null,       // Set to null if not provided
        password: password
    };

    // Send the data to Telegram
    tg.sendData(JSON.stringify(formData));

    // Optionally, close the WebApp after sending the data
    tg.close();
});
