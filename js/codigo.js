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
    }
}

function ocultarFormularios() {
    frmAltacategoria.classList.add("d-none");

    frmBuscarcategoria.classList.add("d-none");

    listados.classList.add("d-none");

    frmBuscarcategoriaPF.classList.add("d-none");

    frmAltaLeccion.classList.add("d-none");
    frmBuscarLeccion.classList.add("d-none");
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

var oLecciones = new EmpresaLecciones();

registrarEventosLecciones();

function registrarEventosLecciones() {
    document.querySelector('a[href="alta_leccion.php"]')
        .addEventListener("click", (evento) => {
            evento.preventDefault();
            mostrarFormularioLeccion("alta");
        });

    document.querySelector('a[href="buscar_leccion.php"]')
        .addEventListener("click", (evento) => {
            evento.preventDefault();
            mostrarFormularioLeccion("buscar");
        });

    document.querySelector('a[href="listado_lecciones.php"]')
        .addEventListener("click", (evento) => {
            evento.preventDefault();
            procesarListadoLecciones();
        });

    document.querySelector('a[href="listado_lecciones_por_duracion.php"]')
        .addEventListener("click", (evento) => {
            evento.preventDefault();
            mostrarFormularioLeccionesPorDuracion();
        });

    document.querySelector("#btnAceptarAltaLeccion")
        .addEventListener("click", procesarAltaLeccion);
    document.querySelector("#btnBuscarLeccion")
        .addEventListener("click", procesarBuscarLeccion);
    document.querySelector("#listados")
        .addEventListener("submit", procesarFiltroDuracionLecciones);
    document.querySelector("#listados")
        .addEventListener("click", procesarAccionTablaLecciones);
}

function mostrarFormularioLeccion(tipo) {
    ocultarFormularios();

    if (tipo === "alta") {
        frmAltaLeccion.reset();
        frmAltaLeccion.txtIdLeccion.value = "";
        frmAltaLeccion.querySelector("legend").textContent = "Alta de leccion";
        frmAltaLeccion.btnAceptarAltaLeccion.value = "Aceptar";
        frmAltaLeccion.intDuracionLeccion.value = "0";
        frmAltaLeccion.classList.remove("d-none");
        actualizarDesplegableModulos();
    } else {
        frmBuscarLeccion.reset();
        frmBuscarLeccion.classList.remove("d-none");
    }
}

async function actualizarDesplegableModulos(idModulo) {
    const respuesta = await oLecciones.listadoModulos();
    if (!respuesta.ok || !Array.isArray(respuesta.datos)) {
        alert(respuesta.mensaje || "No se pudieron cargar los modulos.");
        return;
    }

    let options = '<option value="">Selecciona un modulo</option>';
    for (const modulo of respuesta.datos) {
        const seleccionado = Number(idModulo) === Number(modulo.id) ? " selected" : "";
        options += "<option value=\"" + escaparHTML(modulo.id) + "\"" + seleccionado + ">" +
            escaparHTML(modulo.titulo) + " - " + escaparHTML(modulo.curso) + "</option>";
    }
    frmAltaLeccion.lstModulosLeccion.innerHTML = options;
}

async function procesarAltaLeccion() {
    const validacion = validarAltaLeccion();
    if (!validacion) {
        return;
    }

    const id = frmAltaLeccion.txtIdLeccion.value.trim();
    const leccion = new Leccion(
        id || null,
        Number(frmAltaLeccion.lstModulosLeccion.value),
        frmAltaLeccion.txtTituloLeccion.value.trim(),
        frmAltaLeccion.lstTipoRecurso.value,
        frmAltaLeccion.txtRecursoUrl.value.trim(),
        Number(frmAltaLeccion.intDuracionLeccion.value),
        Number(frmAltaLeccion.intOrdenLeccion.value),
        frmAltaLeccion.gratuitaLeccion.checked,
        frmAltaLeccion.fechaPublicacionLeccion.value
    );

    const respuesta = id
        ? await oLecciones.actualizarLeccion(leccion)
        : await oLecciones.altaLeccion(leccion);
    alert(respuesta.mensaje);

    if (respuesta.ok) {
        frmAltaLeccion.reset();
        frmAltaLeccion.txtIdLeccion.value = "";
        frmAltaLeccion.classList.add("d-none");
    }
}

function validarAltaLeccion() {
    const modulo = Number(frmAltaLeccion.lstModulosLeccion.value);
    const titulo = frmAltaLeccion.txtTituloLeccion.value.trim();
    const duracionTexto = frmAltaLeccion.intDuracionLeccion.value.trim();
    const duracion = Number(duracionTexto);
    const orden = Number(frmAltaLeccion.intOrdenLeccion.value);
    const fecha = frmAltaLeccion.fechaPublicacionLeccion.value;
    const errores = [];

    if (!Number.isSafeInteger(modulo) || modulo < 1) {
        errores.push("Selecciona un modulo valido.");
    }
    if (!titulo || titulo.length > 150) {
        errores.push("El titulo es obligatorio y no puede superar los 150 caracteres.");
    }
    if (!["video", "pdf", "audio", "imagen", "texto"].includes(frmAltaLeccion.lstTipoRecurso.value)) {
        errores.push("Selecciona un tipo de recurso valido.");
    }
    if (frmAltaLeccion.txtRecursoUrl.value.trim().length > 255) {
        errores.push("La URL no puede superar los 255 caracteres.");
    }
    if (!duracionTexto || !Number.isSafeInteger(duracion) || duracion < 0) {
        errores.push("La duracion debe ser un numero entero igual o mayor que cero.");
    }
    if (!Number.isSafeInteger(orden) || orden < 1) {
        errores.push("El orden debe ser un numero entero mayor que cero.");
    }
    if (!fecha) {
        errores.push("La fecha de publicacion es obligatoria.");
    }
    if (errores.length) {
        alert(errores.join("\n"));
        return false;
    }
    return true;
}

async function procesarBuscarLeccion() {
    const titulo = frmBuscarLeccion.txtBuscarTituloLeccion.value.trim();
    const respuesta = await oLecciones.buscarLeccion(titulo);
    mostrarListadoLecciones(respuesta, "Resultados de busqueda");
}

function mostrarFormularioLeccionesPorDuracion() {
    ocultarFormularios();
    const listados = document.querySelector("#listados");
    listados.innerHTML = '<form id="frmFiltroDuracionLecciones" class="mb-4">' +
        '<fieldset><legend>Listado de lecciones por duración</legend>' +
        '<div class="mb-3"><label class="form-label" for="duracionMinLecciones">' +
        'Duración (minutos)</label>' +
        '<input class="form-control" type="number" id="duracionMinLecciones" ' +
        'name="duracion_min" min="0" step="1" required></div>' +
        '<button type="submit" class="btn btn-primary">Buscar lecciones</button>' +
        '</fieldset></form>';
    listados.classList.remove("d-none");
}

async function procesarFiltroDuracionLecciones(evento) {
    if (evento.target.id !== "frmFiltroDuracionLecciones") {
        return;
    }
    evento.preventDefault();

    const duracion = evento.target.elements.duracion_min.value;
    const respuesta = await oLecciones.listadoLeccionesPorDuracion(duracion);
    mostrarListadoLecciones(respuesta, "Lecciones con duración de " + duracion + " minutos");
}

async function procesarListadoLecciones() {
    const respuesta = await oLecciones.listadoLecciones();
    mostrarListadoLecciones(respuesta, "Listado de lecciones");
}

function mostrarListadoLecciones(respuesta, titulo) {
    ocultarFormularios();
    if (!respuesta.ok || !Array.isArray(respuesta.datos)) {
        alert(respuesta.mensaje || "No se pudieron cargar las lecciones.");
        return;
    }

    let listado = '<h2>' + escaparHTML(titulo) + '</h2>';
    listado += '<table class="table table-striped" id="tablaLecciones">';
    listado += "<thead><tr><th>ID</th><th>Modulo</th><th>Curso</th><th>Titulo</th>" +
        "<th>Tipo</th><th>Recurso</th><th>Duracion (min)</th><th>Orden</th>" +
        "<th>Gratuita</th><th>Fecha</th><th>Accion</th></tr></thead><tbody>";

    for (const fila of respuesta.datos) {
        const leccionJson = escaparHTML(JSON.stringify(fila));
        listado += "<tr><td>" + escaparHTML(fila.id) + "</td>";
        listado += "<td>" + escaparHTML(fila.modulo) + "</td>";
        listado += "<td>" + escaparHTML(fila.curso) + "</td>";
        listado += "<td>" + escaparHTML(fila.titulo) + "</td>";
        listado += "<td>" + escaparHTML(fila.tipo_recurso) + "</td>";
        listado += "<td>" + escaparHTML(fila.recurso_url || "") + "</td>";
        listado += "<td>" + escaparHTML(fila.duracion_min) + "</td>";
        listado += "<td>" + escaparHTML(fila.orden) + "</td>";
        listado += "<td>" + (Number(fila.gratuita) === 1 ? "Si" : "No") + "</td>";
        listado += "<td>" + escaparHTML(fila.fecha_publicacion) + "</td>";
        listado += "<td><button class=\"btn btn-primary btn-editar-leccion\" data-leccion=\"" +
            leccionJson + "\"><i class=\"bi bi-pencil-square\"></i></button> ";
        listado += "<button class=\"btn btn-danger btn-borrar-leccion\" data-id=\"" +
            escaparHTML(fila.id) + "\"><i class=\"bi bi-trash\"></i></button></td></tr>";
    }

    listado += "</tbody></table>";
    document.querySelector("#listados").innerHTML = listado;
    document.querySelector("#listados").classList.remove("d-none");
}

async function procesarAccionTablaLecciones(evento) {
    const botonEditar = evento.target.closest(".btn-editar-leccion");
    const botonBorrar = evento.target.closest(".btn-borrar-leccion");

    if (botonEditar) {
        const leccion = JSON.parse(botonEditar.dataset.leccion);
        ocultarFormularios();
        frmAltaLeccion.classList.remove("d-none");
        frmAltaLeccion.querySelector("legend").textContent = "Editar leccion";
        frmAltaLeccion.btnAceptarAltaLeccion.value = "Guardar cambios";
        frmAltaLeccion.txtIdLeccion.value = leccion.id;
        frmAltaLeccion.txtTituloLeccion.value = leccion.titulo;
        frmAltaLeccion.lstTipoRecurso.value = leccion.tipo_recurso;
        frmAltaLeccion.txtRecursoUrl.value = leccion.recurso_url || "";
        frmAltaLeccion.intDuracionLeccion.value = leccion.duracion_min;
        frmAltaLeccion.intOrdenLeccion.value = leccion.orden;
        frmAltaLeccion.gratuitaLeccion.checked = Number(leccion.gratuita) === 1;
        frmAltaLeccion.fechaPublicacionLeccion.value = leccion.fecha_publicacion;
        await actualizarDesplegableModulos(leccion.modulo_id);
    } else if (botonBorrar && confirm("Seguro que quieres borrar esta leccion?")) {
        const respuesta = await oLecciones.borrarLeccion(botonBorrar.dataset.id);
        alert(respuesta.mensaje);
        if (respuesta.ok) {
            botonBorrar.closest("tr").remove();
        }
    }
}

function escaparHTML(valor) {
    return String(valor == null ? "" : valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}