"use strict";

registrarEventos();

var oEmpresa = new Empresa();


function registrarEventos() {
    document
        .querySelector("#limpiar")
        .addEventListener("click", ocultarFormularios);

    // dropdown --------------------
    document
        .querySelector("#mnuAltaC")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuBuscarC")
        .addEventListener("click", procesarListadoCategorias);

}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaC":
            frmAltacategoria.classList.remove("d-none");
            break;
        case "mnuBuscarC":
            frmBuscarcategoria.classList.remove("d-none");
            break;
    }
}

function ocultarFormularios() {
    frmAltacategoria.classList.add("d-none");

    frmBuscarcategoria.classList.add("d-none");

}

async function procesarListadoCategorias() {
    // Obtener el listado de componentes
    let respuesta = await oEmpresa.listadoCategoria();

    let listado = '<table class="table table-striped">';
    listado +=
        "<thead><tr><th>IDCategorias</th><th>NOMBRE</th><th>DESCRIPCION</th><th>ORDEN</th><th>FECHA_CREACION</th><th>ACTIVA</th><th>DIFICULTAD</th><th>ACCIONES</th></tr></thead>";
    listado += "<tbody>";

    for (let fila of respuesta.datos) {
        listado += "<tr><td>" + tipo.id + "</td>";
        listado += "<td>" + tipo.nombre + "</td>";
        listado += "<td>" + tipo.descripcion + "</td></tr>";
        listado += "<td>" + tipo.dificultad_id + "</td></tr>";
        listado += "<td>" + tipo.orden + "</td></tr>";
        listado += "<td>" + tipo.activa + "</td></tr>";
        listado += "<td>" + tipo.fecha_creacion + "</td></tr>";
    }

    listado += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listados").innerHTML = listado;
}