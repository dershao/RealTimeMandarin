import mongoose from 'mongoose';
import config from "../config";
import Character from '../models/Character.js';

export default async () => {
    await mongoose.connect(config.dbURL, {})
        .then(() => {
            console.info("MongoDB successfully connected");

            // temporary data
            let characters = [
                {
                    id: 0,
                    description: "ah"
                },
                {
                    id: 1,
                    description: "jin"
                },
                {
                    id: 2,
                    description: "small"
                },
                {
                    id: 3,
                    description: "something"
                },
                {
                    id: 4,
                    description: "english"
                },
                {
                    id: 5,
                    description: "cow"
                }
            ];
            Character.insertMany(characters, (err) => {
                if (err) {
                    console.error(`Error populating database ${err}`);
                }
            });
        });
}