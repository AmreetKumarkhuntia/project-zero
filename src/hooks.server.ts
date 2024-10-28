import type { Handle } from '@sveltejs/kit';
import { logger } from '$server/logger';

export const handle: Handle = async ({ event, resolve }) => {
  //  Continue to the requested route
  //  TODO: implement auth layer as middleware and cors
  logger.logFunctionCalled('serverHooks', { event });
  logger.logFunctionCallResult('serverHooks', {});
  const response = await resolve(event);

  logger.logSetValues.orderId = 0;
  return response;
};
