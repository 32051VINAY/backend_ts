import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  password: process.env.password,
  user: 'postgres.sbyqazgzkxeaouhslfkt',
  ssl: {
    rejectUnauthorized: false,
  },
});

async function run(): Promise<void> {
  await client.connect();
  const res = await client.query('SELECT * FROM investor;');
  console.log(res.rows);
  await client.end();
}

run();

export default client;
