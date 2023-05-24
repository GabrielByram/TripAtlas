import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Define routes and middleware here

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});