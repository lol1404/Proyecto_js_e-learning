<?php
require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();

    if (!isset($_POST['id']) || filter_var($_POST['id'], FILTER_VALIDATE_INT) === false) {
        responder(null, false, "El ID del curso no es válido", $conexion);
    }

    $id = (int) $_POST['id'];
    $stmt = $conexion->prepare("DELETE FROM cursos WHERE id = ?");

    if (!$stmt) {
        responder(null, false, "No se pudo preparar el borrado: " . $conexion->error, $conexion);
    }

    $stmt->bind_param('i', $id);

    if (!$stmt->execute()) {
        responder(null, false, "No se pudo borrar el curso: " . $stmt->error, $conexion);
    }

    if ($stmt->affected_rows === 0) {
        responder(null, false, "No se encontró el curso", $conexion);
    }

    responder(null, true, "Curso eliminado", $conexion);

} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error al eliminar el curso: " . $e->getMessage(), $conexion ?? null);

} catch (Exception $e) {
    responder(null, false, "Error inesperado: " . $e->getMessage(), $conexion ?? null);
}

?>