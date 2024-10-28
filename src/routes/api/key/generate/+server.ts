import type { RequestEvent } from '@sveltejs/kit';
import { APIResponseHandler } from '$server/APISchema';
import { constructRSAToken, isSuperUserKeyValid } from '$server/keyStore';
import {
  decodeServerAccess,
  type TokenGenerateResponse,
} from '$generated/types';
import { logger } from '$server/logger';

// TODO: add support for JWT/any other method support
export async function POST({ request }: RequestEvent) {
  let response = APIResponseHandler.badRequestResponse(
    'Bad request !!!. No processing'
  );
  const headers = request.headers;
  const reqBody = await request.json();
  const decodedTokenPayload = decodeServerAccess(reqBody);
  const loggerTag = 'POST /api/key/generate';
  let tokenGenerateResponse: TokenGenerateResponse;

  logger.logServerRequest(loggerTag, { decodedTokenPayload });

  try {
    if (!isSuperUserKeyValid(headers)) {
      response = APIResponseHandler.unauthorizedResponse(
        'Wrong token provided'
      );
    } else {
      if (decodedTokenPayload) {
        const token = constructRSAToken(decodedTokenPayload);
        tokenGenerateResponse = {
          token: token,
          tokenData: decodedTokenPayload,
        };
        response = APIResponseHandler.successResponse(
          'creation success',
          tokenGenerateResponse
        );
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
  logger.logServerResponse(loggerTag, { response });
  return APIResponseHandler.toResponse(response);
}
