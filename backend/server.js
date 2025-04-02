import express from 'express';
import dontenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from 'path';

dontenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "forntend", "dist", "index.html"));
    });
}
app.listen(PORT, ()=>{
    connectDB()
    console.log("server started at http://localhost:" + PORT)
});

