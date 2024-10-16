import {
  type StatusEnum,
  type APIResponseData,
  type APIResponse,
} from "$generated/types";

export class APIResponseHandler {
  private status: StatusEnum | null = null;
  private message: string | null = null;
  private data: APIResponseData | null = null;
  private code: number | null = null;

  setStatus(status: StatusEnum): this {
    this.status = status;
    return this;
  }

  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  setData(data: APIResponseData | null): this {
    this.data = data;
    return this;
  }

  setCode(code: number): this {
    this.code = code;
    return this;
  }

  build() {
    if (!this.status || !this.message || !this.code) {
      throw new Error(
        "Status, message, and code are required to build an ApiResponse."
      );
    }
    const response: APIResponse = {
      status: this.status,
      message: this.message,
      data: this.data,
    };
    const my = new Response(JSON.stringify(response), {
      status: this.code,
    });
    return my;
  }

  static successResponse(
    message: string,
    data: APIResponseData | null = null,
    code: number = 200
  ) {
    return new APIResponseHandler()
      .setStatus("success")
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  static unauthorizedResponse(
    message: string,
    data: APIResponseData | null = null,
    code: number = 401
  ) {
    return new APIResponseHandler()
      .setStatus("unauthorized")
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  static notFoundResponse(
    message: string,
    data: APIResponseData | null = null,
    code: number = 404
  ) {
    return new APIResponseHandler()
      .setStatus("not_found")
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  static badRequestResponse(
    message: string,
    data: APIResponseData | null = null,
    code: number = 400
  ) {
    return new APIResponseHandler()
      .setStatus("bad_request")
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  static internalServerErrorResponse(
    message: string,
    data: APIResponseData | null = null,
    code: number = 500
  ) {
    return new APIResponseHandler()
      .setStatus("internal_server_error")
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }
}
