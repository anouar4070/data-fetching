import fs from 'node:fs/promises'; // Import filesystem module for file operations with promises
import bodyParser from 'body-parser'; // Middleware to parse incoming request bodies in JSON format
import express from 'express'; // Import Express framework

const app = express(); // Initialize the Express app

app.use(express.static('images')); // Serve static files from the 'images' directory
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

// CORS (Cross-Origin Resource Sharing) configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT'); // Only allow GET and PUT methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow 'Content-Type' header in requests
  next(); // Move on to the next middleware
});

// Route to get a list of places
app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json'); // Read data from places.json file
  const placesData = JSON.parse(fileContent); // Parse the JSON content
  res.status(200).json({ places: placesData }); // Send a 200 response with the places data
});

// Route to get user-specific places
app.get('/user-places', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-places.json'); // Read data from user-places.json
  const places = JSON.parse(fileContent); // Parse the JSON content
  res.status(200).json({ places }); // Send a 200 response with user places
});

// Route to update user-specific places
app.put('/user-places', async (req, res) => {
  const places = req.body.places; // Get the updated places from the request body
  await fs.writeFile('./data/user-places.json', JSON.stringify(places)); // Write the updated data to user-places.json
  res.status(200).json({ message: 'User places updated!' }); // Send a success response
});

// Handle 404 - Not Found errors for undefined routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') { // If it's a preflight request, just pass it to the next middleware
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' }); // Send a 404 response if route is not found
});

// Start the server on port 3000
app.listen(3000);
