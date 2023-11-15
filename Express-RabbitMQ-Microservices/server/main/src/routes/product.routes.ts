import express, { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Channel } from 'amqplib';

export const ProductRouter = (repository: Repository<Product>) => {
  const router = express.Router();
  const adminUrl = process.env.ADMIN_URL!;

  router.get('/', async (req: Request, res: Response) => {
    const products = await repository.find();
    res.json(products);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const product = await repository.findOneBy({
      admin_id: parseInt(req.params.id, 10),
    });
    return res.json(product);
  });

  router.post('/:id/like', async (req: Request, res: Response) => {
    const product = await repository.findOneBy({
      admin_id: parseInt(req.params.id, 10),
    });
    await fetch(`${adminUrl}/${product.admin_id}/like`, {
      method: 'POST',
    });
    product.likes++;
    await repository.save(product);
    res.send(product);
  });

  router.post('/:id/unlike', async (req: Request, res: Response) => {
    const product = await repository.findOneBy({
      admin_id: parseInt(req.params.id, 10),
    });
    if (product.likes > 0) {
      await fetch(`${adminUrl}/${product.admin_id}/unlike`, {
        method: 'POST',
      });
      product.likes--;
      await repository.save(product);
      res.send(product);
    } else {
      res.send({ message: 'There are no likes.' });
    }
  });

  return router;
};
