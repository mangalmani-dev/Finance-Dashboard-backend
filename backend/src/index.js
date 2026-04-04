import app from "./app.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"  
import adminRoutes from "./routes/admin.routes.js";

dotenv.config({
    path: "./.env"
})

// set the port
const port = process.env.PORT || 4000;

//middleware to parse JSON
app.use(express.json());
// middleware to parse cookies
app.use(cookieParser());



// api endpoints
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/record",recordRoutes)
app.use("/api/v1/dashboard",dashboardRoutes)
app.use("/api/v1/admin", adminRoutes);


//  test api endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Finance Dashboard Backend API",
    status: "Server is running successfully"
  });
});


// start the server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


