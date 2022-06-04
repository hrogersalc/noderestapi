import { mongoose } from "mongoose";

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado al servidor mongodb...');
} catch (error) {
    console.log('Error conectando a mongodb: ' + error);
}