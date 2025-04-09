const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const html_to_pdf = require("html-pdf-node");
const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello From Server...</h1>");
});

app.post("/generate-pdf", async (req, res) => {
  const { pdfHtmlContent } = req.body;

  if (!pdfHtmlContent) {
    return res.status(400).json({ message: "HTML content is required" });
  }

  try {
    const file = { content: pdfHtmlContent };
    const pdfBuffer = await generatePdfAsync(file, {
      format: "A4",
      margin: {
        top: "0.5in",
        bottom: "0.5in",
      },
    });

    res.json({
      pdf: pdfBuffer.toString("base64"),
    });
  } catch (err) {
    console.error("Error generating PDF:", err);
    res
      .status(500)
      .json({ message: "Error generating PDF", error: err.message });
  }
});

const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

function generatePdfAsync(file, options) {
  return new Promise((resolve, reject) => {
    html_to_pdf.generatePdf(file, options, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}

startApp();
