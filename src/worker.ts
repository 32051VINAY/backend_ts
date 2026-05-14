import { createClient } from 'redis';

const workerClient = createClient({
  url: "redis://localhost:6379",
});

workerClient.on("error", (err: Error) => {
  console.log("Worker redis error", err);
});

const worker = async (): Promise<void> => {
  await workerClient.connect();
  console.log("worker connected");
  while (true) {
    try {
      // Worker logic goes here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Sleep for a bit to prevent infinite loop hogging
    } catch (err) {
      console.error("Worker error:", err);
    }
  }
};

worker();
