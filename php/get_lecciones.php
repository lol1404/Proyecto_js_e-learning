<?php

require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    $sql = "SELECT l.*, m.titulo AS modulo, c.titulo AS curso
        FROM lecciones l
        JOIN modulos m ON m.id = l.modulo_id
        JOIN cursos c ON c.id = m.curso_id
        ORDER BY m.id, l.orden";
    $resultado = $conexion->query($sql);
    if (!$resultado) {
        throw new mysqli_sql_exception('Error al consultar las lecciones: ' . $conexion->error);
    }

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
    responder($datos, true, 'Lecciones recuperadas correctamente', $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}
