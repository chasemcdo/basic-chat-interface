import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    chatId: {
        type: Schema.Types.ObjectId,
    },
});

UserSchema.plugin(passportLocalMongoose);

const User = model('User', UserSchema);

export default User;
