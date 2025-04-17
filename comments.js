// Create web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to receive comments
app.post('/comments', (req, res) => {
    const comment = req.body;

    // Validate comment structure
    if (!comment.name || !comment.text) {
        return res.status(400).send('Invalid comment structure');
    }

    // Save comment to a file
    fs.appendFile('comments.txt', JSON.stringify(comment) + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error saving comment');
        }
        res.status(200).send('Comment saved successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});