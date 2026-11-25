<?php
require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    $sql = "SELECT m.*, c.titulo AS curso
            FROM modulos m
            INNER JOIN cursos c ON c.id = m.curso_id
            ORDER BY c.titulo, m.orden, m.id";
    $resultado = $conexion->query($sql);
    if (!$resultado) {
        throw new mysqli_sql_exception('Error al consultar módulos: ' . $conexion->error);
    }

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
    responder($datos, true, "Módulos recuperados correctamente", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
