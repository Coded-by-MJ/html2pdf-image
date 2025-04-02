# HTML2PDF-Image API

## Overview

The HTML2PDF-Image API allows you to generate both a PDF and an image (PNG format) from an HTML content input. This service can be utilized for converting any HTML to a PDF file and generating an image of the first page of the PDF. The conversion is powered by a combination of HTML to PDF generation and PDF to image conversion techniques.

### Live API Link: [https://html2pdf-q60u.onrender.com/generate-pdf-image](https://html2pdf-q60u.onrender.com/generate-pdf-image)

## Features

- **Generate PDF**: Converts HTML content to a PDF document.
- **Generate Image**: Converts the first page of the generated PDF to an image in PNG format.
- **Base64 Response**: Both the PDF and the image are returned as base64-encoded strings.

## Installation

This API is hosted and doesn't require any installation to use. You simply need to make HTTP requests to the live API endpoint.

If you want to use the API in your Node.js projects or any HTTP client, you can call it directly.

## API Endpoint

### `POST /generate-pdf-image`

- **Request URL**: `https://html2pdf-q60u.onrender.com/generate-pdf-image`
- **Method**: POST
- **Content-Type**: `application/json`
- **Request Body**:
  - `pdfHtmlContent`: The HTML content you want to convert to a PDF and an image.

#### Request Example

```json
{
  "pdfHtmlContent": "<h1>Hello World</h1><p>This is a sample PDF content</p>"
}
```

### Response

The API will return a JSON object with two fields:

- **pdf**: The base64-encoded string of the generated PDF.
- **image**: The base64-encoded string of the generated image (first page of the PDF).

#### Response Example

```json
{
  "pdf": "base64-encoded-pdf-data",
  "image": "base64-encoded-image-data"
}
```

## Usage Example

You can use `Postman`, `curl`, or any HTTP client to interact with the API. Here's an example using `curl`:

```bash
curl -X POST https://html2pdf-q60u.onrender.com/generate-pdf-image   -H "Content-Type: application/json"   -d '{
    "pdfHtmlContent": "<h1>Sample HTML content</h1><p>Converted to PDF and image.</p>"
  }'
```

### Node.js Example

Here's how you can interact with the API using `axios` in a Node.js environment:

```javascript
const axios = require("axios");

const generatePdfAndImage = async () => {
  try {
    const response = await axios.post(
      "https://html2pdf-q60u.onrender.com/generate-pdf-image",
      {
        pdfHtmlContent:
          "<h1>Sample HTML content</h1><p>Converted to PDF and image.</p>",
      }
    );

    console.log("PDF Base64:", response.data.pdf);
    console.log("Image Base64:", response.data.image);
  } catch (error) {
    console.error("Error generating PDF and Image:", error);
  }
};

generatePdfAndImage();
```

## Error Handling

The API will respond with appropriate error messages in case of issues, such as:

- **400 Bad Request**: If no HTML content is provided.
- **500 Internal Server Error**: If there is an error in generating the PDF or image.

Example error response:

```json
{
  "message": "Error generating PDF & Image",
  "error": "Some error details"
}
```

## License

This API is a custom service for HTML to PDF and Image conversion. It is free to use for both personal and commercial use.
