import { connectDB } from "./bd/bd";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

export const startServer = async () => {
    try{
        await connectDB();
        console.log("CONEXION EXITOSA")
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        });
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}