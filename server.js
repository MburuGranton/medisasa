const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

// Replace 'YOUR_CLIENT_ID' with your actual client ID from the Google API Console
const CLIENT_ID = 'YOUR_CLIENT_ID';

// Middleware to parse incoming request data
app.use(bodyParser.json());

// Route to handle user registration
app.post('/register', async(req, res) => {
    try {
        const { idToken, email } = req.body;

        // Verify the ID token using the Google Auth Library
        const client = new OAuth2Client(CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();

        // Here, you can perform additional validation or user registration logic if needed
        // For simplicity, we'll just log the email on the server side
        console.log(`New user registered with email: ${email}`);

        // Return a success response
        res.sendStatus(200);
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.sendStatus(500);
    }
});

// Serve the dashboard HTML page
app.get('/dashboard.html', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

// Configure the port
const port = process.env.PORT || 3000; // Use the specified port or default to 3000

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});