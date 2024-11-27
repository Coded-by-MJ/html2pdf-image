const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const puppeteer = require("puppeteer");
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
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF", error });
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
//  let browser = null;

//  if (process.env.NODE_ENV === "development") {
//    browser = await puppeteerCore.launch({
//      args: ["--no-sandbox", "--disable-setuid-sandbox"],
//      headless: true,
//    });
//  }
//  if (process.env.NODE_ENV === "production") {
//    const executablePath = await chromium.executablePath; // Await the promise here

//    browser = await puppeteerCore.launch({
//      args: chromium.args,
//      defaultViewport: chromium.defaultViewport,
//      executablePath,
//      headless: chromium.headless,
//    });
//  }

//  if (!browser) {
//    throw new Error("Failed to launch the browser.");
//  }
//  const page = await browser.newPage();
//  await page.setContent(pdfHtmlContent, { waitUntil: "networkidle0" });
//  const pdfBuffer = await page.pdf({
//    format: "a4",
//    margin: {
//      top: "0.5in",
//      bottom: "0.5in",
//    },
//  });
//  await browser.close();
//  return pdfBuffer;
