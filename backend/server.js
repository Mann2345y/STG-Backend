import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import productRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import groupcartRoutes from "./routes/groupcartRoutes.js";
import { notFound, errorHandler } from "./middlewares/error.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ...");
});
app.use("/api/groupcart", groupcartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/order", orderRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
