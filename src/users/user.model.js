import { Schema, model } from "mongoose";

const AdminSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [30, "Can't exceed 30 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [30, "Can't exceed 30 characters"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"]
    },
    estado: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
});

AdminSchema.methods.toJSON = function () {
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
};

export default model('Admin', AdminSchema);
