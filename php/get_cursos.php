<?php

require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    $resultado = $conexion->query("SELECT id, titulo FROM cursos ORDER BY titulo, id");
    if (!$resultado) {
        throw new RuntimeException('No se pudieron consultar los cursos: ' . $conexion->error);
        throw new mysqli_sql_exception('Error al consultar cursos: ' . $conexion->error);
    }

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
    responder($datos, true, 'Cursos recuperados correctamente', $conexion);
} catch (Throwable $e) {
    error_log($e->getMessage());
    responder(null, false, 'No se pudieron recuperar los cursos.', $conexion ?? null);

    responder($datos, true, "Cursos recuperados correctamente", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}