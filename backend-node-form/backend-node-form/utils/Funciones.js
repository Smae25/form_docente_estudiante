import { PDFDocument, rgb } from "pdf-lib";

export const generarPDF = async (datos) => {
  const doc = await PDFDocument.create();
  let page = doc.addPage();
  page.setSize(800, 800);

  const fontSize = 8;
  const lineHeight = 40; // Ajusta este valor según sea necesario
  const additionalWidth = 800; // Ajusta este valor según sea necesario
  //   page = doc.addPage([page.getSize().width + additionalWidth, page.getSize().height]);

  const textOptions = {
    fontSize,
    color: rgb(0, 0, 0),
  };

  const keys = Object.keys(datos);
  const informacionTabla = keys.map((key) => ({
    etiqueta: key.charAt(0).toUpperCase() + key.slice(1),
    valor: datos[key].toString(),
  }));

  // Posición inicial de la tabla
  let x = 20;
  let y = page.getHeight() - 50;

  // Representar la tabla
  //   page = doc.addPage([page.getSize().width + additionalWidth, page.getSize().height]);

  informacionTabla.forEach((fila) => {
    const etiquetaText = `${fila.etiqueta}:`;
    const valorText = fila.valor;

    // Calcular la altura del texto
    const etiquetaHeight = fontSize;
    const valorHeight = fontSize;

    // Verificar si el texto se sale del límite de la página
    if (y - valorHeight < 50) {
      // Agregar una nueva página con ancho aumentado
      page = doc.addPage([
        (page.getSize().width = additionalWidth),
        page.getSize().height,
      ]);
      y = page.getHeight() - 50;
    }

    // Dibujar la etiqueta y el valor en líneas separadas con espacio adicional
    page.drawText(etiquetaText, { x, y, ...textOptions });
    page.drawText(valorText, { x, y: y - lineHeight, ...textOptions });
    const lineY = y - lineHeight - 5; // ajusta el valor según sea necesario
    page.drawLine({
      start: { x: 10, y: lineY },
      end: { x: page.getWidth() - 50, y: lineY },
      color: rgb(0, 0, 0),
    });
    y -= lineHeight + 40;
  });

  const pdfBytes = await doc.save();
  return pdfBytes;
};
