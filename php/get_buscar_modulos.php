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
    $base = "SELECT m.*, c.titulo AS curso
             FROM modulos m
             INNER JOIN cursos c ON c.id = m.curso_id";

    if (isset($_GET['titulo']) && is_string($_GET['titulo'])) {
        $titulo = trim($_GET['titulo']);
        $stmt = $conexion->prepare($base . " WHERE m.titulo LIKE ? ORDER BY c.titulo, m.orden, m.id");
        if (!$stmt) {
            throw new mysqli_sql_exception('Error al preparar la búsqueda: ' . $conexion->error);
        }
        $patron = '%' . $titulo . '%';
        $stmt->bind_param('s', $patron);
    } elseif (isset($_GET['fecha'], $_GET['cuando'])
        && is_string($_GET['cuando'])
        && fechaModuloValida($_GET['fecha'])
        && in_array($_GET['cuando'], ['antes', 'despues'], true)) {
        $operador = $_GET['cuando'] === 'antes' ? '<' : '>';
        $stmt = $conexion->prepare(
            $base . " WHERE m.fecha_creacion $operador ? ORDER BY c.titulo, m.orden, m.id"
        );
        if (!$stmt) {
            throw new mysqli_sql_exception('Error al preparar la búsqueda: ' . $conexion->error);
        }
        $fecha = $_GET['fecha'];
        $stmt->bind_param('s', $fecha);
    } else {
        responder(null, false, "Indica un título o una fecha y condición válidos", $conexion);
    }

    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar la búsqueda: ' . $stmt->error);
    }

    $resultado = $stmt->get_result();
    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }
    responder($datos, true, "Búsqueda completada", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
