import { hash } from "bcrypt";
import { model, Schema } from "mongoose";
import env from "../../config/env";
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

UserSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        this.password = await hash(this.password, Number(env.saltRound!));
    }

    next();
});

const User = model<TUser>("user", UserSchema);

export default User;
