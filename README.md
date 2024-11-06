![icon.png](https://github.com/Ubyquit/php-best-practices-extension-vsc/blob/main/images/icon.png?raw=true)

Extensión para Visual Studio Code que sugiere buenas prácticas en PHP utilizando PHP_CodeSniffer. Esta herramienta permite a los desarrolladores escribir código PHP de calidad, alineado con los estándares de codificación, mostrando advertencias y sugerencias directamente en el editor.

## Características ✨

- **Análisis en tiempo real**: Al abrir o guardar archivos PHP, la extensión analiza el código y sugiere mejoras.
- **Mensajes en español**: Muestra advertencias y sugerencias en español basadas en los estándares PSR.
- **Personalizable**: Configura la extensión según el estándar de codificación de tu elección (por defecto, PSR12) y ajusta el nivel de advertencias.
- **Compatibilidad con PHP_CodeSniffer**: Integrado con PHP_CodeSniffer para un análisis de calidad.

## Estándares de Codificación Disponibles

- **PSR-1**: Estándar básico de codificación.
- **PSR-2**: Guía de estilo de codificación.
- **PSR-12**: Guía de estilo de codificación extendida.
- **Squiz**: Estándar de codificación desarrollado por Squiz Labs.
- **PEAR**: Estándar de codificación del repositorio de aplicaciones y extensiones de PHP.
- **Zend**: Estándar de codificación del framework Zend.

### Colores e Iconos de Mensajes

La extensión muestra diferentes colores e iconos para cada categoría de mensaje:

- 🟦 **PSR**: Mensajes relacionados con estándares básicos y guías de estilo.
- 🟩 **Squiz**: Reglas y estándares específicos de Squiz Labs.
- 🟪 **PEAR**: Estándares de estilo y convenciones del repositorio PEAR.
- 🟧 **Zend**: Reglas y estilos específicos del framework Zend.
- 🟥 **Generic**: Advertencias y errores críticos, como problemas de estructura y lógica.

## Capturas de Pantalla 📸

Aquí tienes algunos ejemplos de cómo la extensión mejora tu código PHP en tiempo real:

### Sugerencias en Malas Prácticas
![1.png](https://github.com/Ubyquit/php-best-practices-extension-vsc/blob/main/images/1.png?raw=true)

![2.png](https://github.com/Ubyquit/php-best-practices-extension-vsc/blob/main/images/2.png?raw=true)

![3.png](https://github.com/Ubyquit/php-best-practices-extension-vsc/blob/main/images/3.png?raw=true)

---

## Requisitos 📋

- **PHP**: Debe estar instalado y ser accesible desde la línea de comandos.
- **PHP_CodeSniffer**: Instala PHP_CodeSniffer globalmente usando Composer:

  ```bash
  composer global require "squizlabs/php_codesniffer=*"
  ```

  Asegúrate de que la carpeta donde Composer instala binarios globales esté en tu variable de entorno `PATH`. Para verificar la ubicación, ejecuta:

  ```bash
  composer global config bin-dir --absolute
  ```

- **Configurar PHP_CodeSniffer en VS Code**: Una vez instalado, la extensión encontrará automáticamente PHP_CodeSniffer si está en el `PATH`. Si no, puedes especificar la ruta en las configuraciones de la extensión.

---

## Instalación 🚀

1. Instala la extensión desde el [Marketplace de Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=OpSETMxico.php-best-practices)
2. Asegúrate de tener configurado PHP_CodeSniffer.
3. Reinicia Visual Studio Code y abre cualquier archivo PHP para comenzar a recibir sugerencias.

---

## Configuración ⚙️

Puedes personalizar la extensión desde los ajustes de usuario de Visual Studio Code. Busca "PHP Best Practices" en la configuración para ver todas las opciones.

### Opciones de Configuración

- **phpBestPractices.standard**: Especifica el estándar de codificación (por defecto, PSR12).
- **phpBestPractices.executablePath**: Ruta al ejecutable de PHP_CodeSniffer. Si PHP_CodeSniffer no está en el `PATH`, especifica aquí la ruta completa.

---

## Dependencias y Desarrollo 🔧

Si deseas contribuir o mejorar la extensión, sigue estos pasos para clonar y configurar el proyecto:

### Clonar el Repositorio

```bash
git clone https://github.com/Ubyquit/php-best-practices-extension-vsc.git
cd php-best-practices-extension-vsc
```

### Instalar Dependencias

Ejecuta el siguiente comando para instalar las dependencias de desarrollo:

```bash
npm install
```

### Compilar el Proyecto

Para compilar la extensión, usa el siguiente comando:

```bash
npm run compile
```

Este comando compilará el proyecto y generará los archivos necesarios en la carpeta `dist`.

### Ejecutar en Modo Observación

Para recompilar automáticamente cada vez que hagas un cambio en el código:

```bash
npm run watch
```

### Pruebas

Si deseas ejecutar pruebas (asegúrate de tener instalado `vscode-test`):

```bash
npm run test
```

---

## Contribuir 👥

¡Las contribuciones son bienvenidas! Si tienes sugerencias, mejoras o encuentras algún problema, no dudes en abrir un **issue** o enviar un **pull request**. Sigue estos pasos para contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/tu-feature`).
3. Realiza los cambios y commitea (`git commit -am 'Añadir nueva característica'`).
4. Haz un push a la rama (`git push origin feature/tu-feature`).
5. Abre un **pull request**.

---

## Créditos y Licencia 📝
![OpSET.png](https://github.com/Ubyquit/php-best-practices-extension-vsc/blob/main/images/OpSET.png?raw=true)
Desarrollado por OpSET México. Publicado bajo la licencia MIT.