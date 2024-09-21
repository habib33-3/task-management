import { model, Schema } from "mongoose";
import TUser from "../interfaces/user.interface";

const UserSchema = new Schema<TUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const User = model<TUser>("user", UserSchema);

export default User;
