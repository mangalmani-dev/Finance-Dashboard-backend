import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import prisma from "../config/prisma.js";

// FOR ADMIN TO UPDATE USER ROLE
export const updateUserRole = async (req,res,next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!user) {
      return next(
        new ApiError(404, "User not found")
      );
    }

 const updatedUser = await prisma.user.update({
  where: {
    id: Number(id)
  },
  data: {
    role: {
      connect: {
        roleName: role
      }
    }
  }
});
    return res.status(200).json(
      new ApiResponse(
        200,
        "User role updated successfully",
        updatedUser
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};