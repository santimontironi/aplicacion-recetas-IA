import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    ingredients: [{ type: String, required: true }],
    recipeName: { type: String, required: true },
    preparation: [{ type: String, required: true }],
    time: { type: String, required: true },
    difficulty: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now() },
    active: { type: Boolean, required: true, default: true },
    user: { type: String, required: true }
},
    { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);