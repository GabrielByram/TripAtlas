"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json()); // Add this middleware to parse request bodies as JSON
app.post('/api/checkEmail', function (req, res) {
    var email = req.body.email;
    // Perform email validation and check if it exists in the database
    // Set isNewUser based on whether the email is found in the database
    var isNewUser = true; // For demonstration purposes, set isNewUser to true
    res.json({ isNewUser: isNewUser });
});
app.post('/api/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    // Perform login with the email and password
    // Handle the login logic, such as verifying credentials, generating tokens, etc.
    // Return an appropriate response based on the login result
    res.json({ success: true }); // For demonstration purposes, return a success response
});
app.post('/api/createAccount', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    // Perform account creation with the email and password
    // Handle the account creation logic, such as storing the user in the database, sending confirmation emails, etc.
    // Return an appropriate response based on the account creation result
    res.json({ success: true }); // For demonstration purposes, return a success response
});
app.get('/', function (req, res) {
    res.send('Hello, World!');
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
