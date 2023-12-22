import mongoose from "mongoose";

const csvUserSchema = new mongoose.Schema({
    id: String,
    cardId: String,
    contactNumber: String,
    comment : String
});
export const UserModel = new mongoose.model('user', csvUserSchema);
