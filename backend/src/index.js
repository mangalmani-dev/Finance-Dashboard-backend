import app from "./app.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"  
import adminRoutes from "./routes/admin.routes.js";
import healthRoutes from "./routes/health.routes.js";
import ApiResponse from "./utils/ApiResponse.js";

dotenv.config({
    path: "./.env"
})

// SET PORT 
const port = process.env.PORT || 4000;

// MIDDLEWARES TO PARSE JSON AND COOKIES
app.use(express.json());
app.use(cookieParser());


// FOR CHECKING
app.get("/", (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, "Finance Dashboard Backend API is live")
  );
});

// API ENDPOINTS
app.use("/api/v1", healthRoutes);
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/record",recordRoutes)
app.use("/api/v1/dashboard",dashboardRoutes)
app.use("/api/v1/admin", adminRoutes);



// SET THE APP TO LISTEN ON THE SPECIFIED PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


