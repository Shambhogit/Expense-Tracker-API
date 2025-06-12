# HTTP Status Codes Cheat Sheet

A concise and essential list of important HTTP status codes, grouped by category. Especially useful for backend and API development.

---

## ✅ 1xx – Informational

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 100  | Continue               | Request received, continue with sending body.             |
| 101  | Switching Protocols    | Server agrees to switch protocols (e.g., WebSockets).     |

---

## ✅ 2xx – Success

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 200  | OK                     | Standard success response.                                |
| 201  | Created                | Resource successfully created (e.g., user registration).  |
| 202  | Accepted               | Request accepted but not yet processed (async ops).       |
| 204  | No Content             | Success with no response body (e.g., delete).             |

---

## ⚠️ 3xx – Redirection

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 301  | Moved Permanently      | Resource moved to a new URL.                              |
| 302  | Found                  | Temporary redirection.                                    |
| 304  | Not Modified           | Cached response is still valid.                           |

---

## ❌ 4xx – Client Errors

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 400  | Bad Request            | Malformed request or invalid data.                        |
| 401  | Unauthorized           | Authentication required or failed.                        |
| 403  | Forbidden              | Authenticated, but not allowed to access.                 |
| 404  | Not Found              | Resource not found.                                       |
| 405  | Method Not Allowed     | HTTP method not supported.                                |
| 409  | Conflict               | Resource conflict (e.g., user/email already exists).      |
| 422  | Unprocessable Entity   | Semantic validation error (invalid format, missing fields).|
| 429  | Too Many Requests      | Rate limit exceeded.                                      |

---

## 🚨 5xx – Server Errors

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 500  | Internal Server Error  | Generic server failure.                                   |
| 501  | Not Implemented        | Server doesn't support requested functionality.           |
| 502  | Bad Gateway            | Invalid response from upstream server.                    |
| 503  | Service Unavailable    | Server is temporarily down or overloaded.                 |
| 504  | Gateway Timeout        | Upstream server didn't respond in time.                   |

---

## 🔥 Most Common in REST APIs

| Code | Meaning                | When to Use                   |
|------|------------------------|-------------------------------|
| 200  | OK                     | GET, Update success           |
| 201  | Created                | POST success                  |
| 204  | No Content             | DELETE success                |
| 400  | Bad Request            | Validation failed             |
| 401  | Unauthorized           | Missing/invalid token         |
| 403  | Forbidden              | Authenticated but not allowed |
| 404  | Not Found              | Resource not found            |
| 409  | Conflict               | Duplicate data                |
| 500  | Internal Server Error  | Unexpected server bug         |

---# HTTP Status Codes Cheat Sheet

A concise and essential list of important HTTP status codes, grouped by category. Especially useful for backend and API development.

---

## ✅ 1xx – Informational

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 100  | Continue               | Request received, continue with sending body.             |
| 101  | Switching Protocols    | Server agrees to switch protocols (e.g., WebSockets).     |

---

## ✅ 2xx – Success

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 200  | OK                     | Standard success response.                                |
| 201  | Created                | Resource successfully created (e.g., user registration).  |
| 202  | Accepted               | Request accepted but not yet processed (async ops).       |
| 204  | No Content             | Success with no response body (e.g., delete).             |

---

## ⚠️ 3xx – Redirection

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 301  | Moved Permanently      | Resource moved to a new URL.                              |
| 302  | Found                  | Temporary redirection.                                    |
| 304  | Not Modified           | Cached response is still valid.                           |

---

## ❌ 4xx – Client Errors

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 400  | Bad Request            | Malformed request or invalid data.                        |
| 401  | Unauthorized           | Authentication required or failed.                        |
| 403  | Forbidden              | Authenticated, but not allowed to access.                 |
| 404  | Not Found              | Resource not found.                                       |
| 405  | Method Not Allowed     | HTTP method not supported.                                |
| 409  | Conflict               | Resource conflict (e.g., user/email already exists).      |
| 422  | Unprocessable Entity   | Semantic validation error (invalid format, missing fields).|
| 429  | Too Many Requests      | Rate limit exceeded.                                      |

---

## 🚨 5xx – Server Errors

| Code | Meaning                | Description                                               |
|------|------------------------|-----------------------------------------------------------|
| 500  | Internal Server Error  | Generic server failure.                                   |
| 501  | Not Implemented        | Server doesn't support requested functionality.           |
| 502  | Bad Gateway            | Invalid response from upstream server.                    |
| 503  | Service Unavailable    | Server is temporarily down or overloaded.                 |
| 504  | Gateway Timeout        | Upstream server didn't respond in time.                   |

---

## 🔥 Most Common in REST APIs

| Code | Meaning                | When to Use                   |
|------|------------------------|-------------------------------|
| 200  | OK                     | GET, Update success           |
| 201  | Created                | POST success                  |
| 204  | No Content             | DELETE success                |
| 400  | Bad Request            | Validation failed             |
| 401  | Unauthorized           | Missing/invalid token         |
| 403  | Forbidden              | Authenticated but not allowed |
| 404  | Not Found              | Resource not found            |
| 409  | Conflict               | Duplicate data                |
| 500  | Internal Server Error  | Unexpected server bug         |

---