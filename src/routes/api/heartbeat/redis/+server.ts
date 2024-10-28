import type { RequestEvent } from '@sveltejs/kit';
import { APIResponseHandler } from '$server/APISchema';
import { logger } from '$server/logger';
import type { APIResponse } from '$generated/types';
import { testRedisConnection } from '$server/redis';

export async function GET({ request }: RequestEvent) {
  const loggerTag = 'GET /api/redis/heartbeat';
  logger.logServerRequest(loggerTag, { request });

  const pong = await testRedisConnection();

  let result: APIResponse;

  if (pong === 'PONG') {
    result = APIResponseHandler.successResponse('Redis is up and reachable!');
  } else {
    result = APIResponseHandler.badRequestResponse('Redis is not reachable.');
  }

  logger.logServerResponse(loggerTag, { result });

  return APIResponseHandler.toResponse(result);
}
