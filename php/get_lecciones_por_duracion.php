<?php

require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    $filtrarDuracion = array_key_exists('duracion_min', $_GET);
    if ($filtrarDuracion) {
        $duracion = is_string($_GET['duracion_min'])
            ? filter_var($_GET['duracion_min'], FILTER_VALIDATE_INT)
            : false;
        if ($duracion === false || $duracion < 0) {
            http_response_code(400);
            responder(null, false, 'La duración debe ser un número entero igual o superior a 0.', $conexion);
        }
    }

    $sql = "SELECT l.*, m.titulo AS modulo, c.titulo AS curso
        FROM lecciones l
        JOIN modulos m ON m.id = l.modulo_id
        JOIN cursos c ON c.id = m.curso_id";

    if ($filtrarDuracion) {
        $sql .= " WHERE l.duracion_min = ?";
    }
    $sql .= " ORDER BY l.duracion_min, m.id, l.orden";

    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar la consulta: ' . $conexion->error);
    }
    if ($filtrarDuracion) {
        $stmt->bind_param('i', $duracion);
    }
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al consultar las lecciones: ' . $stmt->error);
    }

    $resultado = $stmt->get_result();
    if (!$resultado) {
        throw new mysqli_sql_exception('Error al obtener los resultados: ' . $stmt->error);
    }

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
    responder($datos, true, $filtrarDuracion
        ? 'Lecciones recuperadas por duración'
        : 'Lecciones ordenadas por duración', $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}
