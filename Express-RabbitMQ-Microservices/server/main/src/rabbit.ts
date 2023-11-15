import amqplib, { Channel, Connection } from 'amqplib';

const amqpUrl = process.env.RABBITMQ_URL!;
let channel: Channel;
let connection: Connection;

export const connect = async () => {
  try {
    const amqpServer = amqpUrl;
    connection = await amqplib.connect(amqpServer);
    await connection.createChannel();
  } catch (error) {
    console.log(error);
  }
};
