import mongoose, { Schema } from "mongoose";

let User = new Schema({
	id: String,
	name: String,
	surname: String
});

export const UserModel = mongoose.model('User', User);

export default UserModel;