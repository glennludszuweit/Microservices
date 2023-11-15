import 'dotenv/config';
import { connect } from './rabbit';

(async () => {
  await connect();
})();
