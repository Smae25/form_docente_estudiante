import pdf from "html-pdf";
import fs from "fs";

export const generarPDF = (htmlContent, callback) => {
  const options = { format: "Letter" };
  pdf.create(htmlContent, options).toFile(callback);
};

export const template = (documento) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid #ccc;
          padding: 15px;
          text-align: left;
        }

        th {
          background-color: #f2f2f2;
        }

        h4 {
          color: #333;
          margin-top: 0;
        }
      </style>
      <title>documento</title>
    </head>
    <body>
      <table>
        ${documento.map((doc) => {
          const properties = Object.keys(doc);
          return `
              ${properties.map((prop) => `<h4>${doc[prop]}</h4><hr></hr>`).join('')}
          `;
        }).join('')}
      </table>
    </body>
    </html>
  `;
};
