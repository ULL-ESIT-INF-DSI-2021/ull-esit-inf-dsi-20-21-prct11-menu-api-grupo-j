# Desarrollo de Sistemas Informáticos

## Práctica 11 - API Node/Express de gestión de información nutricional


╔═══════════════════════════════════════════════════════════════════╗

### Autores (Grupo J):

* Adrián González Hernández  --> correo: alu0101216775@ull.edu.es
* Andrea Calero Caro         --> correo: alu0101202952@ull.edu.es
* Saúl Pérez García          --> correo: alu0101129785@ull.edu.es

╚═══════════════════════════════════════════════════════════════════╝

### Estado del proyecto:

<p align="center">
    <a href='https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j'><img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j&metric=alert_status' alt='Quality Gate Status' /></a>
    <a href='https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct10-async-sockets-alu0101216775'><img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j&metric=security_rating' alt='Security Status' /></a>
    <a href='https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j'><img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j&metric=sqale_rating' alt='Maintainability Status' /></a>
    <a href='https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j'><img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j&metric=vulnerabilities' alt='Vulnerabilities' /></a>
    <a href='https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j'><img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct11-menu-api-grupo-j&metric=bugs' alt='Bugs' /></a>
</p>


▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## Índice


- Introducción
- Estructura básica del proyecto
- Estructura del Servidor
- Modelos de la API:
    - Ingredient
    - Course
    - Menu
- Rutas de la API
    - Indice de Rutas
    - Archivos de Rutas
- Despliegue
    - MongoDB Atlas
    - Heroku
- Modo de uso
- Controles de calidad con Sonar Cloud
- Desarrollo del informe con GitHub Pages
- Conclusiones


▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## Introducción

En esta práctica, se implementará una API, haciendo uso de Node/Express, permitiendo llevar a cabo operaciones de creación, lectura, modificación y borrado (Create, Read, Update, Delete - CRUD) de ingredientes, platos y menús.

Todo el código desarrollado se alojará en el repositorio generado tras la aceptación de la asignación grupal de GitHub Classroom. Además, se realiza el informe con la herramienta GitHub Pages donde se informará de la solución diseñada, haciendo hincapié en las decisiones de diseño que se ha implementado. También se indicará la estructura del proyecto, los modelos de la API, las rutas y el despliegue con MongoDB Atlas y Heroku.

▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## Estructura básica del proyecto

El proyecto se encuentra principalmente distribuido en 3 directorios.
La carpeta raíz del proyecto incluye todos los archivos de configuración, así como los archivos de github y sus acciones. Aquí también está las carpetas doc y src.

Dentro de la carpeta sec se encuentra todo el código fuente del proyecto. Allí está el archivo principal del servidor, así como los directorios models (con todos los modelos de datos) y routes (donde se almacenan las rutas y peticiones a la API).

Por último, en doc se encuentra toda la documentación derivada de este proyecto.

## Estructura del Servidor

El fichero principal del proyecto es __server.ts__. Es el encargado de gestionar el funcionamiento el servidor en _express_ sobre el que funcionará la API.

Para su implementación, se ha creado una clase Server, en la que se inicializa la aplicación.

El servidor cuenta con 4 funciones principales:

### Constructor

Genera el objeto servidor, instancia la aplicación y llama a los métodos configure() y routes(), dejando el servidor a punto para poder ponerse en modo de escucha.

### Configure

Método de configuración del servidor. Comienza creando una variable DATABASE en la que almacena la dirección de conexión de la base de datos local. A continuación, se inicializa la conexión a MongoDB mediante mongoose.

Mongoose hace uso de la variable de entorno _process.env.PORT_ para seleccionar el puerto al que se conectará. Si esta variable no existe, se utiliza la ruta almacenada en la constante DATABASE, usada para el desarrollo en local.

Se establece una serie de propiedades para el uso de mongoose, y se muestra por consola si la conexión ha sido exitosa o no. Configura el puerto de escucha al almacenado en la variable de entorno PORT, o en su defecto, al puerto 3000.

Por último, indica los middlewares que utiliza el servidor. En este caso, son los siguientes:
* Morgan: Genera un log básico cada vez que se recibe una petición, indicando el tipo, la ruta, el código de estado y el tiempo que tardó en ejecutarse.
* express.json: Permite trabajar con formato json en las peticiones y respuestas, convirtiendo los datos.
* express.urlencoded: Gestiona la codificación de las urls y los cuerpos de las peticiones.
* compression: Minimiza el tamaño de las peticiones y respuestas.

### Routes

Encargada de gestionar las rutas de la API. En este caso, únicamente indica que se hace uso de las rutas almacenadas en el índice de rutas del servidor:

```TypeScript
this.app.use(apiRoutes);
```

### Start

Función encargada de arrancar el servidor en modo de escucha. Utiliza el puerto almacenado anteriormente en la configuración.



## Modelos de la API:

Para cada tipo de dato con el que se trabajó se creó un modelo de datos y una interfaz para manejar los tipos. Se separaron para cada tipo de dato (ingredient, course y menu fichero.ts que respete los principios básicos SOLID.

### Ingredient

El primer modelo que vamos a analizar es el correspondiente a **Ingredient.ts**. Debemos asegurarnos que cada alimento que va a formar parte de un plato tenga una serie de atributos característicos, estos serán desplegados en un **Schema de mongoose**.

Como se especifica en el guión, cada ingrediente debe pertenecer a un grupo de alimentos, para ello, hemos creado un type denominado `ingredientType`. En él tendremos los 5 grupos en los que se van a clasificar:
* "CARNES-HUEVOS-LEGUMBRES"
* "VERDURAS-HORTALIZAS"
* "LACTEOS"
* "CEREALES"
* "FRUTAS"

A continuación se define la interfaz correspondiente denominada como `IngredientInterface` donde se especificará los atributos que requiere cada alimento:

```typescript
export interface IngredientInterface {
    name: string;
    location: string;
    ingredientGroup: ingredientType;
    nutrients: { carbohydrates: number, proteins: number, lipids: number };
    pricePerKg: number;
}
```

El siguiente paso será crear un esquema ya que va a ser la manera en la que vamos a poder modelar un objeto en Mongoose. Entre otras opciones, permite definir el tipo de cada una de las propiedades del objeto, si son obligatorias o no e, incluso, permite validar sus valores antes de ser almacenados en la base de datos.

Al mismo tiempo, un modelo nos va a permitir instanciar y almacenar en la base de datos documentos que se ajusten a un esquema concreto.

Cada atirbuto tendrá unas características específicas:
* `name`. Corresponde al nombre y debe ser una string, además, debe ser único ya que no puede haber dos ingredientes con un mismo nombre y además, este atributo siempre debe ser proporcionado, por lo que el campo **required** debe ser true.

* `location`. Al igual que en el caso anterior, tenemos como type, una string que será la ubicación de origen de cada ingrediente y también deberá de ser un campo requerido.

* `ingredientGroup`. Este presenta un cambio con respecto a los anteriores y es que cuenta con un enum qque es un vector donde se encuentran cada uno de los grupos de alimentos que definimos anteriormente en `ingredientType`.

* `nutrients`. Este atributo nos permite representar el valor nutricional de carbohidratos, proteínas y lípidos de cada uno de ingredientes con un valor numérico.

* `pricePerKg`. Finalmente, pricePerKg nos indica con un valor numérico el coste por cada kilo que va a tener cada uno de los alimentos.

Ya solo nos resta invocar al método ``model`` usando como argumento de tipo IngredienInterface.

```typescript  
  const Ingredient = mongoose.model<IngredientInterface>("Ingredient", IngredientSchema);
  export default Ingredient;
```

### Course

A continuación se pasa a analizar el fichero **Course.ts**, en este fichero se procura que cada plato tenga una serie de atributos característicos, estos se desplegarán en un **Schema de mongoose**.

Primero, como se especifica en el guión, cada plato debe pertenecer a un tipo de plato, para ello, se ha creado un type denominado `CourseType`. En él se tendrá los tipos de platos en los que se clasificarán:
* "STARTER"
* "FIRSTCOURSE"
* "SECONDCOURSE"
* "DESSERT"

A continuación definimos la interfaz correspondiente que denominada como `CourseInterface` donde vamos a especificar los atributos que requiere cada plato:

```typescript
export interface CourseInterface {
  name: string;
  courseType: CourseType;
  ingredients: { ingredient: IngredientInterface, amountInGrams: number }[];
  coursePrice: number;
  courseComposition: { carbohydrates: number, proteins: number, lipids: number };
  mainNutrient: string;
}
```
El siguiente paso será crear un esquema ya que va a ser la manera en la que vamos a poder modelar un objeto en Mongoose. Entre otras opciones, permite definir el tipo de cada una de las propiedades del objeto, si son obligatorias o no e, incluso, permite validar sus valores antes de ser almacenados en la base de datos.

Al mismo tiempo, un modelo nos va a permitir instanciar y almacenar en la base de datos documentos que se ajusten a un esquema concreto.

Cada atirbuto tendrá unas características específicas:

* `name`: Corresponde al nombre y debe ser una string, además, debe ser único ya que no puede haber dos platos con un mismo nombre y, este atributo siempre debe ser proporcionado, por lo que el campo **required** debe ser true.
* `courseType`: Corresponde con el tipo de plato, string, trabaja con un enum de los tipos de platos que maneja la interfaz **CourseInterface**. Además deberá de ser un campo requerido.
* `coursePrice`: Con el precio del plato. Y este es un campo requerido
* `courseComposition`: Con la composición nutricional del plato. Y este es un campo requerido.
* `ingredients`: Trabaja con un array con los tipos de ingredientes y la cantidad de estos que lleva el plato. Y este es un campo requerido

### Menu

Finalmente, trataremos con el modelo de la API encargada de la gestión de los menús, para ello se analiza el fichero **Menu.ts**. Debemos asegurarnos que cada menú tenga una serie de platos y tipos de ingredientes que lo compongan, estos serán desplegados en un **Schema de mongoose**.

Primero, se define la interfaz correspondiente denominada como `MenuInterface` donde vamos a especificar los atributos que requiere cada menú:

```typescript
export interface MenuInterface {
  name: string;
  menuPrice: number;
  courses: CourseInterface[];
  menuComposition: { carbohydrates: number, proteins: number, lipids: number };
  ingredientTypes: ingredientType[];
}
```

El siguiente paso será crear el esquema ya que va a ser la manera en la que vamos a poder modelar un objeto en Mongoose. Entre otras opciones, permite definir el tipo de cada una de las propiedades del objeto, si son obligatorias o no e, incluso, permite validar sus valores antes de ser almacenados en la base de datos.

Al mismo tiempo, un modelo nos va a permitir instanciar y almacenar en la base de datos documentos que se ajusten a un esquema concreto.

Cada atirbuto tendrá unas características específicas:

* `name`: Corresponde al nombre y debe ser una string, además, debe ser único ya que no puede haber dos menús con un mismo nombre y, este atributo siempre debe ser proporcionado, por lo que el campo **required** debe ser true.

* `menuPrice`: Corresponde al precio del menú. Y este es un campo requerido.

* `menuComposition`: Corresponde a la composición nutricional del menú teniendo en cuenta el la composición por cada plato e ingrediente. Y este es un campo requerido.

* `courses`: Corresponde con un array con los platos que contiene el menú. Es un campo requerido.

* `ingredientTypes`: Corresponde a un array que contendría los tipos de ingredientes que componen el menú, para ello teniendo en cuenta **IngredientType**.



▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## Rutas de la API

Para poder trabajar correctamente con la API, deben definirse las rutas en las que se podrán realizar peticiones. Para ello, se ha definido un índice de rutas en el fichero _index.routes.ts_ y se ha importado en el servidor.

### Índice de Rutas

En el fichero índice de las rutas se ha definido una clase ApiRoutes. Esta clase hace uso de un objeto **Router** para volver accesibles todas las rutas de la aplicación.

Define un mensaje de respuesta al hacer una petición a la raíz, indicando al usuario dónde se encuentra la API. Además, es aquí donde se importan y asignan a este Router todos los archivos de routas de la API, en este caso, las rutas de ingredientes, platos y menús. Esto se hace en el método _routes()_:

```TypeScript
routes() {
    this.router.get('/', (req, res) => {
        res.send("To use the API, you must go to: /ingredients /courses or /menus");
    })
    this.router.use(ingredientRoutes);
    this.router.use(courseRoutes);
    this.router.use(menuRoutes);
}
```

### Archivos de Rutas

Para cada tipo de modelo se ha creado un archivo de rutas para gestionar las peticiones. Todos tienen un comportamiento muy similar, por lo que se usará como ejemplo el archivo de ingredientes.

En el fichero _ingredients.routes.ts_ se almacena la ruta en la que se pueden hacer peticiones relacionadas a los ingredientes. Es aquí donde se definen los métodos encargados de procesar cada tipo de petición, y devolver la respuesta correspondiente. Todo esto se hace desde la clase IngredientRoutes, haciendo uso de un objeto Router igual que en index.

Para esta práctica se han implementado 4 tipos de peticiones diferentes:

* GET
* POST
* PATCH
* DELETE

Dentro de las peticiones GET, además, se han implementado varias opciones: obtener todos los ingredientes, obtener un ingrediente por ID u obtenerlo por título.

El método _routes()_ es el encargado de gestionar las peticiones. Para mantener el código más organizado, existe un método independiente encargado de gestionar cada tipo de petición, y routes simplemente deriva la petición al método correspondiente. Se hace de la siguiente manera:

```TypeScript
routes() {
    this.router.get('/ingredients', this.getIngredients);
    this.router.get('/ingredients/:id', this.getIngredientById);
    this.router.post('/ingredients', this.postIngredient);
    this.router.patch('/ingredients', this.patchIngredient);
    this.router.delete('/ingredients', this.deleteIngredient);
}
```

### GET 

Las peticiones get son gestionadas desde el método getIngredients(). Este método almacena en una constante un query string con el atributo "name" sobre el que se hace un find.

En caso de que la petición contenga un parámetro name, se hace una búsqueda con dicho nombre, y retorna únicamente en la respuesta aquel ingrediente cuyo atributo name coincida (ya que name está declarado como único en el esquema).

Si dicho atributo no se enviara, se devolverían todos los ingredientes presentes en la base de datos.

El método también gestiona los errores, retornando el estado correspondiente en caso de no encontrar resultados (404) o tener algún error en la búsqueda o acceso a la base de datos.

### Get by ID

El funcionamiento es similar al anterior. La principal diferencia está en que este método sólo devuelve un objeto cuando se pasa un id, y este id coincide exactamente con alguno de los ya almacenados en la base de datos.

### POST

Este método es el encargado de almacenar información en la base de datos. Para ello, la petición debe tener texto en formato JSON en el cuerpo. Este JSON debe coincidir con el formato descrito en el Schema de mongoose de Ingredient, conteniendo todos los campos definidos como requeridos. 

Al igual que get, controla que no haya ningún error a la hora de conectar con la base de datos.

### PATCH

El método PATCH se encarga de actualizar información presente en la base de datos, sin necesidad de eliminar el objeto completo. Puede hacerse de varias maneras, pero en este caso se ha utilizado el nombre como campo para seleccionar qué objeto se va a modificar, ya que está declarado como único.

Para ello, primero se comprueba que ha llegado un "name" mediante parámetro. De no ser así, retorna un error pidiendo dicho nombre. A continuación, se declaran los campos que permiten modificación, y se comprueba que en el cuerpo de la petición se estén modificando únicamente campos que lo permitan.

Por último, si esto se cumple, comprueba que el objeto que se desea modificar exista, y actualiza los valores que correspondan.

### DELETE

Para finalizar, está el método delete. Haciendo uso del name, igual que PATCH, comprueba que exista dicho parámetro. De ser así, busca en la base de datos el objeto con dicho título, lo elimina, y envía el objeto eliminado en la respuesta.

Al igual que los anteriores, se encarga de gestionar los posibles errores.


▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## Despliegue

El proyecto se ha desarrollado en mediante el uso de [**MongoBD Atlas**](https://www.mongodb.com/es), que es un servicio en la nube para bases de datos que posibilita crear bases de datos las cuales son expuestas online y por ende, permite conectar nuestras aplicaciones.
Además, para desplegar nuestra API, nos apoyamos en [**Heroku**](https://www.heroku.com/) que es una herramienta que facilita a los desarrolladores el testeo y/o análisis del comportamiento de las APIs en un entorno de pruebas.


▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## Modo de uso

En este apartado se pasará a explicar el modo de uso de la API, teniendo en cuenta el despliegue con MongoDB Atlas y Heroku. Primero, para desplegar la aplicación en Heroku, simplemente, se debe empujar los cambios al remoto añadido durante el proceso de creación de la aplicación, mediante el comando:

> `git push heroku main`

Luego se comprueban los logs correspondientes a nuestra aplicación, con el comando:

> `heroku logs | tail -10f`

Tras ello, se tendrá todo listo para la ejecución de la API, haciendo uso de un cliente como Thunder Client. La URL de conexión en la que se ha desplegado el API se guardó una variable, denotada como **URL** con la se invocará para la ejecución de las peticiones. 

A su vez en el desplegado de la aplicación se guardó como colecciones **Ingredients**, **Courses** y **Menus**. Y cada una de las colecciones consta de una serie de peticiones guardadas para su invocación. Mostrándose tal que:

![Peticiones-de-las-colecciones](https://i.imgur.com/E2ZTKrL.jpg)

Se pasará a mostrar ejemplos de ejecución de las peticiones.

**INGREDIENTS**

_POST REQUEST_

En este apartado añadiremos un request que se llama **POST ingredient MILK**, en esta petición añadiremos el ingrediente Leche con sus atributos correspondientes.

![Post-Ingredients-MILK](https://i.imgur.com/AdWaPhq.jpg)


_GET REQUEST_

Tras realizar la anterior petición POST, añadimos otra petición POST para publicar otro ingrediente **"LEMON"**, tras ello se realizó un GET Request para comprobar que se mostraba todos los ingredientes.

![GET-Ingredients](https://i.imgur.com/7WDWMJ2.jpg)

A este GET decidimos ver si mostraba a su vez sólo uno de los ingredientes identificándolo por su nombre, con la siguiente petición GET:

![GET-MILK](https://i.imgur.com/XCdz02i.jpg)


_PATCH REQUEST_

Ahora procederemos con la petición **PATCH** en donde cambiaremos la localización del ingrediente cambiando a que a ahora su localización sea **"IRELAND"**:

![PATCHREQUEST](https://i.imgur.com/SghycSM.jpg)


_DELETE REQUEST_

La siguiente petición será borrar un ingrediente por su nombre, así se borraría el ingrediente leche:

![DELETE](https://i.imgur.com/4w1X4zq.jpg)


**COURSES**

Estas peticiones son similares a las anteriores pero se mostrarán las peticiones POST y GET como ejemplo, pero específicas para la colección de platos:

_POST REQUEST_

![POST](https://i.imgur.com/dH6cYSV.jpg)

_GET REQUEST_

![GET](https://i.imgur.com/lYBLoCJ.jpg)


**MENUS**

Similar a lo que sucedía con la colección de platos se realizaría con la de menús:

_POST REQUEST_

![POST](https://i.imgur.com/tqI0rSH.jpg)


_GET REQUEST_

Para esto añadiríamos otro menú, a parte del **MENU DEL CHEF** añadimos el de  **VIVA ESPAÑA**, para que el GET opere con más opciones en vez de con un menú:

![GET](https://i.imgur.com/sOz4ubk.jpg)

Finalizando así las pruebas para comprobar la API.


▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## Controles de calidad con Sonar Cloud

La web Sonar Cloud permite hacer un seguimiento a la calidad del código, teniendo en cuenta diversos factores. Para esta práctica, se ha hecho especial hincapié a la calidad, la mantenibilidad, los bugs y la seguridad, aunque SonarCloud incluye muchos más parámetros.

Se han añadido esas insignias a la documentación del código.


▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## Desarrollo del informe con GitHub Pages

El último paso consiste en implementar GitHub Pages desde el repositorio. Para hacerlo, se debe acceder a la sección “settings” en el repositorio en GitHub. Una vez allí, en la zona “GitHub Pages” se debe hacer lo siguiente:

1. Habilitar GitHub pages en el repositorio
2. Seleccionar la rama de trabajo (en este caso, master) y la carpeta raíz (en este caso, /docs, ya que allí se encuentra el archivo index.md) y marcar save
3. Elegir un tema para la página. Una vez hecho, solo queda esperar unos segundos y acceder a la página que aparece para ver la web.


▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## Conclusiones

Como hemos podido comprobar durante la realización de esta práctica, la creación y configuración de APIs con NodeJS y un servidor en express se vuelve bastante sencillo, dejando la mayor complicación en la forma de gestionar las peticiones.

El uso de MongoDB Atlas y de Heroku, además, vuelve muy simple e intuitivo el proceso de despliegue y puesta en producción, y permite manejar de una forma sencilla las APIs REST, almacenando su información en bases de datos rápidas y eficaces.