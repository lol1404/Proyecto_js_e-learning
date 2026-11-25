<?php
require_once __DIR__ . '/config.php';

function esFechaModuloValida($fecha)
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
    $fecha = $_POST['fecha_creacion'] ?? '';
    $obligatorio = filter_var($_POST['obligatorio'] ?? '0', FILTER_VALIDATE_INT);

    if ($id === false || $id < 1 || $cursoId === false || $cursoId < 1
        || $orden === false || $orden < 1 || $titulo === '' || mb_strlen($titulo) > 150
        || mb_strlen($descripcion) > 255 || !esFechaModuloValida($fecha)
        || !in_array($obligatorio, [0, 1], true)) {
        responder(null, false, 'Los datos del módulo no son válidos.', $conexion);
    }

    $stmt = $conexion->prepare(
        'UPDATE modulos
         SET curso_id = ?, titulo = ?, descripcion = ?, orden = ?, obligatorio = ?, fecha_creacion = ?
         WHERE id = ?'
    );
    if (!$stmt) {
        throw new RuntimeException('No se pudo preparar la actualización: ' . $conexion->error);
    }
    $stmt->bind_param('issiisi', $cursoId, $titulo, $descripcion, $orden, $obligatorio, $fecha, $id);
    if (!$stmt->execute()) {
        throw new RuntimeException('No se pudo ejecutar la actualización: ' . $stmt->error);
    }
    if ($stmt->affected_rows === 0) {
        $existe = $conexion->prepare('SELECT id FROM modulos WHERE id = ?');
        if (!$existe) {
            throw new RuntimeException('No se pudo verificar el módulo: ' . $conexion->error);
        }
        $existe->bind_param('i', $id);
        if (!$existe->execute() || !$existe->get_result()->fetch_assoc()) {
            responder(null, false, 'No se encontró el módulo.', $conexion);
        }
    }
    responder(null, true, 'Módulo actualizado correctamente.', $conexion);
} catch (Throwable $e) {
    error_log($e->getMessage());
    responder(null, false, 'No se pudo actualizar el módulo. Comprueba que el curso exista y que no se repita el orden en ese curso.', $conexion ?? null);
}
