<?php

require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    if (!isset($_POST['id']) || filter_var($_POST['id'], FILTER_VALIDATE_INT) === false
        || (int) $_POST['id'] < 1) {
        responder(null, false, 'El ID de la leccion no es valido', $conexion);
    }

    $id = (int) $_POST['id'];
    $stmt = $conexion->prepare("DELETE FROM lecciones WHERE id = ?");
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar el borrado: ' . $conexion->error);
    }
    $stmt->bind_param('i', $id);
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al borrar la leccion: ' . $stmt->error);
    }
    if ($stmt->affected_rows === 0) {
        responder(null, false, 'No se encontro la leccion', $conexion);
    }

    responder(null, true, 'Leccion eliminada correctamente', $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error al eliminar la leccion: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}