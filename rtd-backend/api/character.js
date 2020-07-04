import {Router} from 'express';
import {DEFAULT_CHARS_PER_ROUND, NUM_CLASSES} from "../common/constants";

const route = Router();
import Character from '../models/Character.js';

/**
 * Generate n random ids to choose from character database
 *
 * @param n Number of random ids to choose from
 * @returns array of ids
 */
function generateRandomNumbers(n) {
    const nums = new Set(); // set to ensure unique numbers

    while (nums.size !== n) {
        nums.add(Math.floor(Math.random() * NUM_CLASSES));
    }
    return Array.from(nums);
}

/**
 * Get random characters from database specified by array of ids
 *
 * @param charIds an array of ids
 */
async function getRandomCharacters(charIds) {

    return await Character.find({
        $or: charIds.map((charId) => {
            return {id: charId}
        })
    }, (err, docs) => {
        if (err) throw err;
        return docs;
    });
}

export default (app) => {

    route.get('/', (req, res) => {

        const amount = req.query.amount || DEFAULT_CHARS_PER_ROUND;

        const nums = generateRandomNumbers(parseInt(amount));

        getRandomCharacters(nums)
            .then((docs) => {
                console.info(docs);
                res.send(docs);
            }).catch((err) => {
            console.error(`Error querying database with char ids ${err}`);
        });

    });

    app.use('/characters', route);
}