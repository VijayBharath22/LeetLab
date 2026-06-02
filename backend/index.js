import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./src/db/db.js";
import cookies from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";

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

app.use("/", (req, res) => {
  res.send("Hello World!");
});

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
