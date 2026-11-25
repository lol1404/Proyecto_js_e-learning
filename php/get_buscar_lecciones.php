<?php

require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    $titulo = isset($_GET['titulo']) ? trim($_GET['titulo']) : '';
    $patron = '%' . $titulo . '%';
    $sql = "SELECT l.*, m.titulo AS modulo, c.titulo AS curso
        FROM lecciones l
        JOIN modulos m ON m.id = l.modulo_id
        JOIN cursos c ON c.id = m.curso_id
        WHERE l.titulo LIKE ?
        ORDER BY m.id, l.orden";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar la busqueda: ' . $conexion->error);
    }
    $stmt->bind_param('s', $patron);
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al buscar lecciones: ' . $stmt->error);
    }

    $resultado = $stmt->get_result();
    if (!$resultado) {
        throw new mysqli_sql_exception('Error al obtener los resultados: ' . $stmt->error);
    }
    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
    responder($datos, true, 'Busqueda completada', $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}
