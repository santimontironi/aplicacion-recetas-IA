import request from "supertest"; //librería para hacer requests HTTP sin levantar un servidor real
import app from "../app.js";
import { connectTestDB, disconnectTestDB, cleanTestDB } from "./setup.js";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

beforeAll(async () => { //se ejecuta una vez antes de todos los tests del archivo
    await connectTestDB();
});

afterEach(async () => { //se ejecuta después de cada test
    await cleanTestDB();
});

afterAll(async () => { //se ejecuta una vez al final de todos los tests
    await disconnectTestDB();
});

describe("POST /register", () => {
    it("Debe registrar un usuario correctamente", async () => {
        const res = await request(app).post("/register").send({
            username: "santi",
            email: "santi@example.com",
            password: "123456"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Usuario registrado correctamente");

        const userDB = await User.findOne({ email: "santi@example.com" }); //consulta directa a la BD de prueba para verificar que el usuario realmente fue creado.
        expect(userDB).not.toBeNull(); //asegura que el documento existe en la BD, por ende que no sea null
    });

    it("Debe impedir registro duplicado", async () => {
        await User.create({
            username: "santi",
            email: "santi@example.com",
            password: "hashed"
        });

        const res = await request(app).post("/register").send({
            username: "santi",
            email: "santi@example.com",
            password: "123456"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("El email o el username ya existen");
    });
});

describe("POST /login", () => {
    it("Debe iniciar sesión correctamente", async () => {

        const hashPassword = await bcrypt.hash("hashed", 10);

        await User.create({
            username: "santi",
            email: "santi@example.com",
            password: hashPassword
        });

        const res = await request(app).post("/login").send({
            identifier: "santi@example.com",
            password: "hashed"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Inicio de sesión exitoso");
    });

    it("Debe impedir iniciar sesión con clave incorrecta", async () => {
        await User.create({
            username: "santi",
            email: "santi@example.com",
            password: "hashed"
        });

        const res = await request(app).post("/login").send({
            identifier: "santi@example.com",
            password: "hashed2"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("La contraseña es incorrecta");
    });

    it("Debe impedir iniciar sesion con identifier incorrecto", async () => {
        await User.create({
            username: "santi",
            email: "santi@example.com",
            password: "hashed"
        });

        const res = await request(app).post("/login").send({
            identifier: "santi@example.com2",
            password: "hashed"
        });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("El usuario no existe");
    });
})

describe("GET /dashboard", () => {
    it("Debe permitir el acceso con un token válido", async () => {
        
        //se crear usuario real
        const hashPassword = await bcrypt.hash("123456", 10);
        const user = await User.create({
            username: "santi",
            email: "santi@example.com",
            password: hashPassword
        });

        // se generar token manualmente (igual que en tu controller)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // se hace un request con cookie
        const res = await request(app)
            .get("/dashboard")
            .set("Cookie", [`token=${token}`]);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Entrada al dashboard exitosa");
    });

    it("Debe impedir acceso sin token", async () => {
        const res = await request(app).get("/dashboard");

        expect(res.statusCode).toBe(401);
        expect(res.body.authorized).toBe(false);
    });
});