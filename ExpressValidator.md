# express-validator Doc

A quick reference for commonly used validation and sanitization functions from [express-validator](https://express-validator.github.io/docs/).

---

## 🔤 String Validation

| Function                       | Description                                               |
|---------------------------------|-----------------------------------------------------------|
| `.notEmpty()`                   | Checks that the field is not empty.                       |
| `.isLength({ min, max })`       | Checks the string length is within range.                 |
| `.isAlphanumeric()`             | Checks if the string contains only letters and numbers.   |
| `.isAlpha()`                    | Checks if the string contains only letters.               |
| `.isLowercase()`                | Checks if the string is in lowercase.                     |
| `.isUppercase()`                | Checks if the string is in uppercase.                     |
| `.isIn([...])`                  | Checks if the value is in the given array.                |
| `.equals(value)`                | Checks if the value equals the given value.               |
| `.contains(value)`              | Checks if the string contains the given substring.        |
| `.matches(regex)`               | Checks if the string matches a regex.                     |

---

## 📧 Email & URL

| Function             | Description                                 |
|----------------------|---------------------------------------------|
| `.isEmail()`         | Validates if the string is a valid email.   |
| `.normalizeEmail()`  | Normalizes the email (e.g., Gmail dots).    |
| `.isURL()`           | Validates if the string is a valid URL.     |

---

## 📱 Phone, Mobile, UUID

| Function             | Description                                 |
|----------------------|---------------------------------------------|
| `.isMobilePhone()`   | Validates if the string is a valid mobile number. |
| `.isUUID()`          | Checks if the value is a valid UUID.        |

---

## 🔒 Password/Security

| Function             | Description                                 |
|----------------------|---------------------------------------------|
| `.isStrongPassword()`| Checks for a strong password (uppercase, lowercase, symbol, number). |
| `.isHexadecimal()`   | Validates if the string is a valid hexadecimal. |
| `.isBase64()`        | Validates if the string is valid Base64 format. |

---

## 🔢 Number/Int/Float

| Function                   | Description                                         |
|----------------------------|-----------------------------------------------------|
| `.isInt({ min, max })`     | Checks if the value is an integer, optionally within range. |
| `.isFloat({ min, max })`   | Checks if the value is a float, optionally within range.    |
| `.isNumeric()`             | Checks if the value contains only numeric characters.       |
| `.isDecimal()`             | Checks if the string is a decimal number.                  |

---

## 📅 Date/Time

| Function         | Description                                 |
|------------------|---------------------------------------------|
| `.isDate()`      | Checks if the value is a valid date.        |
| `.isISO8601()`   | Checks if the value is a valid ISO date string. |

---

## 🧹 Sanitization Methods

| Function         | Description                                 |
|------------------|---------------------------------------------|
| `.trim()`        | Removes leading and trailing whitespace.    |
| `.escape()`      | Escapes HTML characters (`<`, `>`, etc.).   |
| `.toLowerCase()` | Converts string to lowercase.               |
| `.toUpperCase()` | Converts string to uppercase.               |
| `.toInt()`       | Converts string to integer.                 |
| `.toFloat()`     | Converts string to float.                   |

---

## 💡 Bonus: Error Handling

| Function             | Description                                 |
|----------------------|---------------------------------------------|
| `.withMessage(msg)`  | Custom error message for failed validation. |

---

## ✅ Example

```js
body('email')
  .trim()
  .isEmail().withMessage('Invalid email')
  .normalizeEmail();
```