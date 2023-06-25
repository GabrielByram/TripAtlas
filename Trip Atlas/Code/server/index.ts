import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json()); // Add this middleware to parse request bodies as JSON

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});