import express, { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

export const ProductRouter = (repository: Repository<Product>) => {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response) => {
    const products = await repository.find();
    res.json(products);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const product = await repository.findOneBy({
      id: Number(req.params.id),
    });
    return res.json(product);
  });

  router.post('/', async (req: Request, res: Response) => {
    const product = repository.create(req.body);
    const result = await repository.save(product);
    res.send(product);
  });

  router.put('/:id', async (req: Request, res: Response) => {
    const product = await repository.findOneBy({
      id: Number(req.params.id),
    });
    repository.merge(product, req.body);
    const result = await repository.save(product);
    res.send(result);
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const result = await repository.delete(parseInt(req.params.id, 10));
    res.send(result);
  });

  router.post('/:id/like', async (req: Request, res: Response) => {
    const product = await repository.findOneBy({
      id: Number(req.params.id),
    });
    product.likes++;
    const result = await repository.save(product);
    res.send(result);
  });

  router.post('/:id/unlike', async (req: Request, res: Response) => {
    const product = await repository.findOneBy({
      id: Number(req.params.id),
    });
    if (product.likes > 0) {
      product.likes--;
      const result = await repository.save(product);
      res.send(result);
    } else {
      res.send({ message: 'There are no likes.' });
    }
  });

  return router;
};
