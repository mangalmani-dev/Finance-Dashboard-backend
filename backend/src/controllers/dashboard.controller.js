import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getDashboardSummary = async (
  req,
  res,
  next
) => {
  try {
    const income =
      await prisma.financialRecord.aggregate({
        _sum: {
          amount: true
        },
        where: {
          type: "INCOME",
          isDeleted: false
        }
      });

    const expense =
      await prisma.financialRecord.aggregate({
        _sum: {
          amount: true
        },
        where: {
          type: "EXPENSE",
          isDeleted: false
        }
      });

    const totalIncome =
      Number(income._sum.amount || 0);

    const totalExpense =
      Number(expense._sum.amount || 0);

    const netBalance =
      totalIncome - totalExpense;

    return res.status(200).json(
      new ApiResponse(
        200,
        "Dashboard summary fetched successfully",
        {
          totalIncome,
          totalExpense,
          netBalance
        }
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};

export const getCategorySummary = async (
  req,
  res,
  next
) => {
  try {
    const summary =
      await prisma.financialRecord.groupBy({
        by: ["category"],
        _sum: {
          amount: true
        },
        where: {
          isDeleted: false
        }
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Category summary fetched successfully",
        summary
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};

export const getRecentActivity = async (
  req,
  res,
  next
) => {
  try {
    const records =
      await prisma.financialRecord.findMany({
        where: {
          isDeleted: false
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 5
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Recent activity fetched successfully",
        records
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};