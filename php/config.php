<?php

$basedatos = array(
    "basedatos" => "learnova",
    "usuario" => "root",
    "password" => "root_dev_123",
    "servidor" => "db",
    "puerto" => 3306
);


error_reporting(E_ERROR | E_PARSE);

mysqli_report(MYSQLI_REPORT_OFF);





function obtenerConexion() {
    // Accedemos a la configuración global $basedatos
    global $basedatos;

    try {
        // Creamos la conexión usando los parámetros del array
        $conexion = new mysqli(
            $basedatos["servidor"],
            $basedatos["usuario"],
            $basedatos["password"],
            $basedatos["basedatos"],
            $basedatos["puerto"]
        );

        // Fijamos el conjunto de caracteres a utf8mb4 para soportar emojis y acentos
        $conexion->set_charset("utf8mb4");
        
        return $conexion;
    } catch (mysqli_sql_exception $e) {
        // En caso de error de conexión, devolvemos un JSON con error y paramos
        // responder() hace exit por nosotros. Pasamos null como conexión.
        responder(null, false, "Error de conexión: " . $e->getMessage(), null);
    }
}



function responder($datos, $ok, $mensaje, $conexion = null)
{
    // Cabecera indicando que la respuesta es JSON y con codificación UTF-8
    header('Content-Type: application/json; charset=utf-8');

    // Estructura de la respuesta que el frontend esperará:
    // { ok: bool, datos: any, mensaje: string }
    echo json_encode([
        "ok" => $ok,
        "datos" => $datos,
        "mensaje" => $mensaje
    ], JSON_UNESCAPED_UNICODE);

    // Si nos pasan la conexión, la cerramos aquí para evitar fugas
    if ($conexion) {
        $conexion->close();
    }

    // exit con código 0 si ok==true, o 1 si ok==false.
    // Esto detiene la ejecución del script inmediatamente.
    exit($ok ? 0 : 1);
}
