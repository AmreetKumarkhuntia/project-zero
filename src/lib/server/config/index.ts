import dotenv from 'dotenv';

dotenv.config();

export const superUserKey = process.env.SUPER_USER_KEY ?? '';

export const jwtSecret = process.env.JWT_SECRET ?? '';

export const jwtExpireTime = parseInt(process.env.JWT_EXPIRE_TIME ?? '36000');

export const jwtIssuer = process.env.JWT_ISSUER ?? 'project-zero';

export const publicRSAKey = process.env.PUBLIC_KEY ?? '';

export const privateRSAKey = process.env.PRIVATE_KEY ?? '';

export const pgDBHost = process.env.PG_HOST ?? 'localhost';

export const pgDBName = process.env.PG_DB ?? 'projectZero';

export const pgDBPort = Number(process.env.PG_PORT) ?? 5432;

export const pgDBUser = process.env.PG_USER ?? '';

export const pgDBPassword = process.env.PG_PASSWORD ?? '';

export const redisHost = process.env.REDIS_HOST || 'localhost';

export const redisPort = Number(process.env.REDIS_PORT) || 6379;

export const redisUser = process.env.REDIS_USER || 'default';

export const redisPassword = process.env.REDIS_PASSWORD || '';
