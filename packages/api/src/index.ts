import express from 'express';
import cors from 'cors';
import path from 'path';
import { communitiesRouter } from './routes/communities.js';
import { assetsRouter } from './routes/assets.js';
import { publishRouter } from './routes/publish.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', version: '0.1.0' });
});

app.use('/api/communities', communitiesRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/publish', publishRouter);

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
