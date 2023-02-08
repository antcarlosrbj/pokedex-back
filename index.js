import express from 'express';
import cors from 'cors';

import authRouter from './routers/authRouter.js';
import teamsRouter from './routers/teamsRouter.js';
import pokemonRouter from './routers/pokemonRouter.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use(authRouter);
app.use(teamsRouter);
app.use(pokemonRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});