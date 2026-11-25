<?php

require_once(__DIR__ . '/config.php');
require_once(__DIR__ . '/leccion_utils.php');

try {
    $conexion = obtenerConexion();
    if (!isset($_POST['id']) || filter_var($_POST['id'], FILTER_VALIDATE_INT) === false
        || (int) $_POST['id'] < 1) {
        responder(null, false, 'El ID de la leccion no es valido', $conexion);
    }

    $id = (int) $_POST['id'];
    $leccion = leerDatosLeccion($conexion);
    $sql = "UPDATE lecciones SET
        modulo_id = ?, titulo = ?, tipo_recurso = ?, recurso_url = ?,
        duracion_min = ?, orden = ?, gratuita = ?, fecha_publicacion = ?
        WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar la consulta: ' . $conexion->error);
    }

    $stmt->bind_param(
        'isssiiisi',
        $leccion['modulo_id'],
        $leccion['titulo'],
        $leccion['tipo_recurso'],
        $leccion['recurso_url'],
        $leccion['duracion_min'],
        $leccion['orden'],
        $leccion['gratuita'],
        $leccion['fecha_publicacion'],
        $id
    );
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar UPDATE: ' . $stmt->error);
    }
    if ($stmt->affected_rows === 0) {
        $stmtBuscar = $conexion->prepare("SELECT id FROM lecciones WHERE id = ?");
        if (!$stmtBuscar) {
            throw new mysqli_sql_exception('Error al comprobar la leccion: ' . $conexion->error);
        }
        $stmtBuscar->bind_param('i', $id);
        if (!$stmtBuscar->execute()) {
            throw new mysqli_sql_exception('Error al comprobar la leccion: ' . $stmtBuscar->error);
        }
        $stmtBuscar->store_result();
        if ($stmtBuscar->num_rows === 0) {
            responder(null, false, 'No se encontro la leccion', $conexion);
        }
    }

    responder(null, true, 'Leccion actualizada correctamente', $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}