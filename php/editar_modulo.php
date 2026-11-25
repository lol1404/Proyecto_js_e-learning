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
    $id = filter_var($_POST['id'] ?? null, FILTER_VALIDATE_INT);
    $cursoId = filter_var($_POST['curso_id'] ?? null, FILTER_VALIDATE_INT);
    $titulo = trim($_POST['titulo'] ?? '');
    $descripcion = trim($_POST['descripcion'] ?? '');
    $orden = filter_var($_POST['orden'] ?? null, FILTER_VALIDATE_INT);
    $obligatorio = filter_var($_POST['obligatorio'] ?? '0', FILTER_VALIDATE_INT);
    $fecha = $_POST['fecha_creacion'] ?? '';

    if ($id === false || $id < 1 || $cursoId === false || $cursoId < 1
        || $orden === false || $orden < 1 || $titulo === '' || mb_strlen($titulo) > 150
        || mb_strlen($descripcion) > 255 || !in_array($obligatorio, [0, 1], true)
        || !fechaModuloValida($fecha)) {
        responder(null, false, "Los datos del módulo no son válidos", $conexion);
    }

    $stmt = $conexion->prepare(
        "UPDATE modulos
         SET curso_id = ?, titulo = ?, descripcion = ?, orden = ?, obligatorio = ?, fecha_creacion = ?
         WHERE id = ?"
    );
    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar UPDATE: ' . $conexion->error);
    }
    $stmt->bind_param('issiisi', $cursoId, $titulo, $descripcion, $orden, $obligatorio, $fecha, $id);
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar UPDATE: ' . $stmt->error);
    }

    if ($stmt->affected_rows === 0) {
        $consulta = $conexion->prepare("SELECT id FROM modulos WHERE id = ?");
        if (!$consulta) {
            throw new mysqli_sql_exception('Error al comprobar el módulo: ' . $conexion->error);
        }
        $consulta->bind_param('i', $id);
        if (!$consulta->execute() || !$consulta->get_result()->fetch_assoc()) {
            responder(null, false, "No se encontró el módulo", $conexion);
        }
    }

    responder(null, true, "Módulo actualizado correctamente", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
