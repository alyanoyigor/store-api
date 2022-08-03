import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import { Context } from './types';

const { PORT, MONGO_URI } = process.env;

const app = express();

declare global {
  namespace Express {
    interface Request {
      context?: Context;
    }
  }
}

app.use(express.urlencoded());
app.use(express.json());

app.use('/api', router);

app.use('*', (_req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

async function main() {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Press CTRL + C to stop');
    });
  } catch (error) {
    console.error(error);
  }
}

main();
