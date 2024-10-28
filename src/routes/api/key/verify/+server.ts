import type { RequestEvent } from '@sveltejs/kit';
import { APIResponseHandler } from '$server/APISchema';
import { decodeVerifyTokenBody, type Token } from '$generated/types';
import {
  isSuperUserKeyValid,
  verifyJWTToken,
  verifyRSAToken,
} from '$server/keyStore';
import { logger } from '$server/logger';

export async function POST({ request }: RequestEvent) {
  let response = APIResponseHandler.badRequestResponse(
    'Bad request !!!. No processing'
  );
  const reqBody = await request.json();
  const headers = request.headers;
  const decodedVerifyTokenPayload = decodeVerifyTokenBody(reqBody);
  const checkFor = decodedVerifyTokenPayload?.checkFor ?? null;
  const loggerTag = 'POST /api/key/verify';
  let tokenData: Token | null = null;

  logger.logServerRequest(loggerTag, { reqBody, checkFor });

  try {
    if (!isSuperUserKeyValid(headers)) {
      response = APIResponseHandler.unauthorizedResponse(
        'Wrong token provided'
      );
    } else {
      if (decodedVerifyTokenPayload) {
        switch (checkFor) {
          case 'JWT':
            tokenData = verifyJWTToken(decodedVerifyTokenPayload.token);
            break;
          case 'RSA':
            tokenData = verifyRSAToken(decodedVerifyTokenPayload.token);
            break;
          default:
            tokenData = null;
        }
        response = APIResponseHandler.successResponse('Success', tokenData);
      } else {
        response = APIResponseHandler.badRequestResponse(
          'Unable to decode payload.'
        );
      }
    }
  } catch (error) {
    logger.logException(loggerTag, String(error));
    response = APIResponseHandler.internalServerErrorResponse(String(error));
  }
  logger.logServerResponse(loggerTag, {
    response,
  });
  return APIResponseHandler.toResponse(response);
}
