import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$utils/server/APISchema";
import { decodeVerifyTokenBody, type Token } from "$generated/types";
import {
  isSuperUserKeyValid,
  verifyJWTToken,
  verifyRSAToken,
} from "$server/keyStore";

export async function POST({ request }: RequestEvent) {
  let response = APIResponseHandler.badRequestResponse(
    "Bad request !!!. No processing"
  );
  const reqBody = await request.json();
  const headers = request.headers;
  const decodedVerifyTokenPayload = decodeVerifyTokenBody(reqBody);
  const checkFor = decodedVerifyTokenPayload?.checkFor ?? null;
  let tokenData: Token | null = null;

  console.log(
    "POST verifyToken | requestRecieved | ",
    JSON.stringify({ checkFor })
  );

  try {
    if (!isSuperUserKeyValid(headers)) {
      response = APIResponseHandler.unauthorizedResponse(
        "Wrong token provided"
      );
    } else {
      if (decodedVerifyTokenPayload) {
        if (checkFor === "JWT") {
          tokenData = verifyJWTToken(decodedVerifyTokenPayload.token);
        } else if (checkFor === "RSA") {
          tokenData = verifyRSAToken(decodedVerifyTokenPayload.token);
        } else {
          tokenData = null;
        }
        response = APIResponseHandler.successResponse("Success", tokenData);
      } else {
        response = APIResponseHandler.badRequestResponse(
          "Unable to decode payload."
        );
      }
    }
  } catch (error) {
    console.log("POST verifyToken | exception | ", String(error));
    response = APIResponseHandler.internalServerErrorResponse(String(error));
  }
  console.log(
    "POST verifyToken | responseReturned | ",
    JSON.stringify(tokenData)
  );
  return response;
}
