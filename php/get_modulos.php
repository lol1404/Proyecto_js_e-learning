<?php
require_once __DIR__ . '/config.php';

try {
    $conexion = obtenerConexion();
    $sql = "SELECT m.*, c.titulo AS curso
            FROM modulos m
            INNER JOIN cursos c ON c.id = m.curso_id
            ORDER BY c.titulo, m.orden, m.id";
    $resultado = $conexion->query($sql);
    if (!$resultado) {
        throw new RuntimeException('No se pudieron consultar los módulos: ' . $conexion->error);
    }

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
    responder($datos, true, 'Módulos recuperados correctamente', $conexion);
} catch (Throwable $e) {
    error_log($e->getMessage());
    responder(null, false, 'No se pudieron recuperar los módulos.', $conexion ?? null);
}
