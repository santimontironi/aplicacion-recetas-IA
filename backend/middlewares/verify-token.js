import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({authorized: false});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoded es el payload del token creado en el login user
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }
}