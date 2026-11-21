<?php

require_once('config.php'); // Incluye obtenerConexion() y responder()

try {
    // Recojo el parámetro
    if (isset($_GET['nombre'])) {
        $nombre = trim($_GET['nombre']);
        $sql = "SELECT categorias.*, dificultades.nombre AS dificultad FROM categorias JOIN dificultades ON dificultades.id = categorias.dificultad_id WHERE categorias.nombre LIKE '%$nombre%';";
        // buscar por nombre
    } else {
        $fecha = trim($_GET['fecha']);
        if ($_GET['cuando'] == "antes") {
            $sql = "SELECT categorias.*, dificultades.nombre AS dificultad FROM categorias JOIN dificultades ON dificultades.id = categorias.dificultad_id WHERE `fecha_creacion` < '$fecha';";
        } else {
            $sql = "SELECT categorias.*, dificultades.nombre AS dificultad FROM categorias JOIN dificultades ON dificultades.id = categorias.dificultad_id WHERE `fecha_creacion` > '$fecha';";
        }
        // buscar por fecha
    }
    // Obtener conexión a la BBDD (usa la configuración centralizada)
    $conexion = obtenerConexion();

    // Consulta simple — en este caso no hay parámetros externos

    $resultado = $conexion->query($sql);

    // Recolectamos las filas en un array asociativo para serializar a JSON
    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila; // cada $fila es un array asociativo (columna => valor)
    }

    // responder() enviará un JSON con estructura { ok, datos, mensaje }
    // y cerrará la conexión si se le pasa.
    responder($datos, true, "Datos recuperados correctamente", $conexion);
} catch (mysqli_sql_exception $e) {
    // Errores específicos de mysqli (p. ej. problemas con la consulta o la conexión)
    // Enviamos un JSON de error. Usamos $conexion ?? null para evitar usar
    // una variable no definida si la conexión falló al crearse.
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    // Captura cualquier otra excepción / error inesperado
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
