import {
  pgDBHost,
  pgDBName,
  pgDBPassword,
  pgDBPort,
  pgDBUser,
} from '$server/config';
import { Pool, type QueryResult } from 'pg';
import { logger } from '$server/logger';

const pool = new Pool({
  user: pgDBUser,
  host: pgDBHost,
  database: pgDBName,
  password: pgDBPassword,
  port: pgDBPort,
});

export async function query(
  queryName: string,
  query: string,
  params?: any[]
): Promise<QueryResult<any> | null> {
  let result: QueryResult<any> | null = null;
  let client;
  logger.logDbQueryRequest(queryName, { query, params });
  try {
    client = await pool.connect();
    const queryResult = await client.query(query, params);
    result = queryResult;
  } catch (err) {
    logger.logException('DB_ERROR: ' + queryName, String(err));
  } finally {
    if (client) client.release();
  }
  logger.logDbQueryResponse(queryName, { result });

  return result;
}
