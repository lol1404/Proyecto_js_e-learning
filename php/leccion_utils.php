<?php

function leerDatosLeccion($conexion)
{
    $campos = [
        'modulo_id',
        'titulo',
        'tipo_recurso',
        'recurso_url',
        'duracion_min',
        'orden',
        'gratuita',
        'fecha_publicacion'
    ];

    foreach ($campos as $campo) {
        if (!isset($_POST[$campo])) {
            responder(null, false, "Falta el campo '" . $campo . "' en POST", $conexion);
        }
    }
    foreach (['titulo', 'tipo_recurso', 'recurso_url', 'fecha_publicacion'] as $campo) {
        if (!is_string($_POST[$campo])) {
            responder(null, false, "El campo '" . $campo . "' no es valido", $conexion);
        }
    }

    $moduloId = filter_var($_POST['modulo_id'], FILTER_VALIDATE_INT);
    $duracion = filter_var($_POST['duracion_min'], FILTER_VALIDATE_INT);
    $orden = filter_var($_POST['orden'], FILTER_VALIDATE_INT);
    $gratuita = filter_var($_POST['gratuita'], FILTER_VALIDATE_INT);
    $titulo = trim($_POST['titulo']);
    $tipo = $_POST['tipo_recurso'];
    $recursoUrl = trim($_POST['recurso_url']);
    $fecha = $_POST['fecha_publicacion'];
    $tituloCaracteres = preg_match_all('/./us', $titulo, $coincidencias);
    $urlCaracteres = preg_match_all('/./us', $recursoUrl, $coincidenciasUrl);

    if ($moduloId === false || $moduloId < 1) {
        responder(null, false, "El modulo seleccionado no es valido", $conexion);
    }
    if ($titulo === '' || $tituloCaracteres === false || $tituloCaracteres > 150) {
        responder(null, false, "El titulo es obligatorio y no puede superar los 150 caracteres", $conexion);
    }
    if (!in_array($tipo, ['video', 'pdf', 'audio', 'imagen', 'texto'], true)) {
        responder(null, false, "El tipo de recurso no es valido", $conexion);
    }
    if ($urlCaracteres === false || $urlCaracteres > 255) {
        responder(null, false, "La URL del recurso no puede superar los 255 caracteres", $conexion);
    }
    if ($duracion === false || $duracion < 0) {
        responder(null, false, "La duracion debe ser un numero entero igual o mayor que cero", $conexion);
    }
    if ($orden === false || $orden < 1) {
        responder(null, false, "El orden debe ser un numero entero mayor que cero", $conexion);
    }
    if ($gratuita === false || !in_array($gratuita, [0, 1], true)) {
        responder(null, false, "El valor de gratuita no es valido", $conexion);
    }
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) {
        responder(null, false, "La fecha de publicacion no es valida", $conexion);
    }
    $partesFecha = explode('-', $fecha);
    if (!checkdate((int) $partesFecha[1], (int) $partesFecha[2], (int) $partesFecha[0])) {
        responder(null, false, "La fecha de publicacion no es valida", $conexion);
    }

    return [
        'modulo_id' => $moduloId,
        'titulo' => $titulo,
        'tipo_recurso' => $tipo,
        'recurso_url' => $recursoUrl === '' ? null : $recursoUrl,
        'duracion_min' => $duracion,
        'orden' => $orden,
        'gratuita' => $gratuita,
        'fecha_publicacion' => $fecha
    ];
}
