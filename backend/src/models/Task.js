import mongoose from "mongoose";

// tạo schema
const taskScheme = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "complete"],
            default: "active",
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true, // createdAt và updatedAt được mongoose tự động thêm vào
    }
);

//  tạo model
const Task = mongoose.model("Task", taskScheme);
export default Task;