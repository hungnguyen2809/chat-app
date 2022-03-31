import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { connectMongoDB } from './src/database';

config();
const PORT = process.env.PORT || 8088;

const app = express();
const server = createServer(app);
connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.json({ message: 'Halo, Wellcome' });
});

server.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
