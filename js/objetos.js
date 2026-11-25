"use strict";

class Categoria {
    #id
    #nombre
    #descripcion
    #dificultad_id
    #orden
    #activa
    #fecha_creacion

    constructor(id,
        nombre,
        descripcion,
        dificultad_id,
        orden,
        activa,
        fecha_creacion) {
        this.#id = id
        this.#nombre = nombre
        this.#descripcion = descripcion
        this.#dificultad_id = dificultad_id
        this.#orden = orden
        this.#activa = activa
        this.#fecha_creacion = fecha_creacion
    }

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }

    get nombre() {
        return this.#nombre;
    }
    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get descripcion() {
        return this.#descripcion;
    }
    set descripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    get dificultad_id() {
        return this.#dificultad_id;
    }
    set dificultad_id(dificultad_id) {
        this.#dificultad_id = dificultad_id;
    }

    get orden() {
        return this.#orden;
    }
    set orden(orden) {
        this.#orden = orden;
    }

    get activa() {
        return this.#activa;
    }
    set activa(activa) {
        this.#activa = activa;
    }

    get fecha_creacion() {
        return this.#fecha_creacion;
    }
    set fecha_creacion(fecha_creacion) {
        this.#fecha_creacion = fecha_creacion;
    }

    toJSON() {
        let oCategoria = {
            id: this.#id,
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            dificultad_id: this.#dificultad_id,
            orden: this.#orden,
            activa: this.#activa,
            fecha_creacion: this.#fecha_creacion,
        };
        return oCategoria;
    }

}

class Modulo {
    #id
    #curso_id
    #titulo
    #descripcion
    #orden
    #obligatorio
    #fecha_creacion

    constructor(id, curso_id, titulo, descripcion, orden, obligatorio, fecha_creacion) {
        this.#id = id;
        this.#curso_id = curso_id;
        this.#titulo = titulo;
        this.#descripcion = descripcion;
        this.#orden = orden;
        this.#obligatorio = obligatorio;
        this.#fecha_creacion = fecha_creacion;
    }

    get id() { return this.#id; }
    set id(id) { this.#id = id; }

    get curso_id() { return this.#curso_id; }
    set curso_id(curso_id) { this.#curso_id = curso_id; }

    get titulo() { return this.#titulo; }
    set titulo(titulo) { this.#titulo = titulo; }

    get descripcion() { return this.#descripcion; }
    set descripcion(descripcion) { this.#descripcion = descripcion; }

    get orden() { return this.#orden; }
    set orden(orden) { this.#orden = orden; }

    get obligatorio() { return this.#obligatorio; }
    set obligatorio(obligatorio) { this.#obligatorio = obligatorio; }

    get fecha_creacion() { return this.#fecha_creacion; }
    set fecha_creacion(fecha_creacion) { this.#fecha_creacion = fecha_creacion; }

    toJSON() {
        return {
            id: this.#id,
            curso_id: this.#curso_id,
            titulo: this.#titulo,
            descripcion: this.#descripcion,
            orden: this.#orden,
            obligatorio: this.#obligatorio,
            fecha_creacion: this.#fecha_creacion,
        };
    }
}


class Curso {
    #id
    #categoria_id
    #titulo
    #descripcion
    #nivel
    #duracion_horas
    #precio
    #publicado
    #fecha_publicacion

    constructor(id,
        categoria_id,
        titulo,
        descripcion,
        nivel,
        duracion_horas,
        precio,
        publicado,
        fecha_publicacion) {
        this.#id = id
        this.#categoria_id = categoria_id
        this.#titulo = titulo
        this.#descripcion = descripcion
        this.#nivel = nivel
        this.#duracion_horas = duracion_horas
        this.#precio = precio
        this.#publicado = publicado
        this.#fecha_publicacion = fecha_publicacion
    }

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }

    get categoria_id() {
        return this.#categoria_id;
    }
    set categoria_id(categoria_id) {
        this.#categoria_id = categoria_id;
    }

    get titulo() {
        return this.#titulo;
    }
    set titulo(titulo) {
        this.#titulo = titulo;
    }

    get descripcion() {
        return this.#descripcion;
    }
    set descripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    get nivel() {
        return this.#nivel;
    }
    set nivel(nivel) {
        this.#nivel = nivel;
    }

    get duracion_horas() {
        return this.#duracion_horas;
    }
    set duracion_horas(duracion_horas) {
        this.#duracion_horas = duracion_horas;
    }

    get precio() {
        return this.#precio;
    }
    set precio(precio) {
        this.#precio = precio;
    }

    get publicado() {
        return this.#publicado;
    }
    set publicado(publicado) {
        this.#publicado = publicado;
    }

    get fecha_publicacion() {
        return this.#fecha_publicacion;
    }
    set fecha_publicacion(fecha_publicacion) {
        this.#fecha_publicacion = fecha_publicacion;
    }

    toJSON() {
        let oCurso = {
            id: this.#id,
            categoria_id: this.#categoria_id,
            titulo: this.#titulo,
            descripcion: this.#descripcion,
            nivel: this.#nivel,
            duracion_horas: this.#duracion_horas,
            precio: this.#precio,
            publicado: this.#publicado,
            fecha_publicacion: this.#fecha_publicacion,
        };
        return oCurso;
    }
}


class Empresa {

    async listadoCategoria() {

        let respuesta = await peticionGET("get_categorias.php");

        return respuesta;
    }

    async altaCategoria(oCategoria) {
        let datos = new FormData();

        datos.append("id", oCategoria.id);
        datos.append("nombre", oCategoria.nombre);
        datos.append("descripcion", oCategoria.descripcion);
        datos.append("dificultad_id", oCategoria.dificultad_id);
        datos.append("orden", oCategoria.orden);
        datos.append("activa", oCategoria.activa);
        datos.append("fecha_creacion", oCategoria.fecha_creacion);

        let respuesta = await peticionPOST("alta_categoria.php", datos);

        return respuesta;
    }

    async actualizarCategoria(oCategoria) {
        let datos = new FormData();

        datos.append("id", oCategoria.id);
        datos.append("nombre", oCategoria.nombre);
        datos.append("descripcion", oCategoria.descripcion);
        datos.append("dificultad_id", oCategoria.dificultad_id);
        datos.append("orden", oCategoria.orden);
        datos.append("activa", oCategoria.activa ? 1 : 0);

        let respuesta = await peticionPOST("editar_categoria.php", datos);

        return respuesta;
    }

    async borrarCategoria(id) {
        let datos = new FormData();
        datos.append("id", id);

        return await peticionPOST("borrar_categoria.php", datos);
    }

    async getDificultad() {
        // let datos = new FormData();

        let respuesta = await peticionGET("get_dificultad.php");

        return respuesta;
    }

    async buscarCategoria(NombreCategoria) {
        let datos = new FormData();
        datos.append("nombre", NombreCategoria);

        let respuesta = await peticionGET("get_buscar_categorias.php", datos);

        return respuesta;
    }

    async buscarCategoriaPF(FechaCategoria, cuando) {
        let datos = new FormData();
        datos.append("fecha", FechaCategoria);
        datos.append("cuando", cuando);

        let respuesta = await peticionGET("get_buscar_categorias.php", datos);

        return respuesta;
    }

    async editarCategoria(boton) {
        let categoria = JSON.parse(boton.dataset.categoria);

        ocultarFormularios();
        frmAltacategoria.classList.remove("d-none");
        frmAltacategoria.querySelector("legend").textContent = "Editar categoría";
        frmAltacategoria.btnAceptarAltaCategoria.value = "Guardar cambios";
        frmAltacategoria.txtIdCategoria.value = categoria.id;
        frmAltacategoria.txtNombre.value = categoria.nombre;
        frmAltacategoria.txtDescripcion.value = categoria.descripcion;
        frmAltacategoria.intorden.value = categoria.orden;
        frmAltacategoria.activa.checked = parseInt(categoria.activa, 10) === 1;

        await actualizarDesplegableDificultad(categoria.dificultad_id);
    }

    async listadoModulos() {
        return await peticionGET("get_modulos.php");
    }

    async getCursos() {
        return await peticionGET("get_cursos.php");
    }

    async altaModulo(modulo) {
        const datos = new FormData();
        datos.append("curso_id", modulo.curso_id);
        datos.append("titulo", modulo.titulo);
        datos.append("descripcion", modulo.descripcion);
        datos.append("orden", modulo.orden);
        datos.append("obligatorio", modulo.obligatorio ? 1 : 0);
        datos.append("fecha_creacion", modulo.fecha_creacion);
        return await peticionPOST("alta_modulo.php", datos);
    }

    async actualizarModulo(modulo) {
        const datos = new FormData();
        datos.append("id", modulo.id);
        datos.append("curso_id", modulo.curso_id);
        datos.append("titulo", modulo.titulo);
        datos.append("descripcion", modulo.descripcion);
        datos.append("orden", modulo.orden);
        datos.append("obligatorio", modulo.obligatorio ? 1 : 0);
        datos.append("fecha_creacion", modulo.fecha_creacion);
        return await peticionPOST("editar_modulo.php", datos);
    }

    async borrarModulo(id) {
        const datos = new FormData();
        datos.append("id", id);
        return await peticionPOST("borrar_modulo.php", datos);
    }

    async buscarModulo(titulo) {
        const datos = new FormData();
        datos.append("titulo", titulo);
        return await peticionGET("get_buscar_modulos.php", datos);
    }

    async buscarModuloPorFecha(fecha, cuando) {
        const datos = new FormData();
        datos.append("fecha", fecha);
        datos.append("cuando", cuando);
        return await peticionGET("get_buscar_modulos.php", datos);
    }

    async editarModulo(boton) {
        const modulo = JSON.parse(boton.dataset.modulo);
        const respuesta = await this.getCursos();
        if (!respuesta.ok) {
            alert(respuesta.mensaje);
            return;
        }

        frmAltaModulo.lstCurso.innerHTML = "";
        for (const curso of respuesta.datos) {
            const opcion = document.createElement("option");
            opcion.value = curso.id;
            opcion.textContent = curso.titulo;
            frmAltaModulo.lstCurso.append(opcion);
        }

        ocultarFormularios();
        listadosModulo.classList.remove("d-none");
        frmAltaModulo.classList.remove("d-none");
        frmAltaModulo.querySelector("legend").textContent = "Editar módulo";
        frmAltaModulo.btnAceptarModulo.value = "Guardar cambios";
        frmAltaModulo.txtIdModulo.value = modulo.id;
        frmAltaModulo.lstCurso.value = modulo.curso_id;
        frmAltaModulo.txtTituloModulo.value = modulo.titulo;
        frmAltaModulo.txtDescripcionModulo.value = modulo.descripcion ?? "";
        frmAltaModulo.intOrdenModulo.value = modulo.orden;
        frmAltaModulo.obligatorio.checked = Number(modulo.obligatorio) === 1;
        frmAltaModulo.fechaCreacionModulo.value = modulo.fecha_creacion;
    }
}