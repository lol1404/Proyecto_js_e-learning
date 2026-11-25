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



    async getCategoriasCursos() {

        let respuesta = await peticionGET("get_categorias_cursos.php");

        return respuesta;
    }




    async altaCurso(oCurso) {
        let datos = new FormData();

        datos.append("id", oCurso.id);
        datos.append("categoria_id", oCurso.categoria_id);
        datos.append("titulo", oCurso.titulo);
        datos.append("descripcion", oCurso.descripcion);
        datos.append("nivel", oCurso.nivel);
        datos.append("duracion_horas", oCurso.duracion_horas);
        datos.append("precio", oCurso.precio);
        datos.append("publicado", oCurso.publicado);
        datos.append("fecha_publicacion", oCurso.fecha_publicacion);

        let respuesta = await peticionPOST("alta_curso.php", datos);

        return respuesta;
    }



    async buscarCurso(curso) {
        let datos = new FormData();
        datos.append("curso", curso);

        let respuesta = await peticionGET("get_buscar_cursos.php", datos);

        return respuesta;
    }

    async buscarCursosCategoria(categoria) {
        let datos = new FormData();
        datos.append("categoria", categoria);

        let respuesta = await peticionGET("get_buscar_cursos.php", datos);

        return respuesta;
    }



    async listadoCursos() {

        let respuesta = await peticionGET("get_cursos.php");

        return respuesta;
    }
}