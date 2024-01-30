import packageJson from './package.json' assert { type: "json" };
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { initDb } from './util/db_util.js';

import NoteRouter from './routes/NoteRouter.js';
import UserRouter from './routes/UserRouter.js';


console.log(chalk.yellow("Server Starting!"));
await initDb()

const server = express();
server.use(cors());
server.use(express.json());

server.use('/v1/notes', NoteRouter)
server.use('/v1/users', UserRouter)

/**
 * Route for fetching server status
 */
server.get("/status", (req, res) => {
  const statusObj = {
    server_port: PORT,
    server_version: packageJson.version,
  };
  res.json(statusObj);
});

/**
 * Route for flushing cache items
 * @param {string} req.query.cacheKey - Key of the cache item to flush
 */
server.get("/flush_cache", (req, res, next) => {
  try {
    const cacheKey = req.query.cacheKey;
    if (!cacheKey) {
      flushCache();
      res.json({ message: `entire cache flushed` });
    } else {
      flushCache(cacheKey);
      res.json({ message: `cache item ${cacheKey} flushed` });
    }
  } catch (e) {
    next(e);
  }
});

/**
 * Global error handling middleware
 */
server.use((err, req, res, next) => {
  console.error(chalk.red(err));
  res.status(err.status || 500).json({ status: err.status, message: err.message });
});

const PORT = process.env.PORT || 8420;
server.listen(PORT);

console.log(chalk.yellow(`server listening on port ${PORT}`));
