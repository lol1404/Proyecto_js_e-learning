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

    document
        .querySelector("#mnuListadoCurso")
        .addEventListener("click", procesarListadoCursos);

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

    document.querySelector("#mnuAltaModulo").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarModulo").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListModulo").addEventListener("click", async () => {
        ocultarFormularios();
        await procesarListadoModulos();
    });
    document.querySelector("#mnuListPFModulo").addEventListener("click", mostrarFormulario);
    document.querySelector("#btnAceptarModulo").addEventListener("click", procesarAltaModulo);
    document.querySelector("#btnBuscarModulo").addEventListener("click", procesarBuscarModulo);
    document.querySelector("#btnBuscarModuloFecha").addEventListener("click", procesarBuscarModuloPorFecha);
    document.querySelector("#listadosModulo").addEventListener("click", procesarAccionTablaModulo);


    // Botones cursos -------------------
    document
    frmAltaCurso.btnAceptarAltaCurso.addEventListener("click", procesarAltaCurso)

    document
    frmBuscarcurso.btnAceptarBuscarCurso.addEventListener("click", () => procesarBuscarCurso(false))

    document
    frmBuscarcursocategoria.btnBuscarCursoCategoria.addEventListener("click", () => procesarBuscarCurso(true))

    document
        .querySelector("#listados")
        .addEventListener("click", procesarAccionTablaCursos);

    document.querySelector("#mnuAltaLeccion")
        .addEventListener("click", () => mostrarFormularioLeccion("alta"));
    document.querySelector("#mnuBuscarLeccion")
        .addEventListener("click", () => mostrarFormularioLeccion("buscar"));
    document.querySelector("#mnuListadoLecciones")
        .addEventListener("click", procesarListadoLecciones);
    document.querySelector("#mnuListadoLeccionesDuracion")
        .addEventListener("click", mostrarFormularioLeccionesPorDuracion);
    document.querySelector("#btnAceptarAltaLeccion")
        .addEventListener("click", procesarAltaLeccion);
    document.querySelector("#btnBuscarLeccion")
        .addEventListener("click", procesarBuscarLeccion);
    document.querySelector("#listados")
        .addEventListener("submit", procesarFiltroDuracionLecciones);
    document.querySelector("#listados")
        .addEventListener("click", procesarAccionTablaLecciones);

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
        case "mnuAltaModulo":
            frmAltaModulo.reset();
            frmAltaModulo.txtIdModulo.value = "";
            frmAltaModulo.querySelector("legend").textContent = "Alta de módulo";
            frmAltaModulo.btnAceptarModulo.value = "Aceptar";
            frmAltaModulo.fechaCreacionModulo.value = new Date().toLocaleDateString("sv-SE");
            frmAltaModulo.obligatorio.checked = true;
            actualizarDesplegableCursos();
            frmAltaModulo.classList.remove("d-none");
            break;
        case "mnuBuscarModulo":
            frmBuscarModulo.reset();
            frmBuscarModulo.classList.remove("d-none");
            break;
        case "mnuListPFModulo":
            frmBuscarModuloFecha.reset();
            frmBuscarModuloFecha.classList.remove("d-none");
            break;
        case "mnuAltaCurso":
            frmAltaCurso.reset();
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
    frmAltaModulo.classList.add("d-none");
    frmBuscarModulo.classList.add("d-none");
    frmBuscarModuloFecha.classList.add("d-none");
    listadosModulo.classList.add("d-none");

    frmAltaLeccion.classList.add("d-none");
    frmBuscarLeccion.classList.add("d-none");

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
    if (!oEvento.target.closest("#tablaCategorias")) {
        return;
    }

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

async function actualizarDesplegableCursos() {
    const respuesta = await oEmpresa.getCursos();
    if (!respuesta.ok) {
        alert(respuesta.mensaje);
        return;
    }
    if (!respuesta.datos.length) {
        alert("No hay cursos disponibles para asignar el módulo.");
        return;
    }

    frmAltaModulo.lstCurso.innerHTML = "";
    for (const curso of respuesta.datos) {
        const opcion = document.createElement("option");
        opcion.value = curso.id;
        opcion.textContent = curso.titulo;
        frmAltaModulo.lstCurso.append(opcion);
    }
}

async function procesarAltaModulo() {
    const id = frmAltaModulo.txtIdModulo.value.trim();
    const titulo = frmAltaModulo.txtTituloModulo.value.trim();
    const descripcion = frmAltaModulo.txtDescripcionModulo.value.trim();
    const cursoId = Number(frmAltaModulo.lstCurso.value);
    const orden = Number(frmAltaModulo.intOrdenModulo.value);
    const fecha = frmAltaModulo.fechaCreacionModulo.value;
    const errores = [];

    if (!Number.isSafeInteger(cursoId) || cursoId < 1) {
        errores.push("Selecciona un curso válido.");
    }
    if (!titulo) {
        errores.push("El título es obligatorio.");
    } else if (titulo.length > 150) {
        errores.push("El título no puede superar los 150 caracteres.");
    }
    if (descripcion.length > 255) {
        errores.push("La descripción no puede superar los 255 caracteres.");
    }
    if (!Number.isSafeInteger(orden) || orden < 1) {
        errores.push("El orden debe ser un número entero mayor que cero.");
    }
    if (!fecha) {
        errores.push("La fecha de creación es obligatoria.");
    }
    if (id && (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id)) || Number(id) < 1)) {
        errores.push("El identificador del módulo no es válido.");
    }
    if (errores.length) {
        alert(errores.join("\n"));
        return;
    }

    const modulo = new Modulo(
        id || null,
        cursoId,
        titulo,
        descripcion,
        orden,
        frmAltaModulo.obligatorio.checked,
        fecha
    );
    const respuesta = id
        ? await oEmpresa.actualizarModulo(modulo)
        : await oEmpresa.altaModulo(modulo);
    alert(respuesta.mensaje);
    if (respuesta.ok) {
        await procesarListadoModulos();
    }
}

async function procesarListadoModulos() {
    const respuesta = await oEmpresa.listadoModulos();
    if (!respuesta.ok) {
        alert(respuesta.mensaje);
        return;
    }
    mostrarListadoModulos(respuesta.datos);
}

async function procesarBuscarModulo() {
    const titulo = frmBuscarModulo.txtTituloBusqueda.value.trim();
    const respuesta = await oEmpresa.buscarModulo(titulo);
    if (!respuesta.ok) {
        alert(respuesta.mensaje);
        return;
    }
    mostrarListadoModulos(respuesta.datos);
}

async function procesarBuscarModuloPorFecha() {
    const fecha = frmBuscarModuloFecha.fechaModulo.value;
    if (!fecha) {
        alert("Selecciona una fecha para realizar la búsqueda.");
        return;
    }

    const respuesta = await oEmpresa.buscarModuloPorFecha(
        fecha,
        frmBuscarModuloFecha.condicionModulo.value
    );
    if (!respuesta.ok) {
        alert(respuesta.mensaje);
        return;
    }
    mostrarListadoModulos(respuesta.datos);
}

function mostrarListadoModulos(datos) {
    listadosModulo.classList.remove("d-none");
    listadosModulo.replaceChildren();

    const tabla = document.createElement("table");
    tabla.className = "table table-striped";
    const cabecera = tabla.createTHead().insertRow();
    for (const titulo of ["ID", "CURSO", "TÍTULO", "DESCRIPCIÓN", "ORDEN", "OBLIGATORIO", "ACCIÓN"]) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = titulo;
        cabecera.append(th);
    }
    const cuerpo = tabla.createTBody();

    if (!datos.length) {
        const fila = cuerpo.insertRow();
        const celda = fila.insertCell();
        celda.colSpan = 7;
        celda.textContent = "No se encontraron módulos.";
    }

    for (const modulo of datos) {
        const fila = cuerpo.insertRow();
        for (const valor of [
            modulo.id,
            modulo.curso,
            modulo.titulo,
            modulo.descripcion,
            modulo.orden,
            Number(modulo.obligatorio) === 1 ? "Sí" : "No",
        ]) {
            fila.insertCell().textContent = valor ?? "";
        }

        const acciones = fila.insertCell();
        const botonEditar = document.createElement("button");
        botonEditar.type = "button";
        botonEditar.className = "btn btn-primary btn-editar-modulo me-2";
        botonEditar.textContent = "Editar";
        botonEditar.dataset.modulo = JSON.stringify(modulo);
        acciones.append(botonEditar);

        const botonBorrar = document.createElement("button");
        botonBorrar.type = "button";
        botonBorrar.className = "btn btn-danger btn-borrar-modulo";
        botonBorrar.textContent = "Borrar";
        botonBorrar.dataset.id = modulo.id;
        acciones.append(botonBorrar);
    }

    listadosModulo.append(tabla);
}

async function procesarAccionTablaModulo(evento) {
    const botonEditar = evento.target.closest(".btn-editar-modulo");
    const botonBorrar = evento.target.closest(".btn-borrar-modulo");

    if (botonEditar) {
        await oEmpresa.editarModulo(botonEditar);
    } else if (botonBorrar && confirm("¿Seguro que quieres borrar este módulo? También se borrarán sus lecciones.")) {
        const respuesta = await oEmpresa.borrarModulo(botonBorrar.dataset.id);
        alert(respuesta.mensaje);
        if (respuesta.ok) {
            botonBorrar.closest("tr").remove();
        }
    }
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





async function procesarAltaCurso() {
    if (validarAltaCurso()) {
        let id = frmAltaCurso.txtIdCurso.value;
        let categoria_id = frmAltaCurso.lstAltaCursoCategoria.value;
        let titulo = frmAltaCurso.txtAltaCursoTitulo.value.trim();
        let descripcion = frmAltaCurso.txtAltaCursoDescripcion.value.trim();
        let nivel = frmAltaCurso.lstAltaCursoNivel.value;
        let duracion_horas = frmAltaCurso.txtAltaCursoHoras.value;
        let precio = frmAltaCurso.txtAltaCursoPrecio.value;
        let publicado = frmAltaCurso.chkAltaCursoPublicado.checked;
        let fecha_publicacion = frmAltaCurso.txtAltaCursoFecha.value;


        let curso = new Curso(id || null,
            categoria_id,
            titulo,
            descripcion,
            nivel,
            duracion_horas,
            precio,
            publicado,
            fecha_publicacion);

        let respuesta = id ? await oEmpresa.actualizarCurso(curso) : await oEmpresa.altaCurso(curso);

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            // Si NO hay error
            //Resetear formulario
            frmAltaCurso.reset();
            // Ocultar el formulario
            frmAltaCurso.classList.add("d-none");
        }
    }
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
    const respuesta = await oEmpresa.listadoModulos();
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
        ? await oEmpresa.actualizarLeccion(leccion)
        : await oEmpresa.altaLeccion(leccion);
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
    const respuesta = await oEmpresa.buscarLeccion(titulo);
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
    const respuesta = await oEmpresa.listadoLeccionesPorDuracion(duracion);
    mostrarListadoLecciones(respuesta, "Lecciones con duración de " + duracion + " minutos");
}

async function procesarListadoLecciones() {
    const respuesta = await oEmpresa.listadoLecciones();
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
        const respuesta = await oEmpresa.borrarLeccion(botonBorrar.dataset.id);
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


function validarAltaCurso() {
    let titulo = frmAltaCurso.txtAltaCursoTitulo.value.trim();
    let descripcion = frmAltaCurso.txtAltaCursoDescripcion.value.trim();
    let duracion_horas = frmAltaCurso.txtAltaCursoHoras.value;
    let precio = frmAltaCurso.txtAltaCursoPrecio.value;
    let publicado = frmAltaCurso.chkAltaCursoPublicado.checked;
    let fecha_publicacion = frmAltaCurso.txtAltaCursoFecha.value;
    let errores = [];

    if (!titulo) {
        errores.push("El nombre es obligatorio.");
    } else if (titulo.length > 150) {
        errores.push("El nombre no puede superar los 150 caracteres.");
    }

    if (!descripcion) {
        errores.push("La descripción es obligatoria.");
    }

    if (!Number.isSafeInteger(Number(duracion_horas)) || Number(duracion_horas) < 1) {
        errores.push("La duración debe ser un número entero mayor que cero.");
    }

    if (precio === "" || precio < 0) {
        errores.push("El precio debe ser un número válido mayor o igual que cero.");
    }

    if (publicado && !fecha_publicacion) {
        errores.push("La fecha de publicación es obligatoria si el curso está publicado.");
    } else if (!fecha_publicacion){
        errores.push("La cadena de fecha no puede estar vacía")
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
        return false;
    }

    return true;
}





async function procesarBuscarCurso(categoria) {
    let respuesta;

    if (categoria) {
        let categoriaABuscar = frmBuscarcursocategoria.lstCategoria.value.trim();
        // Obtener el listado de componentes por categoria
        respuesta = await oEmpresa.buscarCursosCategoria(categoriaABuscar);

    } else {
        let aBuscar = frmBuscarcurso.txtTituloCurso.value.trim();
        // Obtener el listado de componentes
        respuesta = await oEmpresa.buscarCurso(aBuscar);
    }

    ocultarFormularios();
    listados.classList.remove("d-none");

    let listado = '<table class="table table-striped" id="tablaCursos">';
    listado +=
        "<thead><tr><th>ID</th><th>CATEGORIA</th><th>TITULO</th><th>DESCRIPCION</th><th>NIVEL</th><th>DURACION(h)</th><th>PRECIO</th><th>PUBLICADO</th><th>FECHA PUBLICACIO</th><th>ACCIONES</th></tr></thead>";
    listado += "<tbody>";

    for (let fila of respuesta.datos) {
    listado += "<tr><td>" + fila.id + "</td>";
    listado += "<td>" + fila.categorias + "</td>";
    listado += "<td>" + fila.titulo + "</td>";
    listado += "<td>" + fila.descripcion + "</td>";
    listado += "<td>" + fila.nivel + "</td>";
    listado += "<td>" + fila.duracion_horas + "</td>";
    listado += "<td>" + fila.precio + "</td>";

    if (parseInt(fila.publicado) === 1) {
        listado += "<td class='table-success'>SI</td>";
    } else {
        listado += "<td class='table-danger'>NO</td>";
    }

    listado += "<td>" + (fila.fecha_publicacion ?? "") + "</td>";

    listado +=
        "<td>" +
        "<button class='btn btn-primary btn-editar' data-curso='" + JSON.stringify(fila) + "'>" +
        "<i class='bi bi-pencil-square'></i></button> " +
        "<button class='btn btn-danger btn-borrar' data-id='" + fila.id + "'>" +
        "<i class='bi bi-trash'></i></button>" +
        "</td>";

    listado += "</tr>";
}

    listado += "</tbody></table>";
    document.querySelector("#listados").innerHTML = listado;
}

async function procesarListadoCursos() {
    // Obtener el listado de componentes
    let respuesta = await oEmpresa.listadoCursos();

    ocultarFormularios();
    listados.classList.remove("d-none");

    let listado = '<table class="table table-striped" id="tablaCursos">';
    listado +=
        "<thead><tr><th>ID</th><th>CATEGORIA</th><th>TITULO</th><th>DESCRIPCION</th><th>NIVEL</th><th>DURACION(h)</th><th>PRECIO</th><th>PUBLICADO</th><th>FECHA PUBLICACIO</th><th>ACCIONES</th></tr></thead>";
    listado += "<tbody>";

    for (let fila of respuesta.datos) {
    listado += "<tr><td>" + fila.id + "</td>";
    listado += "<td>" + fila.categorias + "</td>";
    listado += "<td>" + fila.titulo + "</td>";
    listado += "<td>" + fila.descripcion + "</td>";
    listado += "<td>" + fila.nivel + "</td>";
    listado += "<td>" + fila.duracion_horas + "</td>";
    listado += "<td>" + fila.precio + "</td>";

    if (parseInt(fila.publicado) === 1) {
        listado += "<td class='table-success'>SI</td>";
    } else {
        listado += "<td class='table-danger'>NO</td>";
    }

    listado += "<td>" + (fila.fecha_publicacion ?? "") + "</td>";

    listado +=
        "<td>" +
        "<button class='btn btn-primary btn-editar' data-curso='" + JSON.stringify(fila) + "'>" +
        "<i class='bi bi-pencil-square'></i></button> " +
        "<button class='btn btn-danger btn-borrar' data-id='" + fila.id + "'>" +
        "<i class='bi bi-trash'></i></button>" +
        "</td>";

    listado += "</tr>";
}

    listado += "</tbody></table>";
    document.querySelector("#listados").innerHTML = listado;
}

async function procesarAccionTablaCursos(oEvento) {
    if (!oEvento.target.closest("#tablaCursos")) {
        return;
    }

    // closest sube desde donde se hizo clic (botón o icono) hasta el botón
    let botonEditar = oEvento.target.closest(".btn-editar");
    let botonBorrar = oEvento.target.closest(".btn-borrar");

    if (botonEditar) {
        await oEmpresa.editarCurso(botonEditar);
    } else if (botonBorrar) {
        let id = botonBorrar.dataset.id;

        if (confirm("¿Seguro que quieres borrar este curso?")) {
            let respuesta = await oEmpresa.borrarCurso(id);
            alert(respuesta.mensaje);

            if (respuesta.ok) {
                botonBorrar.closest("tr").remove();
            }
        }
    }
    // si no es ninguno de los dos, se ignora el clic
}