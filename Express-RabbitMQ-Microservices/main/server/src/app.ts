import express from 'express';
import cors from 'cors';
import { dataSource } from './datasource';
import { Channel, Connection } from 'amqplib';
import { Product } from './entities/product.entity';
import { ProductHelper } from './helpers/product.helper';
import { ProductRouter } from './routes/product.routes';

const app = express();
const port = process.env.PORT!;
const clientBaseUrl = process.env.REACT_BASE_URL!;

export const startServer = async (connection: Connection, channel: Channel) => {
  const repository = dataSource.getMongoRepository(Product);
  const productHelper = new ProductHelper(repository, channel);
  const productRoutes = ProductRouter(repository);

  try {
    app.use(
      cors({
        origin: [clientBaseUrl],
      })
    );

    app.use(express.json());

    productHelper.productCreated();
    productHelper.productUpdated();
    productHelper.productDeleted();

    app.use('/api/products', productRoutes);

    app.listen(port, async () => {
      await dataSource.initialize();
      console.log(`App running on port: ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  } finally {
    process.on('beforeExit', () => {
      console.log('Closing connection');
      connection.close();
    });
  }
};
