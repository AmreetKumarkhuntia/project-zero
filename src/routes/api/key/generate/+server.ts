import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$utils/server/APISchema";
import { constructRSAToken, isSuperUserKeyValid } from "$server/keyStore";
import {
  decodeServerAccess,
  type TokenGenerateResponse,
} from "$generated/types";

export async function POST({ request }: RequestEvent) {
  let response = APIResponseHandler.badRequestResponse(
    "Bad request !!!. No processing"
  );
  const headers = request.headers;
  const reqBody = await request.json();
  const decodedTokenPayload = decodeServerAccess(reqBody);
  let tokenGenerateResponse: TokenGenerateResponse;

  console.log(
    "POST generateToken | requestRecieved | ",
    JSON.stringify(decodedTokenPayload)
  );

  try {
    if (!isSuperUserKeyValid(headers)) {
      response = APIResponseHandler.unauthorizedResponse(
        "Wrong token provided"
      );
    } else {
      if (decodedTokenPayload) {
        const token = constructRSAToken(decodedTokenPayload);
        tokenGenerateResponse = {
          token: token,
          tokenData: decodedTokenPayload,
        };
        response = APIResponseHandler.successResponse(
          "creation success",
          tokenGenerateResponse
        );
      } else {
        response = APIResponseHandler.badRequestResponse(
          "Unable to decode payload."
        );
      }
    }
  } catch (error) {
    console.log("POST generateToken | exception | ", String(error));
    response = APIResponseHandler.internalServerErrorResponse(String(error));
  }
  console.log("POST generateToken | responseReturned | ", {});
  return response;
}
