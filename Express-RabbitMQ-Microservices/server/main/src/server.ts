import 'dotenv/config';
import { connect } from './rabbit';
import { startServer } from './app';

(async () => {
  await connect();
  startServer();
})();
