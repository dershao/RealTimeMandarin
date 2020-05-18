import { Router } from 'express';
import character from './character.js';

export default () => {
    const app = Router();
    character(app);

    return app;
}