<?php

include_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();

    $id = trim($_POST['id']);
    $categoria_id = trim($_POST['categoria_id']);
    $titulo = trim($_POST['titulo']);
    $descripcion = trim($_POST['descripcion']);
    $nivel = trim($_POST['nivel']);
    $duracion_horas = trim($_POST['duracion_horas']);
    $precio = trim($_POST['precio']);
    $publicado = isset($_POST['publicado']) ? (int) $_POST['publicado'] : 0;
    $fecha_publicacion = $_POST['fecha_publicacion'];

    // Prepared statement para actualizar de forma segura
    $sql = "UPDATE cursos SET categoria_id = ?, titulo = ?, descripcion = ?, nivel = ?, duracion_horas = ?, precio = ?, publicado = ?, fecha_publicacion = ? WHERE id = ?";

    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        throw new mysqli_sql_exception('Error al preparar la consulta: ' . $conexion->error);
    }

    // Bind y ejecución
    $stmt->bind_param('isssidisi', $categoria_id, $titulo, $descripcion, $nivel,
        $duracion_horas, $precio, $publicado, $fecha_publicacion, $id);

    if (!$stmt->execute()) {
        throw new mysqli_sql_exception('Error al ejecutar UPDATE: ' . $stmt->error);
    }

    // Éxito
    responder(null, true, 'Se ha actualizado el curso', $conexion);

} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);

} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}
?>