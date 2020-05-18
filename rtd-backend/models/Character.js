import mongoose from 'mongoose';

const Character = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            index: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        }
    }
);

export default mongoose.model("character", Character);