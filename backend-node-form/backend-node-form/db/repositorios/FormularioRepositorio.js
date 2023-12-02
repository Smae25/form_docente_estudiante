import {
  FormularioCreateRequestModel,
  FormularioDataResModel,
} from "../../models/FormularioModels.js";
import { conexion } from "../connection/dbConection.js";

const crearDocumento = async (formulario) => {
  const con = conexion();
  const query =
    "INSERT INTO `formulario` (`acta_No`, `grupo_o_modalidad`, `semestre_al_que_pertenece`, `fecha`, `programa`, `asignatura`, `docente`, `nivel_de_formacion`, `horario_entrada`, `inicio_de_la_clase`, `finalizacion_de_la_clase`, `presentacion_personal`, `conservacion_del_orden_y_el_aseo_en_el_aula_de_clase`, `microcurriculo`, `planeacion_academica_semestral`, `guias_de_aprendizaje`, `rol_del_docente`, `rol_del_estudiante`, `calidad_de_los_trabajos_individuales_o_de_grupo`, `proyectos_pedagogicos_de_aula`, `evaluacion_del_aprendizaje`, `credito_academico`, `evaluacion_del_docente`, `servicios_de_permanencia_academica_de_bienestar`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const result = con.query(query, [
      formulario.acta_No,
      formulario.grupo_o_modalidad,
      formulario.semestre_al_que_pertenece,
      formulario.fecha,
      formulario.programa,
      formulario.asignatura,
      formulario.docente,
      formulario.nivel_de_formacion,
      formulario.horario_entrada,
      formulario.inicio_de_la_clase,
      formulario.finalizacion_de_la_clase,
      formulario.presentacion_personal,
      formulario.conservacion_del_orden_y_el_aseo_en_el_aula_de_clase,
      formulario.microcurriculo,
      formulario.planeacion_academica_semestral,
      formulario.guias_de_aprendizaje,
      formulario.rol_del_docente,
      formulario.rol_del_estudiante,
      formulario.calidad_de_los_trabajos_individuales_o_de_grupo,
      formulario.proyectos_pedagogicos_de_aula,
      formulario.evaluacion_del_aprendizaje,
      formulario.credito_academico,
      formulario.evaluacion_del_docente,
      formulario.servicios_de_permanencia_academica_de_bienestar,
    ]);

    return true;
  } catch (err) {
    console.error("Error al insertar documento:", err);
    throw err;
  } finally {
    con.end();
  }
};

const actualizar = async (formulario, id) => {
  const con = conexion();
  const query =
    "UPDATE `formulario` SET `grupo_o_modalidad`=?, `semestre_al_que_pertenece`=?, `fecha`=?, `programa`=?, `asignatura`=?, `docente`=?, `nivel_de_formacion`=?, `horario_entrada`=?, `inicio_de_la_clase`=?, `finalizacion_de_la_clase`=?, `presentacion_personal`=?, `conservacion_del_orden_y_el_aseo_en_el_aula_de_clase`=?, `microcurriculo`=?, `planeacion_academica_semestral`=?, `guias_de_aprendizaje`=?, `rol_del_docente`=?, `rol_del_estudiante`=?, `calidad_de_los_trabajos_individuales_o_de_grupo`=?, `proyectos_pedagogicos_de_aula`=?, `evaluacion_del_aprendizaje`=?, `credito_academico`=?, `evaluacion_del_docente`=?, `servicios_de_permanencia_academica_de_bienestar`=? WHERE `id_formulario`=? ";

  try {
    const result = con.query(query, [
      formulario.grupo_o_modalidad,
      formulario.semestre_al_que_pertenece,
      formulario.fecha,
      formulario.programa,
      formulario.asignatura,
      formulario.docente,
      formulario.nivel_de_formacion,
      formulario.horario_entrada,
      formulario.inicio_de_la_clase,
      formulario.finalizacion_de_la_clase,
      formulario.presentacion_personal,
      formulario.conservacion_del_orden_y_el_aseo_en_el_aula_de_clase,
      formulario.microcurriculo,
      formulario.planeacion_academica_semestral,
      formulario.guias_de_aprendizaje,
      formulario.rol_del_docente,
      formulario.rol_del_estudiante,
      formulario.calidad_de_los_trabajos_individuales_o_de_grupo,
      formulario.proyectos_pedagogicos_de_aula,
      formulario.evaluacion_del_aprendizaje,
      formulario.credito_academico,
      formulario.evaluacion_del_docente,
      formulario.servicios_de_permanencia_academica_de_bienestar,
      id,
    ]);

    return true;
  } catch (err) {
    console.error("Error al actualizar documento:", err);
    throw err;
  } finally {
    con.end();
  }
};

const verDocumentos = () => {
  return new Promise((resolve, reject) => {
    const con = conexion();

    con.query("SELECT * FROM formulario", async (error, result) => {
      if (error) {
        console.error("Error al obtener documentos:", error);
        con.end();
        reject(error);
        return;
      }

      const obtenerDocumentos = () => {
        return new Promise((resolve, reject) => {
          const documentosPromesas = result.map(async (documentoRow) => {
            try {
              const documento = new FormularioCreateRequestModel(documentoRow);
              return documento; // Return the document instead of resolving here
            } catch (error) {
              reject(error);
            }
          });

          // Wait for all promises to settle and then resolve
          Promise.all(documentosPromesas)
            .then((documentos) => resolve(documentos))
            .catch((error) => reject(error));
        });
      };

      obtenerDocumentos()
        .then((documentos) => {
          con.end();
          resolve(documentos);
        })
        .catch((error) => {
          con.end();
          reject(error);
        });
    });
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const con = conexion();

    con.query(
      "SELECT * FROM formulario WHERE acta_No = ?",
      [id],
      async (error, result) => {
        if (error) {
          console.error("Error al obtener documentos:", error);
          con.end();
          reject(error);
          return;
        }

        const obtenerDocumentos = () => {
          return new Promise((resolve, reject) => {
            const documentos = [];

            const documentosPromesas = result.map(async (documentoRow) => {
              try {
                const documento = new FormularioCreateRequestModel(
                  documentoRow
                );
                resolve(documento);
              } catch (error) {
                reject(error);
              }
            });

            Promise.all(documentosPromesas)
              .then((documentos) => resolve(documentos))
              .catch((error) => reject(error));
          });
        };

        obtenerDocumentos()
          .then((documentos) => {
            con.end();
            resolve(documentos);
            console.log(documentos);
          })
          .catch((error) => {
            con.end();
            reject(error);
          });
      }
    );
  });
};

const eliminar = async (id_formulario) => {
  const con = conexion();
  const query = "DELETE FROM `formulario` WHERE `id_formulario`=?";

  try {
    const result = con.query(query, [id_formulario]);
    return true;
  } catch (err) {
    console.error("Error al eliminar documento:", err);
    throw err;
  } finally {
    con.end();
  }
};

export default {
  crearDocumento,
  verDocumentos,
  findById,
  actualizar,
  eliminar,
};
