"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const port = 3000; // Choose a port number for your Express server
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const dbName = 'trip_atlas_geo';
const collectionName = 'county_weather_by_month';
const client = new mongodb_1.MongoClient(url);
let collection;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const db = client.db(dbName);
            collection = db.collection(collectionName);
            console.log('Connected to the database');
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            process.exit(1); // Exit the process if unable to connect to the database
        }
    });
}
// Connect to the database
connectToDatabase();
// Define an Express route to access the collection
app.get('/county-weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documents = yield collection.find({}).toArray();
        res.json(documents);
    }
    catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).send('Error fetching documents');
    }
}));
// Start the Express server
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
