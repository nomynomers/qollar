const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
// This includes the pre-compiled Figma files (_components, _json, _runtimes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Specific custom route for /public/:id
// This will intercept requests exactly to /public/[anything] 
// and serve the single HTML file you have created for the public pet view.
app.get('/public/:id', (req, res) => {
  // Ensure you drop your custom HTML file into the 'public' folder and name it 'pet.html'
  res.sendFile(path.join(__dirname, 'public', 'pet.html'));
});

// For any other routes that aren't matched above, 
// serve the 'index.html' from Figma (e.g. your /dashboard or other pages).
// The Figma Javascript inside index.html will handle internal routing based on the URL.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`- Place your custom public pet HTML inside 'public/pet.html'`);
});
