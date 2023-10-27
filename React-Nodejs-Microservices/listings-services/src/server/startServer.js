import cors from 'cors';
import express from 'express';
import accessEnv from '#root/helpers/accessEnv';
import setUpRoutes from '#root/server/routes';

const PORT = accessEnv('PORT', 7100);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

setUpRoutes(app);

app.listen(PORT, '0.0.0.0', () => {
  console.info(`Listings services running on ${PORT}`);
});
