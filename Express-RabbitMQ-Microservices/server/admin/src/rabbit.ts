import amqplib from 'amqplib';
import { startServer } from './app';

export const connect = async () => {
  try {
    const amqpUrl = process.env.RABBITMQ_URL!;
    const amqpServer = amqpUrl;
    const connection = await amqplib.connect(amqpServer);
    const channel = await connection.createChannel();
    startServer(connection, channel);
  } catch (error) {
    console.log(error);
  }
};
