"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    host: 'aws-1-ap-south-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    password: process.env.password,
    user: 'postgres.sbyqazgzkxeaouhslfkt',
    ssl: {
        rejectUnauthorized: false,
    },
});
async function run() {
    await client.connect();
    const res = await client.query('SELECT * FROM investor;');
    console.log(res.rows);
    await client.end();
}
run();
exports.default = client;
//# sourceMappingURL=pgManager.js.map