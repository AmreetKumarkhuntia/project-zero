import dotenv from "dotenv";

dotenv.config();

export const superUserKey = process.env.SUPER_USER_KEY ?? "";

export const jwtSecret = process.env.JWT_SECRET ?? "";

export const jwtExpireTime = parseInt(process.env.JWT_EXPIRE_TIME ?? "36000");

export const jwtIssuer = process.env.JWT_ISSUER ?? "project-zero";

export const publicRSAKey = process.env.PUBLIC_KEY ?? "";

export const privateRSAKey = process.env.PRIVATE_KEY ?? "";
