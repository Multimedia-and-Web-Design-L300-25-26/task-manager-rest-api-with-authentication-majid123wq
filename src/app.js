import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      app.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
      );
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export default app;
