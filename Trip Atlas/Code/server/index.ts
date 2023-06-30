import express from 'express';
import { Request, Response } from 'express';
import countyWeatherSchema from "./schema/county-weather"

const app = express();
const port = 3000;

const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json()); // Middleware to parse request bodies as JSON
app.use(cors()); // Enable CORS for all routes

const dbName = 'trip_atlas_geo';
const url = `mongodb://127.0.0.1:27017/${dbName}`;
const countyWeatherModel = mongoose.model('CountyWeather', countyWeatherSchema, 'county_weather_by_month');

// Connect the Express application to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
}

// Define an Express route to access the collection
app.get('/county-weather', async (req: Request, res: Response) => {
  try {
    const documents = await countyWeatherModel.find({});
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Error fetching documents');
  }
});

app.post('/api/checkEmail', (req, res) => {
  const { email } = req.body;
  // Perform email validation and check if it exists in the database
  // Set isNewUser based on whether the email is found in the database
  const isNewUser = true; // For demonstration purposes, set isNewUser to true

  res.json({ isNewUser });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Perform login with the email and password
  // Handle the login logic, such as verifying credentials, generating tokens, etc.
  // Return an appropriate response based on the login result

  res.json({ success: true }); // For demonstration purposes, return a success response
});

app.post('/api/createAccount', (req, res) => {
  const { email, password } = req.body;
  // Perform account creation with the email and password
  // Handle the account creation logic, such as storing the user in the database, sending confirmation emails, etc.
  // Return an appropriate response based on the account creation result

  res.json({ success: true }); // For demonstration purposes, return a success response
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Connect to the database
connectToDatabase();

// Start the Express server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});