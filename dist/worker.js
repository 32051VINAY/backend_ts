"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const workerClient = (0, redis_1.createClient)({
    url: "redis://localhost:6379",
});
workerClient.on("error", (err) => {
    console.log("Worker redis error", err);
});
const worker = async () => {
    await workerClient.connect();
    console.log("worker connected");
    while (true) {
        try {
            // Worker logic goes here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Sleep for a bit to prevent infinite loop hogging
        }
        catch (err) {
            console.error("Worker error:", err);
        }
    }
};
worker();
//# sourceMappingURL=worker.js.map