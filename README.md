# PHP Best Practices

Extensión para Visual Studio Code que sugiere buenas prácticas en PHP utilizando PHP_CodeSniffer.

## Características

- Analiza el código PHP al abrir o guardar archivos.
- Muestra sugerencias y advertencias basadas en el estándar de codificación seleccionado.
- Configurable a través de los ajustes de usuario de VS Code.

## Requisitos

- **PHP**: Debe estar instalado y accesible desde la línea de comandos.
- **PHP_CodeSniffer**: Instálalo globalmente usando Composer:

  ```bash
  composer global require "squizlabs/php_codesniffer=*"
