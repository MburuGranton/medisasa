console.log("Js");

// Create a callback function for successful Twitter sign-in
function handleTwitterSignIn() {
    // Perform any necessary actions upon successful sign-in
    // For example, you can send user data to the server or redirect to a dashboard page
    // You can access the user data through the Twitter API
    // See the Twitter API documentation for more information
    console.log('Twitter sign-in successful!');
}

// Add event listener to the Twitter sign-in button
document.getElementById('twitterSignInButton').addEventListener('click', function() {
    // Open the Twitter sign-in window
    twttr.widgets.createSession().then(function(session) {
        if (session) {
            handleTwitterSignIn();
        }
    });
});



function handleSignInClick() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_CLIENT_ID'
        }).then(function() {
            gapi.auth2.getAuthInstance().signIn().then(function(googleUser) {
                var profile = googleUser.getBasicProfile();
                var idToken = googleUser.getAuthResponse().id_token;
                var email = profile.getEmail();

                // Send the user data to the server using AJAX POST request
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/register');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        // On successful registration, redirect the user to the dashboard page
                        window.location.href = '/dashboard.html';
                    } else {
                        console.error('Error registering user.');
                    }
                };
                xhr.send(JSON.stringify({ idToken: idToken, email: email }));
            });
        });
    });
}

// Add event listener to the button
// document.getElementById('signInButton').addEventListener('click', handleSignInClick);










function validateForm() {
    // Get form fields
    var firstNameInput = document.getElementById("firstName");
    var lastNameInput = document.getElementById("lastName");
    var phoneNumberInput = document.getElementById("phoneNumber");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    // Validate each field
    if (!firstNameInput.checkValidity()) {
        alert("Please enter your first name.");
        return false;
    }

    if (!lastNameInput.checkValidity()) {
        alert("Please enter your last name.");
        return false;
    }

    if (!phoneNumberInput.checkValidity()) {
        alert("Please enter a valid phone number.");
        return false;
    }

    if (!emailInput.checkValidity()) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!passwordInput.checkValidity()) {
        alert("Please enter a password.");
        return false;
    }

    // All fields are valid, allow form submission
    return true;
}








// Assuming you have a function to handle the form submission
function submitForm() {
    // Get the form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Make a POST request to the server
    fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Success response
                console.log('Form submitted successfully');
                // Perform any additional actions, such as showing success message or redirecting
            } else if (response.status === 400) {
                // Bad Request response
                response.json().then(data => {
                    console.error('Form submission error:', data.error);
                    // Display the error message to the user or perform any other error handling
                });
            } else {
                // Other error response
                console.error('Form submission error');
                // Perform appropriate error handling
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            // Perform appropriate error handling
        });
}






// document.getElementById("registrationForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the form from submitting traditionally

//     // Collect form data
//     var formData = new FormData(this);

//     // Send the form data to the server using Fetch API
//     fetch("https://your-api-endpoint.com/register", {
//             method: "POST",
//             body: formData
//         })
//         .then(response => {
//             if (response.ok) {
//                 // Successful response, handle accordingly
//                 console.log("Form submitted successfully");
//                 // Perform any additional actions, such as displaying success messages, redirecting, etc.
//             } else if (response.status === 400) {
//                 // Bad Request response, handle validation errors
//                 response.json().then(data => {
//                     console.error("Form submission error:", data.error);
//                     // Display the error message to the user
//                     // For example, update a specific element in the HTML with the error message
//                     var errorElement = document.getElementById("errorMessage");
//                     errorElement.textContent = data.error;
//                 });
//             } else {
//                 // Other error responses, handle accordingly
//                 console.error("Error submitting form");
//                 // Perform any additional error handling, such as displaying error messages, etc.
//             }
//         })
//         .catch(error => {
//             console.error("Error submitting form", error);
//             // Perform error handling, such as displaying error messages, etc.
//         });
// });