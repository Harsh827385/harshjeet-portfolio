/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const DEFAULT_PORT = Number(process.env.PORT || '3000');

app.use(express.json());
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  startServer(DEFAULT_PORT);
}

function startServer(port: number, attemptsRemaining = 10) {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE' && attemptsRemaining > 0) {
      console.warn(`Port ${port} is busy. Trying ${port + 1} instead...`);
      server.close();
      startServer(port + 1, attemptsRemaining - 1);
      return;
    }

    console.error('Server boot failed:', err);
    process.exitCode = 1;
  });
}

initServer().catch((err) => {
  console.error('Server boot failed:', err);
});
