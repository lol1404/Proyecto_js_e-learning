<?php
require_once __DIR__ . '/config.php';

try {
    $conexion = obtenerConexion();
    $id = filter_var($_POST['id'] ?? null, FILTER_VALIDATE_INT);
    if ($id === false || $id < 1) {
        responder(null, false, 'El identificador del módulo no es válido.', $conexion);
    }

    $stmt = $conexion->prepare('DELETE FROM modulos WHERE id = ?');
    if (!$stmt) {
        throw new RuntimeException('No se pudo preparar el borrado: ' . $conexion->error);
    }
    $stmt->bind_param('i', $id);
    if (!$stmt->execute()) {
        throw new RuntimeException('No se pudo ejecutar el borrado: ' . $stmt->error);
    }
    if ($stmt->affected_rows === 0) {
        responder(null, false, 'No se encontró el módulo.', $conexion);
    }
    responder(null, true, 'Módulo eliminado correctamente junto con sus lecciones.', $conexion);
} catch (Throwable $e) {
    error_log($e->getMessage());
    responder(null, false, 'No se pudo eliminar el módulo.', $conexion ?? null);
}
