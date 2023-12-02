import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import FormularioService from '../services/FormularioService.js';
import { FormularioCreateRequestModel, FormularioDataResModel } from "../models/FormularioModels.js";
import { generarPDF, template } from "../utils/PdfCreate.js";
import fs from "fs";

const router = Router()

router.get("/find/:id", async (req, res) => {
    try {
        const id = req.params.id;

        // const document = await FormularioService.descargarDocumento(id);
        // return document;
        //res.setHeader('Content-Type', 'application/pdf');
        //res.setHeader('Content-Disposition', 'attachment; filename=documento.pdf');
        const data = await FormularioService.descargarDocumento(id);
        let array = [];
        array.push(data)
       // const documentBuffer = Buffer.from(documentBase64, 'base64');
        console.log(data);
        const templateHTML = template(array);

        generarPDF(templateHTML, (err, response) => {
          if (err) {
            return res.status(500).send(err);
          }
    
          const { filename } = response;
          const fileStream = fs.createReadStream(filename);
    
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
    
          fileStream.pipe(res);
          fileStream.on("end", () => {
            fs.unlinkSync(filename);
          });
        });

        //res.status(200).send(documentBuffer);
    } catch (err) {
        respuestasHttp.error(req, res, 'Error al leer el documento', err, 500);
    }
});

router.get("/obtener", (req, res) => {

    FormularioService.verDocumentos()
    .then(array => {
        respuestasHttp.exito(req, res, array, 200)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible leer los documentos', err, 400)
    })
})

router.post("/crear", (req, res) => {
    FormularioService.crearDocumento(new FormularioCreateRequestModel(req.body))
    .then(document => {
        respuestasHttp.exito(req, res, true, 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible crear el documento', err, 400)
    })
})
router.put("/actualizar/:id", (req, res) => {
    const id = req.params.id;

    FormularioService.actualizar(new FormularioCreateRequestModel(req.body),id)
    .then(document => {
        respuestasHttp.exito(req, res, true, 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible crear el documento', err, 400)
    })
})
router.delete("/eliminar/:id", (req, res) => {
    FormularioService.eliminar(req.params.id)
    .then(document => {
        respuestasHttp.exito(req, res, true, 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible crear el documento', err, 400)
    })
})

export default router