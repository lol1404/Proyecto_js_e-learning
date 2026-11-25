<?php

require_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();
    $categoria = null;
    if (isset($_GET['curso'])) {
        $curso = trim($_GET['curso']);
        $sql = "SELECT cursos.*, categorias.nombre AS categorias
                FROM cursos
                INNER JOIN categorias ON cursos.categoria_id = categorias.id
                WHERE cursos.titulo LIKE CONCAT('%', ?, '%')
                ORDER BY cursos.titulo, cursos.id";
        $stmt = $conexion->prepare($sql);
        if (!$stmt) {
            throw new mysqli_sql_exception('Error al preparar la búsqueda: ' . $conexion->error);
        }
        $stmt->bind_param('s', $curso);
    } elseif (isset($_GET['categoria'])) {
        $categoria = filter_var($_GET['categoria'], FILTER_VALIDATE_INT);
        if ($categoria === false || $categoria < 1) {
            responder(null, false, 'La categoría no es válida', $conexion);
        }

        $sql = "SELECT cursos.*, categorias.nombre AS categorias
                FROM cursos
                INNER JOIN categorias ON cursos.categoria_id = categorias.id
                WHERE cursos.categoria_id = ?
                ORDER BY cursos.titulo, cursos.id";
        $stmt = $conexion->prepare($sql);
        if (!$stmt) {
            throw new mysqli_sql_exception('Error al preparar la búsqueda: ' . $conexion->error);
        }
        $stmt->bind_param('i', $categoria);
    } else {
        responder(null, false, 'Indica un título o una categoría para buscar cursos', $conexion);
    }

    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar la búsqueda: ' . $stmt->error);
    }
    $resultado = $stmt->get_result();
    if (!$resultado) {
        throw new mysqli_sql_exception('Error al recuperar los cursos: ' . $stmt->error);
    }

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }

    responder($datos, true, 'Cursos recuperados correctamente', $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    responder(null, false, 'Error general: ' . $e->getMessage(), $conexion ?? null);
}
