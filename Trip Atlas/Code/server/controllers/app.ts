import express, { Request, Response } from 'express';
import { MongoClient, Collection } from 'mongodb';

const app = express();
const port = 3000; // Choose a port number for your Express server

const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const dbName = 'trip_atlas_geo';
const collectionName = 'county_weather_by_month';

const client = new MongoClient(url);
let collection: Collection;

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection(collectionName);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
}

// Connect to the database
connectToDatabase();

// Define an Express route to access the collection
app.get('/county-weather', async (req: Request, res: Response) => {
  try {
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Error fetching documents');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
