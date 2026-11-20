"use strict";

registrarEventos();

function registrarEventos() {
    document
        .querySelector("#limpiar")
        .addEventListener("click", ocultarFormularios);

    // dropdown --------------------
    document
        .querySelector("#mnuAltaC")
        .addEventListener("click", mostrarFormulario);

}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaC":
            frmAltacategoria.classList.remove("d-none");
            break;

    }
}

function ocultarFormularios() {
    frmAltacategoria.classList.add("d-none");
}