import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379',
});

client.on('error', (err: Error) => console.log('Redis Error:', err));

async function main(): Promise<void> {
  await client.connect();
  await client.set('name', 'akshay', { EX: 10 });
  console.log(`data available: ${await client.get('name')}`);
}

main();

export default client;
