import crypto from "crypto";
import bcrypt from "bcrypt";
import FormularioRepositorio from "../db/repositorios/FormularioRepositorio.js";
import { generarPDF } from "../utils/Funciones.js";
import { PDFDocument, rgb } from 'pdf-lib';

const verDocumentos = () => {
    return new Promise((resolver, rechazar) => {
        resolver(FormularioRepositorio.verDocumentos())
    })
}

const descargarDocumento = async (id) => {
    try {
        const document = await FormularioRepositorio.findById(id);

        if (document == null) {
            throw new Error('No se ha encontrado el documento');
        }

        return document;
        return await generarPDF(document);
        // return pdfBytes;
    } catch (error) {
        throw new Error(error.message);
    }
};


const crearDocumento = (documento) => {
    return new Promise(async (resolver, rechazar) => {
        try {
            const nuevoDocumento = await FormularioRepositorio.crearDocumento(documento);
            resolver(nuevoDocumento);
        } catch (error) {
            rechazar(error.message);
        }
    });
};

const actualizar = (documento, id) => {
    return new Promise(async (resolver, rechazar) => {
        try {
            const nuevoDocumento = await FormularioRepositorio.actualizar(documento,id);
            resolver(nuevoDocumento);
        } catch (error) {
            rechazar(error.message);
        }
    });
};
const eliminar = (id) => {
    return new Promise(async (resolver, rechazar) => {
        try {
            const nuevoDocumento = await FormularioRepositorio.eliminar(id);
            resolver(nuevoDocumento);
        } catch (error) {
            rechazar(error.message);
        }
    });
};


export default {descargarDocumento, verDocumentos, crearDocumento, actualizar,eliminar}