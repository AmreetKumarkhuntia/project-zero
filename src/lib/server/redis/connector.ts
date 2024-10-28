import { createClient, type RedisClientType } from 'redis';
import { logger } from '$server/logger';
import { redisHost, redisPassword, redisPort, redisUser } from '$server/config';

const clientConfig = {
  socket: {
    host: redisHost,
    port: redisPort,
  },
  username: redisUser,
  password: redisPassword,
};

export async function setRedis(
  queryName: string,
  key: string,
  value: string
): Promise<string | null> {
  let result: string | null = null;
  logger.logRedisQueryRequest(queryName, { key, value });
  let redisClient = createClient(clientConfig);
  try {
    await redisClient.connect();
    result = await redisClient.set(key, value);
  } catch (err) {
    logger.logException(
      'RedisSetError: ' + queryName,
      `Redis Initialization Error: ${String(err)}`
    );
  } finally {
    redisClient.disconnect();
  }

  logger.logRedisQueryResult(queryName, { result });
  return result;
}

export async function getRedis(
  queryName: string,
  key: string
): Promise<string | null> {
  let result: string | null = null;
  logger.logRedisQueryRequest(queryName, { key });
  let redisClient = createClient(clientConfig);
  try {
    await redisClient.connect();
    result = await redisClient.get(key);
  } catch (err) {
    logger.logException(
      'RedisGetError: ' + queryName,
      `Redis Initialization Error: ${String(err)}`
    );
  } finally {
    redisClient.disconnect();
  }

  logger.logRedisQueryResult(queryName, { result });
  return result;
}

export async function testRedisConnection(): Promise<string | null> {
  let result: string | null = null;
  logger.logRedisQueryRequest('testConenction', {});
  let redisClient = createClient(clientConfig);
  try {
    await redisClient.connect();
    result = await redisClient.ping();
  } catch (err) {
    logger.logException(
      'testConenction',
      `Redis Initialization Error: ${String(err)}`
    );
  } finally {
    redisClient.disconnect();
  }

  logger.logRedisQueryResult('testConenction', { result });
  return result;
}
