import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$utils/server/APISchema";

export async function GET({ request }: RequestEvent) {
  let response: Response = APIResponseHandler.successResponse("App is up !!!");

  return response;
}
