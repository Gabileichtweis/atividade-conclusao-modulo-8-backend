import cors from 'cors';
import express, { Request, Response } from 'express';

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/', (req: Request, res: Response) =>
    res.status(200).json({ pk: true, message: 'API notes' })
  );

  //ROUTES

  return app;
};
