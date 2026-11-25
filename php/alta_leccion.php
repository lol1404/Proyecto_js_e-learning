<?php

require_once(__DIR__ . '/config.php');
require_once(__DIR__ . '/leccion_utils.php');

try {
    $conexion = obtenerConexion();
    $leccion = leerDatosLeccion($conexion);
    $sql = "INSERT INTO lecciones
        (modulo_id, titulo, tipo_recurso, recurso_url, duracion_min, orden, gratuita, fecha_publicacion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar la consulta: ' . $conexion->error);
    }

    $stmt->bind_param(
        'isssiiis',
        $leccion['modulo_id'],
        $leccion['titulo'],
        $leccion['tipo_recurso'],
        $leccion['recurso_url'],
        $leccion['duracion_min'],
        $leccion['orden'],
        $leccion['gratuita'],
        $leccion['fecha_publicacion']
    );
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar INSERT: ' . $stmt->error);
    }

    responder(['id' => $stmt->insert_id], true, 'Leccion insertada correctamente', $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}