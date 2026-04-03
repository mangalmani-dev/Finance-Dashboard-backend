import { PrismaClient } from "../generated/prisma/client.js";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
dotenv.config();
const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

export default prisma;