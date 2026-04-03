import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";



export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return next(
        new ApiError(409, "User already exists")
      );
    }

    // Get default VIEWER role
    const defaultRole = await prisma.role.findUnique({
      where: {
        roleName: "viewer"
      }
    });

    if (!defaultRole) {
      return next(
        new ApiError(
          404,
          "Default role VIEWER not found"
        )
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: defaultRole.id
      },
      include: {
        role: true
      }
    });

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role.roleName
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    // Remove password
    const { password: _, ...safeUser } = user;

    return res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        safeUser
      )
    );
  } catch (error) {
    return next(
      new ApiError(
        500,
        error.message || "Internal server error"
      )
    );
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role.roleName
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.roleName,
            status: user.status
          }
        }
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};
// logout

export const logoutUser = async (req, res, next) => {
  try {
    return res.status(200).json(
      new ApiResponse(
        200,
        "Logout successful",
        null
      )
    );
  } catch (error) {
    return next(
      new ApiError(
        500,
        error.message || "Internal server error"
      )
    );
  }
};

  