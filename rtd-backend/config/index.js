import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {

    throw new Error("Could not find .env file");
}

export default {

    dbURL: process.env.MONGODB_URI,

    port: process.env.PORT || 8080

};