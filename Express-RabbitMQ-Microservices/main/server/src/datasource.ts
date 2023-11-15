import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: 'ambassador-main',
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
});
