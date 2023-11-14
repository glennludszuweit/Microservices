import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';

const app = express();
const port = process.env.PORT!;
const clientBaseUrl = process.env.REACT_BASE_URL!;

const startServer = async () => {
  try {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: 'ambassador-admin',
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    });

    const productsRepository = dataSource.getRepository(Product);

    app.use(
      cors({
        origin: [clientBaseUrl],
      })
    );

    app.use(express.json());

    app.get('/api/products', async (req: Request, res: Response) => {
      const products = await productsRepository.find();
      res.json(products);
    });

    app.get('/api/products/:id', async (req: Request, res: Response) => {
      const product = await productsRepository.findOneBy({
        id: Number(req.params.id),
      });
      return res.json(product);
    });

    app.post('/api/products', async (req: Request, res: Response) => {
      const product = productsRepository.create(req.body);
      const result = await productsRepository.save(product);
      res.send(product);
    });

    app.put('/api/products/:id', async (req: Request, res: Response) => {
      const product = await productsRepository.findOneBy({
        id: Number(req.params.id),
      });
      productsRepository.merge(product, req.body);
      const result = await productsRepository.save(product);
      res.send(result);
    });

    app.delete('/api/products/:id', async (req: Request, res: Response) => {
      const result = await productsRepository.delete(
        parseInt(req.params.id, 10)
      );
      res.send(result);
    });

    app.post('/api/products/:id/like', async (req: Request, res: Response) => {
      const product = await productsRepository.findOneBy({
        id: Number(req.params.id),
      });
      product.likes++;
      const result = await productsRepository.save(product);
      res.send(result);
    });

    app.post(
      '/api/products/:id/unlike',
      async (req: Request, res: Response) => {
        const product = await productsRepository.findOneBy({
          id: Number(req.params.id),
        });
        if (product.likes > 0) {
          product.likes--;
          const result = await productsRepository.save(product);
          res.send(result);
        } else {
          res.send({ message: 'There are no likes.' });
        }
      }
    );

    app.listen(port, async () => {
      await dataSource.initialize();
      console.log(`App running on port: ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

startServer();
