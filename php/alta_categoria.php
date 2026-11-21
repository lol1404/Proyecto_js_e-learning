<?php

include_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();

    // Validación básica de entrada
    if (!isset($_POST['id'])) {
        responder(null, false, "Falta el campo 'id' en POST", $conexion);
    }


    $nombre = trim($_POST['nombre']);
    $descripcion = isset($_POST['descripcion']) ? trim($_POST['descripcion']) : '';
    $dificultad_id = trim($_POST['dificultad_id']);
    $orden = trim($_POST['orden']);
    $fecha_creacion = trim($_POST['fecha_creacion']);

    // Prepared statement para insertar de forma segura
    $sql = "INSERT INTO categorias (nombre, descripcion, dificultad_id, orden, fecha_creacion)
        VALUES (?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar la consulta: ' . $conexion->error);
    }

    // Bind y ejecución ('s' -> string)
    $stmt->bind_param('ssiis', $nombre, $descripcion, $dificultad_id, $orden, $fecha_creacion);
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar INSERT: ' . $stmt->error);
    }

    // Éxito
    responder(null, true, 'Se ha insertado la categoria', $conexion);
} catch (mysqli_sql_exception $e) {
    // Responder con información controlada sobre el error de BBDD
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}
