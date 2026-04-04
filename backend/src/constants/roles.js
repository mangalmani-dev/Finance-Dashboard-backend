// ALL CONSTANTS USED IN THE APPLICATION FOR ROLES, USER STATUS, RECORD TYPES, MESSAGES, AND HTTP STATUS CODES

export const UserRolesEnum = {
  VIEWER: "viewer",
  ANALYST: "analyst",
  ADMIN: "admin"
};
export const AvailableRoles = Object.values(UserRolesEnum);

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive"
};

export const AVAILABLE_STATUS = Object.values(USER_STATUS);

export const RECORD_TYPES = {
  INCOME: "income",
  EXPENSE: "expense"
};

export const AVAILABLE_RECORD_TYPES = Object.values(RECORD_TYPES);




export const MESSAGES = {
  USER_CREATED: "User created successfully",
  LOGIN_SUCCESS: "Login successful",
  INVALID_CREDENTIALS: "Invalid credentials",
  ACCESS_DENIED: "Access denied",
  RECORD_CREATED: "Financial record created successfully",
  RECORD_UPDATED: "Record updated successfully",
  RECORD_DELETED: "Record deleted successfully",
  RECORD_NOT_FOUND: "Financial record not found"
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};