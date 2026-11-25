<?php

require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    $sql = "SELECT m.id, m.titulo, c.titulo AS curso
        FROM modulos m
        JOIN cursos c ON c.id = m.curso_id
        ORDER BY c.titulo, m.orden";
    $resultado = $conexion->query($sql);
    if (!$resultado) {
        throw new mysqli_sql_exception('Error al consultar los modulos: ' . $conexion->error);
    }

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
    responder($datos, true, 'Modulos recuperados correctamente', $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}
