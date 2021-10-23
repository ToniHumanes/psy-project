# Aplicación web para consejos psicológicos.

* El proyecto se ha realizado con las siguientes tecnologías:

**HTML5, CSS3, SCSS, TYPESCRIPT, VANILLA JAVASCRIPT, RXJS.**

* El proyecto se compila con webpack y se deberán seguir los siguientes pasos para su correcta instalación:

```
npm install
```
Ese comando descargará todos los módulos de node necesarios para ejecutar el proyecto.

* Cuando termine de instalar los node_modules, entonces podermos ejecutar el proyecto de con el siguiente comando

```
npm start
```
Para que eso funcione, recuerden que deben de ejecutar ese comando en el mismo directorio donde se encuentra el ```package.json```

## Cambiar el puerto
Por defecto, el puerto que configuré para este proyecto es el ```8081```, pero si necesitan cambiarlo porque pueda que ese puerto lo use su computadora, pueden cambiarlo abriendo el ```package.json``` >> scripts. Ahí verán la instrucción que lanza el servidor de desarrollo

```
"start": "webpack-dev-server --mode development --open --port=8081"
```

Simplemente cambian el puerto por el que ustedes necesiten y listo. (lógicamente graban los cambios antes de ejecutar el ```npm start``` nuevamente)


