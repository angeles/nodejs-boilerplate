# ASAPP Chat Backend Challenge v1
### Overview
This is a Nodejs based boilerplate which runs an HTTP Server configured to answer the endpoints defined in 
[the challenge you received](https://backend-challenge.asapp.engineering/).
All endpoints are configured in `index.js` and if you go deeper to the controllers
for each route, you will find a *TODO* comments where you are free to implement your solution.

### Prerequisites

Installed Nodejs >= v8.x

### How to run it

```
npm start
```

##### Note
You can remove/modify this file for documenting your solution.

###############################################################################################

### Modules added:
- npm install express
- npm install sqlite3
- npm install jsonwebtoken
- npm install jsonschema

### Database run:
- sqlite3 test.db 

### Database creation:
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	user text NOT NULL,
	password text NOT NULL
);

DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
	sender integer NOT NULL,
  recipient integer NOT NULL,
	type text NOT NULL,
	content text not null,
	timestamp text not null);
  
  ### notes:
  - primary key is the rowid- 
  - primary key need to add explicity?
  - index on recipient+rowid?

### -------------------------------------------------------------------------------------------------------------------------------------------------
### Comment on challenge delivery:
- Este challenge resulta para mi un desafio por varios motivos, mas allá de tiempo entre familia y trabajo, hace muchos años que estoy trabajando en otros
 lenguajes no en los sugeridos. Esto me entusiasmó mucho al al ir aprendiendo cosas nuevas rapidamente.
- El desarollo lo hice desde visual code visualizando alli mismo el node y el sqlite3 como se ve en la imagen ./entornoDesarrollo.png y probando la api 
desde postman como se ve en ./postmanImage.png. El configurar del entorno, hacer pruebas primero con java, etc. fue parte del arranque junto con entender el requerimiento.
- Elegí nodejs pensando en que como suelo usar typescript en mi trabajo actual podía facilitarme el camino. También elegí nodjs por el tipo de desafio 
la posibilidad de escalabilidad (url), por velocidad (manejo de eventoloop, io, http, etc),  
- Me gustaria haber hecho tests que no se bien en nodejs que modulo uasar seria para invesitgar y refactorizar la app.
- Leyendo y buscando encontre que usar express y passport para la autenticacion coincidida con los requerimientos. En un principio analize unsar Auth0 que es lo que
uso en mi trabajo actual. De ser que la app de chat es comun a otras quizas se puede tener una api de autorizacion corriendo con auth0 o con lo que sea y desde la de
chat llamar a esa.
- Para el modelado de los datos y acceso a la base queria usar ORM queria hacerlo hoy pero no llegue a implementarlo (sequelize https://sequelize.org/).
Desde ya seria uno de los pasos siguientes y necesarios para que el codigo sea agnostico de la base, no tener queries literales y seam mejor para compartir.
- Me esta faltando hacer mas pruehas de errores de todas las partes.
- Me gustaria manejar un error handler pero no llegue a revisar como usarlo y alli revisaria tambien si estan correctos los error codes.
- Algo importante sobretodo en el guardado de mensajes es validar el esquema, lo estoy escribiendo y aun no esta completo lo comento por ahora.
- Sqlite me parece una base sencilla para un desafio asi pero no para un problema real que quiere escalar.
- Decidi dejar para despues el revisar la utilizacion de los models, basicamente por desconocimiento del uso del lenguaje para este caso. Lo dejo asi por ahora. 
Seria una investigacion y refactorizacion.
- Decidi dejar para despues cosas sencillas como agregar el encrypt de las password al guardarla en la base, chequeos de existencia de las tablas y desmas, revisar si las fechas estan en utc, 
- Calidad del codigo: entre las cosas q me faltaron fue agregar tr/catchs para evitare errores:
    try {
        var jsonrequest = JSON.parse(req.query.params); //o req.body
        //....
      } catch (e) {
        res.status(400).send('Invalid JSON string');
      }
  y validacion de esquema en especial al salvar los messages.
- El guardado del content de los mensajes lo hago en texto en la base en formato json.
- Automatizar / mockear o lo que sea para testear los endpoints.

La siguiente es la lista de cosas que estaba para seguir:
### TODOs, POV and REFACTORs ANGELES's list:
  ### TODO: Validate Message Schema  - (in progress) -
  ### TODO: Check invalid characters on users - (in progress) -
  ### TODO: Add TESTs
  ### TODO: Add SWAGGER and more comments.
  ### TODO: Refactor: review nodejs best practices, avoid literals strings and numbers, etc. 
  ### TODO: Use module "debug" replace the log.console or add a logger.
  ### TODO: Add Encrypt and decrypt password when store on database - DONE! -
  ### TODO: Add try/catch to each endpoint on controllers. - DONE! -
  ### TODO: DATABASE.
  ### TODO: Add database verification on Health.
  ###   TODO: Add Database check where the data tables dont exists and create them.
  ###   POV: Sqlite. is not the best option thinkin on scaling, could be elasticsearch, postgres, etc.
  ###   POV: Database security. While sqlite3 do chmod 700 /path/to/sqlitedb or disk encrypt (Centos7). In another way add user/pwd on database and others.
  ###   TODO: Add sequelize ORM to dbController - (in progress) -
  ###      Because the time is a TODO. ORM allows all possible db and not to write sql explicity and more legible code.
  ###   POV: Add a deamon to have the sqlite3 running.
  ### Analyze: AUTH0 API.
  ### TODO: Test token error cases.
  ### TODO: Test send message with all the types ande error cases.
  ### Analyze: Should I compare the sender/reciept parameters with the token user?.
  ### Analyze: is ok to use strict mode?
  ### Review: dbcloses and serializacion.
  ### Review: the timestamp are in UTC.
  ### Review: correct error code numbers: 200	OK / 400 Bad Request / 401 Unauthorized / 500	Internal Server Error
  ### Review: if there is a missing Try/Catch.
  ### -------------------------------------------------------------------------------------------------------------------------------------------------
