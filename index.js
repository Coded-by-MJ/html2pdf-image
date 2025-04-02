const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const html_to_pdf = require("html-pdf-node");
const pdfPoppler = require("pdf-poppler");
const fs = require("fs");
const path = require("path");
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

app.post("/generate-pdf-image", async (req, res) => {
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

    // // TEMP FILE PATHS
    // const pdfPath = path.join(__dirname, "temp.pdf");
    // const outputImagePath = path.join(__dirname, "output.png");

    // // Write PDF buffer to a temporary file (needed for pdf-poppler)
    // fs.writeFileSync(pdfPath, pdfBuffer);

    // await convertPdfToImage(pdfPath, outputImagePath);

    // const imagePath = path.join(__dirname, "output-1.png"); // Correct image path
    // const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

    // Cleanup temp files
    // fs.unlinkSync(pdfPath);
    // fs.unlinkSync(imagePath);

    res.json({
      pdf: pdfBuffer.toString("base64"),
      image: "",
    });
  } catch (err) {
    console.error("Error generating PDF & Image:", err);
    res
      .status(500)
      .json({ message: "Error generating PDF & Image", error: err.message });
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

async function convertPdfToImage(pdfPath, outputImagePath) {
  const options = {
    format: "png",
    out_dir: path.dirname(outputImagePath),
    out_prefix: path.basename(outputImagePath, path.extname(outputImagePath)),
    page: 1, // Convert only the first page
  };
  return new Promise((resolve, reject) => {
    pdfPoppler
      .convert(pdfPath, options)
      .then(() => {
        resolve(
          path.join(
            path.dirname(outputImagePath),
            `${path.basename(
              outputImagePath,
              path.extname(outputImagePath)
            )}-1.png`
          )
        );
      })
      .catch((err) => {
        reject(err); // Reject if an error occurs during conversion
      });
  });
}

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
