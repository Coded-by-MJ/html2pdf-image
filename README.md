# HTML2PDF API

## Overview

The HTML2PDF API allows you to generate both a PDF from an HTML content input. This service can be utilized for converting any HTML to a PDF file. The conversion is powered by a combination of HTML to PDF generation conversion techniques.

### Live API Link: [https://html2pdf-q60u.onrender.com/generate-pdf](https://html2pdf-q60u.onrender.com/generate-pdf)

## Features

- **Generate PDF**: Converts HTML content to a PDF document.
- **Base64 Response**: The PDF is returned as base64-encoded string.

## Installation

This API is hosted and doesn't require any installation to use. You simply need to make HTTP requests to the live API endpoint.

If you want to use the API in your Node.js projects or any HTTP client, you can call it directly.

## API Endpoint

### `POST /generate-pdf`

- **Request URL**: `https://html2pdf-q60u.onrender.com/generate-pdf`
- **Method**: POST
- **Content-Type**: `application/json`
- **Request Body**:
  - `pdfHtmlContent`: The HTML content you want to convert to a PDF.

#### Request Example

```json
{
  "pdfHtmlContent": "<h1>Hello World</h1><p>This is a sample PDF content</p>"
}
```

### Response

The API will return a JSON object with two fields:

- **pdf**: The base64-encoded string of the generated PDF.

#### Response Example

```json
{
  "pdf": "base64-encoded-pdf-data"
}
```

## Usage Example

You can use `Postman`, `curl`, or any HTTP client to interact with the API. Here's an example using `curl`:

```bash
curl -X POST https://html2pdf-q60u.onrender.com/generate-pdf   -H "Content-Type: application/json"   -d '{
    "pdfHtmlContent": "<h1>Sample HTML content</h1><p>Converted to PDF and image.</p>"
  }'
```

### Node.js Example

Here's how you can interact with the API using `axios` in a Node.js environment:

```javascript
const axios = require("axios");

const generatePdf = async () => {
  try {
    const response = await axios.post(
      "https://html2pdf-q60u.onrender.com/generate-pdf",
      {
        pdfHtmlContent:
          "<h1>Sample HTML content</h1><p>Converted to PDF and image.</p>",
      }
    );

    console.log("PDF Base64:", response.data.pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

generatePdf();
```

## Error Handling

The API will respond with appropriate error messages in case of issues, such as:

- **400 Bad Request**: If no HTML content is provided.
- **500 Internal Server Error**: If there is an error in generating the PDF.

Example error response:

```json
{
  "message": "Error generating PDF",
  "error": "Some error details"
}
```

## License

This API is a custom service for HTML to PDF. It is free to use for both personal and commercial use.
