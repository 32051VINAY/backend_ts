"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: 'redis://localhost:6379',
});
client.on('error', (err) => console.log('Redis Error:', err));
async function main() {
    await client.connect();
    await client.set('name', 'akshay', { EX: 10 });
    console.log(`data available: ${await client.get('name')}`);
}
main();
exports.default = client;
//# sourceMappingURL=redis.js.map