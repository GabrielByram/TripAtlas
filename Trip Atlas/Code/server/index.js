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
const county_weather_1 = require("./schema/county-weather");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json()); // middleware to parse request bodies as JSON
const mongoose = require('mongoose');
const dbName = 'trip_atlas_geo';
const url = `mongodb://127.0.0.1:27017/${dbName}`;
const countyWeather = mongoose.model("CountyWeather", county_weather_1.CountyWeatherSchema);
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the Express application to MongoDB
            yield mongoose.connect(url, { useNewUrlParser: true });
            console.log('Connected to the database');
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            process.exit(1); // Exit the process if unable to connect to the database
        }
    });
}
// Define an Express route to access the collection
app.get('/county-weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documents = yield countyWeather.find({});
        res.json(documents);
    }
    catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).send('Error fetching documents');
    }
}));
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
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Connect to the database
connectToDatabase();
// Start the Express server
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
