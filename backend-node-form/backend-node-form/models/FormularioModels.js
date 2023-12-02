class FormularioCreateRequestModel {
    constructor(formulario) {
        this.acta_No = formulario.acta_No;
        this.grupo_o_modalidad = formulario.grupo_o_modalidad;
        this.semestre_al_que_pertenece = formulario.semestre_al_que_pertenece;
        this.fecha = formulario.fecha;
        this.programa = formulario.programa;
        this.asignatura = formulario.asignatura;
        this.docente = formulario.docente;
        this.nivel_de_formacion = formulario.nivel_de_formacion;
        this.horario_entrada = formulario.horario_entrada;
        this.inicio_de_la_clase = formulario.inicio_de_la_clase;
        this.finalizacion_de_la_clase = formulario.finalizacion_de_la_clase;
        this.presentacion_personal = formulario.presentacion_personal;
        this.conservacion_del_orden_y_el_aseo_en_el_aula_de_clase = formulario.conservacion_del_orden_y_el_aseo_en_el_aula_de_clase;
        this.microcurriculo = formulario.microcurriculo;
        this.planeacion_academica_semestral = formulario.planeacion_academica_semestral;
        this.guias_de_aprendizaje = formulario.guias_de_aprendizaje;
        this.rol_del_docente = formulario.rol_del_docente;
        this.rol_del_estudiante = formulario.rol_del_estudiante;
        this.calidad_de_los_trabajos_individuales_o_de_grupo = formulario.calidad_de_los_trabajos_individuales_o_de_grupo;
        this.proyectos_pedagogicos_de_aula = formulario.proyectos_pedagogicos_de_aula;
        this.evaluacion_del_aprendizaje = formulario.evaluacion_del_aprendizaje;
        this.credito_academico = formulario.credito_academico;
        this.evaluacion_del_docente = formulario.evaluacion_del_docente;
        this.servicios_de_permanencia_academica_de_bienestar = formulario.servicios_de_permanencia_academica_de_bienestar;
    }
}

class FormularioDataResModel {
    constructor(document) {
        this.document = document
    }
}

export {FormularioCreateRequestModel, FormularioDataResModel}