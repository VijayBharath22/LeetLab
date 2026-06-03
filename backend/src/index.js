import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db.js";
import cookies from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cookies());
app.use(
  cors({
    origin: "https://localhost:3000",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth", authRoutes);

db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server", err);
    process.exit(1);
  });
