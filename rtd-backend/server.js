import express from 'express';
import cors from 'cors';
import config from './config';
import api from './api';
import db from './db';

db().catch((err) => {
    if (err) {
        console.error(`Error population database with error ${err}`);
    }
});

const app = express();
const PORT = config.port;

app.use(cors());

app.use('/api', api());

app.listen(PORT);
console.info('Listening to port %s...',  PORT);
