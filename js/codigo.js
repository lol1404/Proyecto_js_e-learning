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
        .querySelector("#mnuListPFC")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuBuscarC")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuListC")
        .addEventListener("click", procesarListadoCategorias);


    // Botones --------------------

    document
    frmAltacategoria.btnAceptarAltaCategoria.addEventListener("click", procesarAltaCategoria)


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
        case "mnuListPFC":
            frmBuscarcategoriaPF.classList.remove("d-none");
            break;
    }
}

function ocultarFormularios() {
    frmAltacategoria.classList.add("d-none");

    frmBuscarcategoria.classList.add("d-none");

    listados.classList.add("d-none");

    frmBuscarcategoriaPF.classList.add("d-none");
}

async function procesarListadoCategorias() {
    // Obtener el listado de componentes
    let respuesta = await oEmpresa.listadoCategoria();

    ocultarFormularios();
    listados.classList.remove("d-none");

    let listado = '<table class="table table-striped">';
    listado +=
        "<thead><tr><th>IDCategorias</th><th>NOMBRE</th><th>DESCRIPCION</th><th>ORDEN</th><th>FECHA_CREACION</th><th>ACTIVA</th><th>DIFICULTAD</th></tr></thead>";
    listado += "<tbody>";

    for (let fila of respuesta.datos) {
        listado += "<tr><td>" + fila.id + "</td>";
        listado += "<td>" + fila.nombre + "</td>";
        listado += "<td>" + fila.descripcion + "</td>";
        listado += "<td>" + fila.orden + "</td>";
        listado += "<td>" + fila.activa + "</td>";
        listado += "<td>" + fila.fecha_creacion + "</td>";
        listado += "<td>" + fila.dificultad_id + "</td></tr>";

    }

    listado += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listados").innerHTML = listado;
}

async function procesarAltaCategoria() {
    if (validarAltaCategoria()) {
        let nombre = frmAltacategoria.txtNombre.value.trim();
        let descripcion = frmAltacategoria.txtDescripcion.value.trim();
        let orden = parseInt(frmAltacategoria.intorden.value);
        let dificultad = parseInt(frmAltacategoria.lstDificultades.value);
        let activa = frmAltacategoria.activa.checked
        let fecha = new Date().toLocaleDateString("sv-SE");

        let respuesta = await oEmpresa.altaCategoria(new Categoria(null,
            nombre,
            descripcion,
            dificultad,
            orden,
            activa,
            fecha));

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            // Si NO hay error
            //Resetear formulario
            frmAltaTipo.reset();
            // Ocultar el formulario
            frmAltaTipo.classList.add("d-none");
        }
    }
}

function validarAltaCategoria() {
    let nombre = frmAltacategoria.txtNombre.value.trim();
    let descripcion = frmAltacategoria.txtDescripcion.value.trim();
    let valido = true;
    let errores = "";

    if (nombre.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

async function actualizarDesplegableDificultad(idCategoria) {
  let respuesta = await oEmpresa.getDificultad();
  let options = "";

  for (let dificultad of respuesta.datos) {
    if (idCategoria && idCategoria == dificultad.id) {
      // Si llega el parámetro ( != undefined )
      options +=
        "<option selected value='" +
        dificultad.id +
        "' >" +
        dificultad.nombre +
        "</option>";
    } else {
      options +=
        "<option value='" + dificultad.id + "' >" + dificultad.nombre + "</option>";
    }
  }
  // Agrego los options generados a partir del contenido de la BD en todos los desplegables
  frmAltacategoria.lstDificultades.innerHTML = options;
}