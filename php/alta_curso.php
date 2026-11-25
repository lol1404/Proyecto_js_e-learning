<?php

include_once(__DIR__ . '/config.php');

try {
    $conexion = obtenerConexion();

    $categoria_id = $_POST['categoria_id'];
    $titulo = trim($_POST['titulo']);
    $descripcion = trim($_POST['descripcion']);
    $nivel = $_POST['nivel'];
    $duracion_horas = $_POST['duracion_horas'];
    $precio = $_POST['precio'];
    $publicado = isset($_POST['publicado']) ? 1 : 0;
    $fecha_publicacion = $_POST['fecha_publicacion'];

    // Consulta preparada
    $sql = "INSERT INTO cursos 
            (categoria_id, titulo, descripcion, nivel, duracion_horas, precio, publicado, fecha_publicacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        throw new mysqli_sql_exception(
            'Error al preparar la consulta: ' . $conexion->error
        );
    }

    // Asociar parámetros
    $stmt->bind_param(
        'isssidis',
        $categoria_id,
        $titulo,
        $descripcion,
        $nivel,
        $duracion_horas,
        $precio,
        $publicado,
        $fecha_publicacion
    );

    // Ejecutar
    if (!$stmt->execute()) {
        throw new mysqli_sql_exception(
            'Error al ejecutar INSERT: ' . $stmt->error
        );
    }

    responder(null, true, 'Se ha insertado el curso', $conexion);

} catch (mysqli_sql_exception $e) {
    responder(null, false, 'Error en la base de datos: ' . $e->getMessage(), $conexion ?? null);

} catch (Exception $e) {
    responder(null, false, 'Error inesperado: ' . $e->getMessage(), $conexion ?? null);
}
?>