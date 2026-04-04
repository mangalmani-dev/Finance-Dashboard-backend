import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


// FOR CREATING A SINGLE RECORD
export const createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await prisma.financialRecord.create({
      data: {
        amount,
        type: type.toUpperCase(),
        category,
        date: new Date(date),
        notes,
        createdBy: req.user.id,
      },
    });

    return res.status(201).json(
      new ApiResponse(201, "Record created successfully", record)
    );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// FOR CREATING MULTIPLE RECORDS IN BULK
export const createMultipleRecords = async (req, res, next) => {
  try {
    const records = req.body;

    if (!Array.isArray(records) || records.length === 0) {
      return next(new ApiError(400, "Please send an array of records"));
    }

    const createdRecords = await Promise.all(
      records.map(({ amount, type, category, date, notes }) =>
        prisma.financialRecord.create({
          data: {
            amount,
            type: type.toUpperCase(),
            category,
            date: new Date(date),
            notes,
            createdBy: req.user.id,
          },
        })
      )
    );

    return res.status(201).json(
      new ApiResponse(201, "Multiple records created successfully", createdRecords)
    );
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

// FOR GETTING ALL RECORDS WITH FILTERING, PAGINATION, AND SORTING

export const getAllRecords = async (req, res, next) => {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc"
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const filters = {
      isDeleted: false
    };

    if (type) {
      filters.type = type;
    }

    if (category) {
      filters.category = category;
    }

    if (startDate || endDate) {
      filters.date = {};

      if (startDate) {
        filters.date.gte = new Date(startDate);
      }

      if (endDate) {
        filters.date.lte = new Date(endDate);
      }
    }

    const allowedSortFields = [
      "amount",
      "date",
      "createdAt",
      "category",
      "type"
    ];

    const finalSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const finalOrder =
      order === "asc" ? "asc" : "desc";

    const totalRecords =
      await prisma.financialRecord.count({
        where: filters
      });

    const records =
      await prisma.financialRecord.findMany({
        where: filters,
        skip,
        take: limitNumber,
        orderBy: {
          [finalSortBy]: finalOrder
        }
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Records fetched successfully",
        {
          page: pageNumber,
          limit: limitNumber,
          totalRecords,
          totalPages: Math.ceil(
            totalRecords / limitNumber
          ),
          sortBy: finalSortBy,
          order: finalOrder,
          records
        }
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};


// FOR GETTING A SINGLE RECORD BY ID
export const getRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const record = await prisma.financialRecord.findUnique({
      where: {
         isDeleted:false,
        id: Number(id)
      }
    });

    if (!record) {
      return next(
        new ApiError(404, "Record not found")
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Record fetched successfully",
        record
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};


// FOR UPDATING A RECORD BY ID

export const updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedRecord =
      await prisma.financialRecord.update({
        where: {
          id: Number(id)
        },
        data: req.body
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Record updated successfully",
        updatedRecord
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};

// FOR DELETING A RECORD BY ID (SOFT DELETE)

export const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRecord =
      await prisma.financialRecord.update({
        where: {
          id: Number(id)
        },
        data: {
          isDeleted: true
        }
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Record deleted successfully",
        deletedRecord
      )
    );
  } catch (error) {
    return next(
      new ApiError(500, error.message)
    );
  }
};