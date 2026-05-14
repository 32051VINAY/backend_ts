import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import investorRoute from './routes/investorRoute';
import sipRoute from './routes/sipRoute';
import fundRoute from './routes/fundRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/investors', investorRoute);
app.use('/api/funds', fundRoute);
app.use('/api/sip', sipRoute);

app.get('/', (req, res) => {
  res.send('SIP Tracker API running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
