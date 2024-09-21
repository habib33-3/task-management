/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable no-unused-vars */

enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    UPDATED = 204,
    DELETED = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export default HttpStatusCode;
