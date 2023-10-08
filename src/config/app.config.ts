import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  host: process.env.APP_HOST || '0.0.0.0',
  port: process.env.APP_PORT || '80',
  dbHost: process.env.POSTGRES_HOST || 'localhost',
  dbPort: process.env.POSTGRES_PORT || '5432',
  dbUser: process.env.POSTGRES_USER,
  dbPass: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DATABASE,
}));
