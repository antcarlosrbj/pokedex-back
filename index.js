import express from 'express';
import cors from 'cors';

import authRouter from './routers/authRouter.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use(authRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});