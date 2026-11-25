"use strict";



var oEmpresa = new Empresa();

registrarEventos();


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



    // Cursos ---------------------
    document
        .querySelector("#mnuAltaCurso")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuBuscarCurso")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuListadoCursoCategoria")
        .addEventListener("click", mostrarFormulario);

    //document
      //  .querySelector("#mnuListadoCurso")
        //.addEventListener("click", procesarListadoCursos);

    // Botones --------------------

    document
    frmAltacategoria.btnAceptarAltaCategoria.addEventListener("click", procesarAltaCategoria)

    document
    frmBuscarcategoria.btnAceptarBuscarCategoria.addEventListener("click", () => procesarBuscarCategorias(false))

    document
    frmBuscarcategoriaPF.btnBuscar.addEventListener("click", () => procesarBuscarCategorias(true))

    document
        .querySelector("#listados")
        .addEventListener("click", procesarAccionTabla);


    // Botones cursos -------------------


}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaC":
            frmAltacategoria.reset();
            frmAltacategoria.txtIdCategoria.value = "";
            frmAltacategoria.querySelector("legend").textContent = "Alta de categoría";
            frmAltacategoria.btnAceptarAltaCategoria.value = "Aceptar";
            frmAltacategoria.classList.remove("d-none");
            actualizarDesplegableDificultad(undefined)
            break;
        case "mnuBuscarC":
            frmBuscarcategoria.classList.remove("d-none");
            break;
        case "mnuListPFC":
            frmBuscarcategoriaPF.classList.remove("d-none");
            break;
        case "mnuAltaCurso":
            frmAltaCurso.classList.remove("d-none");
            actualizarDesplegableCategoria(undefined);
            break;
        case "mnuBuscarCurso":
            frmBuscarcurso.classList.remove("d-none");
            break;
        case "mnuListadoCursoCategoria":
            frmBuscarcursocategoria.classList.remove("d-none");
            actualizarDesplegableCategoria(undefined);
            break;
    }
}

function ocultarFormularios() {
    frmAltacategoria.classList.add("d-none");

    frmBuscarcategoria.classList.add("d-none");

    listados.classList.add("d-none");

    frmBuscarcategoriaPF.classList.add("d-none");

    frmAltaCurso.classList.add("d-none");

    frmBuscarcurso.classList.add("d-none");

    frmBuscarcursocategoria.classList.add("d-none");
}

async function procesarListadoCategorias() {
    // Obtener el listado de componentes
    let respuesta = await oEmpresa.listadoCategoria();

    ocultarFormularios();
    listados.classList.remove("d-none");

    let listado = '<table class="table table-striped" id="tablaCategorias">';
    listado +=
        "<thead><tr><th>IDCategorias</th><th>NOMBRE</th><th>DESCRIPCION</th><th>ORDEN</th><th>FECHA_CREACION</th><th>ACTIVA</th><th>DIFICULTAD</th><th>ACCION</th></tr></thead>";
    listado += "<tbody>";

    for (let fila of respuesta.datos) {
        listado += "<tr><td>" + fila.id + "</td>";
        listado += "<td>" + fila.nombre + "</td>";
        listado += "<td>" + fila.descripcion + "</td>";
        listado += "<td>" + fila.orden + "</td>";
        listado += "<td>" + fila.fecha_creacion + "</td>";
        if (parseInt(fila.activa) === 1) {
            listado += "<td class='table-success'>SI</td>";
        } else {
            listado += "<td class='table-danger'>NO</td>";
        }

        listado += "<td>" + fila.dificultad + "</td>";

        listado +=
            "<td>" +
            "<button class='btn btn-primary btn-editar' data-categoria='" + JSON.stringify(fila) + "'>" +
            "<i class='bi bi-pencil-square'></i></button> " +
            "<button class='btn btn-danger btn-borrar' data-id='" + fila.id + "'>" +
            "<i class='bi bi-trash'></i></button>" +
            "</td>";

        listado += "</tr>";

    }

    listado += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listados").innerHTML = listado;
}

async function procesarAltaCategoria() {
    if (validarAltaCategoria()) {
        let id = frmAltacategoria.txtIdCategoria.value;
        let nombre = frmAltacategoria.txtNombre.value.trim();
        let descripcion = frmAltacategoria.txtDescripcion.value.trim();
        let orden = parseInt(frmAltacategoria.intorden.value);
        let dificultad = parseInt(frmAltacategoria.lstDificultades.value);
        let activa = frmAltacategoria.activa.checked
        let fecha = new Date().toLocaleDateString("sv-SE");

        let categoria = new Categoria(id || null,
            nombre,
            descripcion,
            dificultad,
            orden,
            activa,
            fecha);

        let respuesta = id
            ? await oEmpresa.actualizarCategoria(categoria)
            : await oEmpresa.altaCategoria(categoria);

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            // Si NO hay error
            //Resetear formulario
            frmAltacategoria.reset();
            frmAltacategoria.txtIdCategoria.value = "";
            frmAltacategoria.querySelector("legend").textContent = "Alta de categoría";
            frmAltacategoria.btnAceptarAltaCategoria.value = "Aceptar";
            // Ocultar el formulario
            frmAltacategoria.classList.add("d-none");
        }
    }
}

function validarAltaCategoria() {
    let nombre = frmAltacategoria.txtNombre.value.trim();
    let descripcion = frmAltacategoria.txtDescripcion.value.trim();
    let orden = Number(frmAltacategoria.intorden.value);
    let dificultad = Number(frmAltacategoria.lstDificultades.value);
    let id = frmAltacategoria.txtIdCategoria.value.trim();
    let errores = [];

    if (!nombre) {
        errores.push("El nombre es obligatorio.");
    } else if (nombre.length > 25) {
        errores.push("El nombre no puede superar los 25 caracteres.");
    }

    if (!descripcion) {
        errores.push("La descripción es obligatoria.");
    }

    if (!Number.isSafeInteger(orden) || orden < 1) {
        errores.push("El orden debe ser un número entero mayor que cero.");
    }

    if (!Number.isSafeInteger(dificultad) || dificultad < 1) {
        errores.push("Selecciona una dificultad válida.");
    }

    if (id && (!/^\\d+$/.test(id) || Number(id) < 1 || !Number.isSafeInteger(Number(id)))) {
        errores.push("El identificador de la categoría no es válido.");
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
        return false;
    }

    return true;
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

async function procesarBuscarCategorias(fecha) {
    let respuesta;

    if (fecha) {
        let fechaABuscar = frmBuscarcategoriaPF.fecha.value.trim();
        let antesODespues = frmBuscarcategoriaPF.condicion.value;
        // Obtener el listado de componentes por fecha
        respuesta = await oEmpresa.buscarCategoriaPF(fechaABuscar, antesODespues);

    } else {
        let aBuscar = frmBuscarcategoria.txtNombreCategoria.value.trim();
        // Obtener el listado de componentes
        respuesta = await oEmpresa.buscarCategoria(aBuscar);
    }




    listados.classList.remove("d-none");

    let listado = '<table class="table table-striped" id="tablaCategorias">';
    listado +=
        "<thead><tr><th>IDCategorias</th><th>NOMBRE</th><th>DESCRIPCION</th><th>ORDEN</th><th>FECHA_CREACION</th><th>ACTIVA</th><th>DIFICULTAD</th><th>ACCION</th></tr></thead>";
    listado += "<tbody>";

    for (let fila of respuesta.datos) {
        listado += "<tr><td>" + fila.id + "</td>";
        listado += "<td>" + fila.nombre + "</td>";
        listado += "<td>" + fila.descripcion + "</td>";
        listado += "<td>" + fila.orden + "</td>";
        listado += "<td>" + fila.fecha_creacion + "</td>";
        if (parseInt(fila.activa) === 1) {
            listado += "<td class='table-success'>SI</td>";
        } else {
            listado += "<td class='table-danger'>NO</td>";
        }

        listado += "<td>" + fila.dificultad + "</td>";

        listado +=
            "<td>" +
            "<button class='btn btn-primary btn-editar' data-categoria='" + JSON.stringify(fila) + "'>" +
            "<i class='bi bi-pencil-square'></i></button> " +
            "<button class='btn btn-danger btn-borrar' data-id='" + fila.id + "'>" +
            "<i class='bi bi-trash'></i></button>" +
            "</td>";

        listado += "</tr>";

    }

    listado += "</tbody></table>";
    document.querySelector("#listados").innerHTML = listado;
}

async function procesarAccionTabla(oEvento) {
    // closest sube desde donde se hizo clic (botón o icono) hasta el botón
    let botonEditar = oEvento.target.closest(".btn-editar");
    let botonBorrar = oEvento.target.closest(".btn-borrar");

    if (botonEditar) {
        await oEmpresa.editarCategoria(botonEditar);
    } else if (botonBorrar) {
        let id = botonBorrar.dataset.id;

        if (confirm("¿Seguro que quieres borrar esta categoría?")) {
            let respuesta = await oEmpresa.borrarCategoria(id);
            alert(respuesta.mensaje);

            if (respuesta.ok) {
                botonBorrar.closest("tr").remove();
            }
        }
    }
    // si no es ninguno de los dos, se ignora el clic
}



async function actualizarDesplegableCategoria(id_categoria) {
    let respuesta = await oEmpresa.getCategoriasCursos();
    let options = "";

    for (let categoria of respuesta.datos) {
        if (id_categoria && id_categoria == categoria.id) {
            // Si llega el parámetro ( != undefined )
            options +=
                "<option selected value='" +
                categoria.id +
                "' >" +
                categoria.nombre +
                "</option>";
        } else {
            options +=
                "<option value='" + categoria.id + "' >" + categoria.nombre + "</option>";
        }
    }
    // Agrego los options generados a partir del contenido de la BD en todos los desplegables
    frmAltaCurso.lstAltaCursoCategoria.innerHTML = options;
    frmBuscarcursocategoria.lstCategoria.innerHTML = options;
}





async function procesarAltaCategoria() {
    if (validarAltaCategoria()) {
        let id = frmAltacategoria.txtIdCategoria.value;
        let nombre = frmAltacategoria.txtNombre.value.trim();
        let descripcion = frmAltacategoria.txtDescripcion.value.trim();
        let orden = parseInt(frmAltacategoria.intorden.value);
        let dificultad = parseInt(frmAltacategoria.lstDificultades.value);
        let activa = frmAltacategoria.activa.checked
        let fecha = new Date().toLocaleDateString("sv-SE");

        let categoria = new Categoria(id || null,
            nombre,
            descripcion,
            dificultad,
            orden,
            activa,
            fecha);

        let respuesta = id
            ? await oEmpresa.actualizarCategoria(categoria)
            : await oEmpresa.altaCategoria(categoria);

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            // Si NO hay error
            //Resetear formulario
            frmAltacategoria.reset();
            frmAltacategoria.txtIdCategoria.value = "";
            frmAltacategoria.querySelector("legend").textContent = "Alta de categoría";
            frmAltacategoria.btnAceptarAltaCategoria.value = "Aceptar";
            // Ocultar el formulario
            frmAltacategoria.classList.add("d-none");
        }
    }
}