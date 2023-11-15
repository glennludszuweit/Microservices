import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Channel, Message } from 'amqplib';

export class ProductHelper {
  repository: Repository<Product>;
  channel: Channel;

  constructor(repository: Repository<Product>, channel: Channel) {
    this.repository = repository;
    this.channel = channel;

    channel.assertQueue('product_created', { durable: false });
    channel.assertQueue('product_updated', { durable: false });
    channel.assertQueue('product_deleted', { durable: false });
  }

  productCreated() {
    this.channel.consume(
      'product_created',
      async (msg: Message | null) => {
        const data: Product = JSON.parse(msg.content.toString());
        const product = new Product();
        product.admin_id = parseInt(data.id, 10);
        product.title = data.title;
        product.image = data.image;
        product.likes = data.likes;

        await this.repository.save(product);
      },
      { noAck: true }
    );
  }

  productUpdated() {
    this.channel.consume(
      'product_updated',
      async (msg: Message | null) => {
        const data: Product = JSON.parse(msg.content.toString());
        const product = await this.repository.findOneBy({
          admin_id: parseInt(data.id, 10),
        });
        this.repository.merge(product, {
          title: data.title,
          image: data.image,
          likes: data.likes,
        });

        await this.repository.save(product);
      },
      { noAck: true }
    );
  }

  productDeleted() {
    this.channel.consume('product_deleted', async (msg: Message | null) => {
      const admin_id = parseInt(msg.content.toString());
      this.repository.delete({ admin_id });
    });
  }
}
