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
        let oTipo = {
            id: this.#id,
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            dificultad_id: this.#dificultad_id,
            orden: this.#orden,
            activa: this.#activa,
            fecha_creacion: this.#fecha_creacion,
        };
        return oTipo;
    }

}