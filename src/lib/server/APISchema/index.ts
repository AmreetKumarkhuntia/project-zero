import type { StatusEnum, APIResponse } from '$generated/types';

/**
 * Class for handling API responses, including status, message, data, and code.
 * Provides methods to build and format responses for various statuses.
 */
export class APIResponseHandler {
  private status: StatusEnum | null = null;
  private message: string | null = null;
  private data: unknown = null;
  private code: number | null = null;

  /**
   * ^ Sets the status for the API response.
   * @param status The status of the response (e.g., "success", "unauthorized").
   * @returns The current instance for method chaining.
   */
  setStatus(status: StatusEnum): this {
    this.status = status;
    return this;
  }

  /**
   * ^ Sets the message for the API response.
   * @param message The message to be included in the response.
   * @returns The current instance for method chaining.
   */
  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  /**
   * ^ Sets the data for the API response.
   * @param data The data to be included in the response (can be null).
   * @returns The current instance for method chaining.
   */
  setData(data: unknown): this {
    this.data = data;
    return this;
  }

  /**
   * ^ Sets the HTTP code for the API response.
   * @param code The HTTP status code to be included in the response (e.g., 200, 404).
   * @returns The current instance for method chaining.
   */
  setCode(code: number): this {
    this.code = code;
    return this;
  }

  /**
   * ^ Builds the API response object using the provided properties.
   *
   * Steps:
   * 1. Check if the required properties (status, message, and code) are set.
   * 2. If any of the required properties are missing, throw an error.
   * 3. Create an APIResponse object with the status, message, data, and code.
   * 4. Return the built APIResponse object.
   *
   * @returns The built APIResponse object.
   */
  build() {
    if (!this.status || !this.message || !this.code) {
      throw new Error(
        'Status, message, and code are required to build an ApiResponse.'
      );
    }

    const response: APIResponse = {
      status: this.status,
      message: this.message,
      data: this.data,
      code: this.code ?? 400,
    };

    return response;
  }

  /**
   * ^ Builds a successful API response.
   *
   * Steps:
   * 1. Create a new instance of APIResponseHandler.
   * 2. Set the status to "success".
   * 3. Set the message, data (optional), and code (default to 200).
   * 4. Call build() to return the response object.
   *
   * @param message The message for the response.
   * @param data The optional data for the response (default is null).
   * @param code The HTTP status code (default is 200).
   * @returns The formatted successful API response.
   */
  static successResponse(
    message: string,
    data: unknown | null = null,
    code: number = 200
  ) {
    return new APIResponseHandler()
      .setStatus('success')
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  /**
   * ^ Builds an unauthorized API response.
   *
   * Steps:
   * 1. Create a new instance of APIResponseHandler.
   * 2. Set the status to "unauthorized".
   * 3. Set the message, data (optional), and code (default to 401).
   * 4. Call build() to return the response object.
   *
   * @param message The message for the response.
   * @param data The optional data for the response (default is null).
   * @param code The HTTP status code (default is 401).
   * @returns The formatted unauthorized API response.
   */
  static unauthorizedResponse(
    message: string,
    data: unknown = null,
    code: number = 401
  ) {
    // Step 1-4: Return an unauthorized formatted response
    return new APIResponseHandler()
      .setStatus('unauthorized')
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  /**
   * ^ Builds a not found API response.
   *
   * Steps:
   * 1. Create a new instance of APIResponseHandler.
   * 2. Set the status to "not_found".
   * 3. Set the message, data (optional), and code (default to 404).
   * 4. Call build() to return the response object.
   *
   * @param message The message for the response.
   * @param data The optional data for the response (default is null).
   * @param code The HTTP status code (default is 404).
   * @returns The formatted not found API response.
   */
  static notFoundResponse(
    message: string,
    data: unknown = null,
    code: number = 404
  ) {
    // Step 1-4: Return a not found formatted response
    return new APIResponseHandler()
      .setStatus('not_found')
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  /**
   * ^ Builds a bad request API response.
   *
   * Steps:
   * 1. Create a new instance of APIResponseHandler.
   * 2. Set the status to "bad_request".
   * 3. Set the message, data (optional), and code (default to 400).
   * 4. Call build() to return the response object.
   *
   * @param message The message for the response.
   * @param data The optional data for the response (default is null).
   * @param code The HTTP status code (default is 400).
   * @returns The formatted bad request API response.
   */
  static badRequestResponse(
    message: string,
    data: unknown = null,
    code: number = 400
  ) {
    // Step 1-4: Return a bad request formatted response
    return new APIResponseHandler()
      .setStatus('bad_request')
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  /**
   * ^ Builds an internal server error API response.
   *
   * Steps:
   * 1. Create a new instance of APIResponseHandler.
   * 2. Set the status to "internal_server_error".
   * 3. Set the message, data (optional), and code (default to 500).
   * 4. Call build() to return the response object.
   *
   * @param message The message for the response.
   * @param data The optional data for the response (default is null).
   * @param code The HTTP status code (default is 500).
   * @returns The formatted internal server error API response.
   */
  static internalServerErrorResponse(
    message: string,
    data: unknown = null,
    code: number = 500
  ) {
    // Step 1-4: Return an internal server error formatted response
    return new APIResponseHandler()
      .setStatus('internal_server_error')
      .setMessage(message)
      .setData(data)
      .setCode(code)
      .build();
  }

  /**
   * ^ Converts the API response into a Response object for HTTP responses.
   *
   * Steps:
   * 1. Convert the APIResponse object to a JSON string.
   * 2. Return a new Response object with the JSON string as the body and the appropriate status code.
   * 3. Attaches headers if none is provided adds default headers
   *
   * @param response The APIResponse to convert.
   * @returns A Response object.
   * TODO : add redirects and other possible options here
   */
  static toResponse(
    response: APIResponse,
    headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
  ) {
    //TODO : add other response codes here
    if (response.code === 200 || response.code === 201) {
      return new Response(JSON.stringify(response.data ?? {}), {
        status: response.code,
        headers: headers,
      });
    } else {
      return new Response(JSON.stringify(response), {
        status: response.code,
        headers: headers,
      });
    }
  }
}
