import express from 'express';
import cors from 'cors';
import { Product } from './entities/product.entity';
import { ProductRouter } from './routes/product.routes';
import { dataSource } from './datasource';
import { Channel, Connection } from 'amqplib';

const app = express();
const port = process.env.PORT!;
const clientBaseUrl = process.env.REACT_BASE_URL!;

export const startServer = async (connection: Connection, channel: Channel) => {
  try {
    app.use(
      cors({
        origin: [clientBaseUrl],
      })
    );
    app.use(express.json());

    const productsRepository = dataSource.getRepository(Product);
    const productRoutes = ProductRouter(productsRepository, channel);
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
