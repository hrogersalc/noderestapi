import { mongoose } from "mongoose";
const {Schema, model} = mongoose;

const enlaceSchema = new Schema({
    enlaceLargo: {
        type: String,
        required: true,
        trim: true
    },
    enlaceCorto: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    uid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
});

export const Enlace = model('Enlace', enlaceSchema);