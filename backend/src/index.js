import app from "./app.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"  

dotenv.config({
    path: "./.env"
})

// set the port
const port = process.env.PORT || 4000;

//middleware to parse JSON
app.use(express.json());


app.use(cookieParser());


app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/record",recordRoutes)
app.use("/api/v1/dashboard",dashboardRoutes)


// start the server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


