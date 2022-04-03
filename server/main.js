import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { connectMongoDB } from './src/database';
import routes from './src/routes';
import io from './src/socket';

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

app.use('/api/v1', routes);

io.listen(server);

server.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
