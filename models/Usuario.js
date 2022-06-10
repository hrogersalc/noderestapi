import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
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

usuarioSchema.pre("save", async function(next) {
    const usuario = this;

    if (!usuario.isModified('password')) {
        return next();
    }

    try {
        const sal = await bcryptjs.genSaltSync(10);
        usuario.password = await bcryptjs.hashSync(usuario.password, sal);
        next();
    } catch (error) {        
        console.log(error);
        throw new Error("fallo el hash de comntraseña");
    }
});

usuarioSchema.methods.compararPasswords = async function(passwordEntrada) {
    return await bcryptjs.compare(passwordEntrada, this.password);
};

export const Usuario = mongoose.model('Usuario', usuarioSchema);