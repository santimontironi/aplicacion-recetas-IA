import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req,res) => {
    try{
        const{ email, username, password } = req.body;

        const wrongData = await User.findOne({ 
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if(wrongData) return res.status(400).json({ message: 'El email o el username ya existen' });

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashPassword });

        res.status(200).json({ message: 'Usuario registrado correctamente', user });
    }
    catch(error){
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
}

export const loginUser = async (req,res) => {
    try{
        const { identifier, password } = req.body;

        const user = await User.findOne({ 
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if(!user) return res.status(404).json({ message: 'El usuario no existe' });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({ message: 'La contraseña es incorrecta' });

        const token = jwt.sign(
            { id: user._id }, //payload
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    }
    catch(error){
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
}

export const dashboardUser = async (req,res) => {
    try{
        const userId = req.user.id

        const user = await User.findById(userId);

        if(!user) return res.status(401).json({ message: 'El usuario no existe o no esta autorizado', authorized: false });

        res.status(200).json({ message: 'Entrada al dashboard exitosa', user });
    }
    catch(error){
        res.status(500).json({message: 'Error al entrar al dashboard', error: error.message});
    }
}

export const logoutUser = async (req,res) => {
    try{
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    }
    catch(error){
        res.status(500).json({ message: 'Error al cerrar sesión', error: error.message });
    }
}

