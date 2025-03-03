import { Schema, model } from "mongoose";

const CompanySchema = Schema({
    name: {
        type: String,
        required: [true, "Company name is required"],
        unique: true,
        maxLength: [70, "Can't exceed 70 characters"]
    },
    impactLevel: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: [true, "Impact level is required"]
    },
    yearsOfExperience: {
        type: Number,
        required: [true, "Trajectory years are required"],
        min: [0, "Years must be a positive number"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    description: {
        type: String,
        trim: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

CompanySchema.methods.toJSON = function () {
    const { __v, _id, ...company } = this.toObject();
    company.uid = _id;
    return company;
};

export default model('Company', CompanySchema);
adasdasdasd
