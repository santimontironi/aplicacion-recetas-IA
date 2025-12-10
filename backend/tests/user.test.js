import request from "supertest"; //librería para hacer requests HTTP sin levantar un servidor real
import app from "../app.js";
import { connectTestDB, disconnectTestDB, cleanTestDB } from "./setup.js";
import User from "../models/user-model.js";

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