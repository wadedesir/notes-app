// import { 
//   fetchAndStoreData, 
//   flushCache, 
//   initDb 
// } from './util/db_util.js';

import express from 'express';
import chalk from 'chalk';
import cors from 'cors';

console.log(chalk.yellow("Server Starting!"));

/**
 * Fetch and store data before starting the server
 */

// initDb();
// fetchAndStoreData();

const server = express();
server.use(cors());

/**
 * Route for handling note requests by ID
 * @name server/getNote
 * @method
 * @memberof module:routers
 * @inner
 * @param {string} req.params.id - ID of the note to retrieve
 */
server.get("/note/:id", async (req, res, next) => {
  try {
    const id = req.params["id"];
    const note = await getById(id);
    if (!note) {
      res.status(404);
      res.json({ message: `404 note with id:${id} not found` });
    } else {
      res.json(note);
    }
  } catch (e) {
    next(e);
  }
});

/**
 * Route for deleting notes by ID
 * @name server/deleteNote
 * @method
 * @memberof module:routers
 * @inner
 * @param {string} req.params.id - ID of the note to delete
 */
server.delete("/note/:id", async (req, res, next) => {
  try {
    const id = req.params["id"];
    const note = await deleteById(id);
    if (!note) {
      res.status(404);
      res.json({ message: `404 note with id:${id} not found` });
    } else {
      res.json(note);
    }
  } catch (e) {
    next(e);
  }
});

/**
 * Route for creating new notes
 * @name server/createNote
 * @method
 * @memberof module:routers
 * @inner
 * @param {object} req.body - Body of the note
 */
server.post("/note/", async (req, res, next) => {
  try {
    const id = req.params["id"];
    const noteBody = request.body;
    const note = await createNote(noteBody);
    if (!note) {
      res.status(500);
      res.json({ message: `could not create note` });
    } else {
      res.json(note);
    }
  } catch (e) {
    next(e);
  }
});

/**
 * Route for searching notes by keywords
 * @name server/search
 * @method
 * @memberof module:routers
 * @inner
 * @param {string} req.query.keywords - Keywords to search for
 */
server.get("/search", async (req, res, next) => {
  try {
    const keywords = req.query.keywords;
    const notes = await getByKeywords(keywords);
    if (!notes) {
      res.status(404);
      res.json({ message: `404 note with keywords:${keywords} not found` });
    } else {
      res.json(notes);
    }
  } catch (e) {
    next(e);
  }
});

/**
 * Route for fetching server status
 * @name server/status
 * @method
 * @memberof module:routers
 * @inner
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
 * @name server/flush_cache
 * @method
 * @memberof module:routers
 * @inner
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
