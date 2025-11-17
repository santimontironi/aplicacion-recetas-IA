import mongoose from "mongoose";

mongoose.Schemas.User = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }
);

export default mongoose.model("User", mongoose.Schemas.User);