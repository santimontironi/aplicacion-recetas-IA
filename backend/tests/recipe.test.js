import request from "supertest";
import app from "../app.js";
import { connectTestDB, disconnectTestDB, cleanTestDB } from "./setup.js";
import Recipe from "../models/recipe-model.js";

beforeAll(async () => {
    await connectTestDB();
});

afterEach(async () => {
    await cleanTestDB();
});

afterAll(async () => {
    await disconnectTestDB();
});
