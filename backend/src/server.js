import express, { response } from "express";
import taskRoute from './routes/tasksRouters.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Load env from the src folder where the .env is located
dotenv.config({ path: './src/.env' });

const PORT = process.env.PORT || 5001;

const app = express();

connectDB();

app.use("/api/tasks", taskRoute);

app.listen(PORT, () => {
    console.log(`Server bat dau tren cong ${PORT}`);
})


