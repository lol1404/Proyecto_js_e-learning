# Learnova: plataforma e-learning

## Enlaces

- **Proyecto en GitHub:** https://github.com/lol1404/Proyecto_js_e-learning
- **Alojamiento local:** http://localhost:8080/js/Proyecto_js_e-learning/
- **Alojamiento público:** no hay una URL pública configurada actualmente.
- **phpMyAdmin local:** http://localhost:8081/

## Requisitos y puesta en marcha

El proyecto utiliza PHP, MySQL y Apache. En este entorno se ejecuta con el stack Docker LAMP del directorio padre.

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Desde la raíz de `docker-lamp`, configura el archivo `.env` con `APACHE_PORT=8080`, `MYSQL_PORT=3307` y `MYSQL_ROOT_PASSWORD=root_dev_123`.
3. Inicia los servicios desde esa misma carpeta con:

```sh
docker compose up -d
```

4. Crea la base de datos e importa sus tablas y datos iniciales desde la raíz de `docker-lamp`. Este comando elimina y vuelve a crear `learnova`, por lo que debe usarse solo al inicializar o cuando se quiera reiniciar la base:

```sh
docker compose exec -T db mysql -uroot -proot_dev_123 < www/js/Proyecto_js_e-learning/sql/backup.sql
```

5. Abre el alojamiento local indicado arriba.

La ruta del backend se calcula respecto a la página, por lo que la carpeta `php` debe permanecer dentro de este proyecto.

## Base de datos

Configuración que utiliza actualmente `php/config.php`:

| Parámetro | Valor local |
|---|---|
| Base de datos | `learnova` |
| Usuario | `root` |
| Contraseña | `root_dev_123` |
| Servidor desde PHP | `db` |
| Puerto interno de MySQL | `3306` |
| Puerto de MySQL desde el equipo anfitrión | `3307` |

Estas credenciales son únicamente para desarrollo local. No las uses en un servidor público; configura allí un usuario de base de datos propio, una contraseña segura y actualiza la configuración de PHP para que coincida.

## Estructura

- `index.html`: interfaz de Learnova.
- `js/`: lógica de la aplicación y peticiones AJAX.
- `php/`: operaciones de consulta y mantenimiento de datos.
- `sql/backup.sql`: creación de la base `learnova`, sus tablas y datos iniciales.
