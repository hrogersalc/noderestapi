import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
});

export const Usuario = model('usuario', usuarioSchema);