<?php

require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    $id = filter_var($_POST['id'] ?? null, FILTER_VALIDATE_INT);
    if ($id === false || $id < 1) {
        responder(null, false, "El identificador del módulo no es válido", $conexion);
    }

    $stmt = $conexion->prepare("DELETE FROM modulos WHERE id = ?");
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar DELETE: ' . $conexion->error);
    }
    $stmt->bind_param('i', $id);
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar DELETE: ' . $stmt->error);
    }
    if ($stmt->affected_rows === 0) {
        responder(null, false, "No se encontró el módulo", $conexion);
    }

    responder(null, true, "Módulo eliminado junto con sus lecciones", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
