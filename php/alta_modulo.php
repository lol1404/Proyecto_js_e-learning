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
    $cursoId = filter_var($_POST['curso_id'] ?? null, FILTER_VALIDATE_INT);
    $titulo = trim($_POST['titulo'] ?? '');
    $descripcion = trim($_POST['descripcion'] ?? '');
    $orden = filter_var($_POST['orden'] ?? null, FILTER_VALIDATE_INT);
    $fecha = $_POST['fecha_creacion'] ?? '';
    $obligatorio = filter_var($_POST['obligatorio'] ?? '0', FILTER_VALIDATE_INT);

    if ($cursoId === false || $cursoId < 1 || $orden === false || $orden < 1
        || $titulo === '' || mb_strlen($titulo) > 150
        || mb_strlen($descripcion) > 255 || !esFechaModuloValida($fecha)
        || !in_array($obligatorio, [0, 1], true)) {
        responder(null, false, 'Los datos del módulo no son válidos.', $conexion);
    }

    $stmt = $conexion->prepare(
        'INSERT INTO modulos (curso_id, titulo, descripcion, orden, obligatorio, fecha_creacion)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    if (!$stmt) {
        throw new RuntimeException('No se pudo preparar el alta: ' . $conexion->error);
    }
    $stmt->bind_param('issiis', $cursoId, $titulo, $descripcion, $orden, $obligatorio, $fecha);
    if (!$stmt->execute()) {
        throw new RuntimeException('No se pudo ejecutar el alta: ' . $stmt->error);
    }
    responder(null, true, 'Módulo creado correctamente.', $conexion);
} catch (Throwable $e) {
    error_log($e->getMessage());
    responder(null, false, 'No se pudo crear el módulo. Comprueba que el curso exista y que no se repita el orden en ese curso.', $conexion ?? null);
}
