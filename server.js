const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist')));

// Endpoint to serve the runtime configuration
app.get('/config', (req, res) => {
  res.json({
    backendUrl: process.env.BACKEND_URL || 'http://localhost:8000'
  });
});

// Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
