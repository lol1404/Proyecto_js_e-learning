<?php

require_once(__DIR__ . '/config.php');

function fechaModuloValida($fecha)
{
    if (!is_string($fecha)) {
        return false;
    }

    $fechaParseada = DateTimeImmutable::createFromFormat('!Y-m-d', $fecha);
    $errores = DateTimeImmutable::getLastErrors();
    return $fechaParseada !== false
        && ($errores === false || ($errores['warning_count'] === 0 && $errores['error_count'] === 0))
        && $fechaParseada->format('Y-m-d') === $fecha;
}

try {
    $conexion = obtenerConexion();
    $cursoId = filter_var($_POST['curso_id'] ?? null, FILTER_VALIDATE_INT);
    $titulo = trim($_POST['titulo'] ?? '');
    $descripcion = trim($_POST['descripcion'] ?? '');
    $orden = filter_var($_POST['orden'] ?? null, FILTER_VALIDATE_INT);
    $obligatorio = filter_var($_POST['obligatorio'] ?? '0', FILTER_VALIDATE_INT);
    $fecha = $_POST['fecha_creacion'] ?? '';

    if ($cursoId === false || $cursoId < 1 || $orden === false || $orden < 1
        || $titulo === '' || mb_strlen($titulo) > 150 || mb_strlen($descripcion) > 255
        || !in_array($obligatorio, [0, 1], true) || !fechaModuloValida($fecha)) {
        responder(null, false, "Los datos del módulo no son válidos", $conexion);
    }

    $stmt = $conexion->prepare(
        "INSERT INTO modulos (curso_id, titulo, descripcion, orden, obligatorio, fecha_creacion)
         VALUES (?, ?, ?, ?, ?, ?)"
    );
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar INSERT: ' . $conexion->error);
    }
    $stmt->bind_param('issiis', $cursoId, $titulo, $descripcion, $orden, $obligatorio, $fecha);
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar INSERT: ' . $stmt->error);
    }

    responder(null, true, "Módulo creado correctamente", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
