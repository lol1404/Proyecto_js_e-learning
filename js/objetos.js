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
}