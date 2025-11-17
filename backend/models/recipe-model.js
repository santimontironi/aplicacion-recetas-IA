import mongoose from "mongoose";

mongoose.Schemas.Recipe = new mongoose.Schema({
    ingredients: [{ type: String, required: true }],
    recipeName: { type: String, required: true },
    preparation: [{ type: String, required: true }],
    time: { type: String, required: true },
    difficulty: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now() },
    user: { type: String, required: true }
});

export default mongoose.model("Recipe", mongoose.Schemas.Recipe);