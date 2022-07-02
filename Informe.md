<i>Universidad Peruana de Ciencias Aplicadas</i>
 
<h1>Informe de Participación</h1>
 
<h3>CURSO DE COMPUTACIÓN GRÁFICA </h3><br>
Carrera de Ciencias de la Computación

 
Diego Andre Pereira Jacobs - u201723546<br>
Luis Alonso Pineda Knox - u201915747<br>
Junio 2022

<b>Introducción</b><br><br>
La computación gráfica es el área de la informática que trata con la visualización de objetos en un espacio virtual usando diversos cálculos matriciales
complejos y buffers para permitir al ordenador renderizar de forma eficiente dicho objeto, no sólo como un conjunto de pixeles, pero un objeto el cual
se puede apreciar desde cualquier ángulo, así mismo este objeto puede interactuar con otros objetos sea por métodos como colisiones o reflejos.

<b>Objetivos</b><br><br>
El objetivo principal del proyecto consiste en la aplicación de los principales tópicos aprendidos en la segunda mitad del curso,los cuales abarcan temas
como el instanciamiento de objetos y las fuentes de luz. Estos conceptos serán aplicados en un proyecto de WebGL simple que permitirá al estudiante poner
a prueba sus conocimientos adquiridos durante el ciclo.

<b>Problema</b><br><br>
Para este proyecto, se planteó como problemática la elaboración de un prototipo sencillo que permita poner en práctica el instanciamiento de objetos y  
luces en un mismo escenario. Adicionalmente, se pidió como requerimiento el uso de no menos de 50000 instancias de un elemento, por lo que era necesario
desarrollar dicho prototipo teniendo en cuenta el rendimiento del aplicativo.

<b>Descripción de la solución propuesta</b><br><br>
Teniendo el problema planteado en mente, se optó por elaborar una réplica simplificada del concepto original del videojuego Minecraft, en la que se instancian
objetos (cubos) a manera de escenario y estos se repiten proceduralmente de forma infinita. De esta manera, el escenario renderizado tendría una alta cantidad
de elementos instanciados (en nuestro caso 250000) y gracias a la amplitud del terreno, se podría apreciar fácilmente los reflejos de la luz en los elementos y
como la distancia a la que se encuentren de la fuente afecta como se renderizan las texturas de los mismos cubos..

<b>Desarrollo</b><br><br>
Instanciamiento<br>
En esta primera fase del desarrollo se adaptó del trabajo parcial las texturas previamente utilizadas, y utilizó matrices para almacenar la información de
cada instancia a renderizar. ![Captura](https://user-images.githubusercontent.com/35857164/176992448-53fa681b-72db-45c2-af8d-c090f8a5337b.PNG) <br>
Perlin Noise<br>
Como se puede apreciar en la imagen superior, se trabajó con Perlin Noise, lo que nos permitió asignar alturas variables procedurales a cada instancia, lo
que genera un efecto de terreno. ![Captura2](https://user-images.githubusercontent.com/35857164/176992518-81e028bc-514a-4873-8f3a-746f9be590f4.PNG) <br>
Luz<br>
Para la luz se utilizaron shaders para modificar la manera en la que se renderizaban las texturas de cada cubo. La fuente de luz por la que se optó fue una
fuente estática rotatoria, a manera de faro, la cual cual generó el efecto que se puede apreciar en la imagen superior.

<b>Conclusiones</b><br><br>
Para optimizar el rendimiento del proyecto es importante siempre minimizar la cantidad de variables que tienen que ser ejecutadas por cada frame cycle, para
lo cual fue necesario el uso de diversas técnicas. Al comienzo aprendimos cómo usar vbo y vao para reducir la cantidad de información redundante en un solo 
objeto usando arreglos correlacionados. Asimismo, en esta segunda parte del curso, aprendimos a usar Instancias para reducir la cantidad de información redundante
de un conjunto de objetos similares. La implementación de dicho instanciamiento tuvo un efecto impactante sobre nuestro proyecto y permitió que agregaramos más
funcionalidades como es el de los puntos de luz, sin afectar el rendimiento del código. Muy por el contrario, tras los recientes cambios, podemos apreciar que el
proyecto ahora corre a más del doble de cuadros por segundo en comparación con su primera versión.
