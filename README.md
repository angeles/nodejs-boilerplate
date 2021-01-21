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

### Modules added:
npm install express
npm install sqlite3
npm install passport
npm install jsonwebtoken
npm install jsonschema

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
- Este challenge resulto para mi un verdadero desafio por varios motivos ademas del tiempo entre familia y trabajo, hace mas de 4 años que estoy trabajando
 en otros lenguajes no en los propuestos. 
- Elegí nodejs pensando en que como suelo usar typescript en mi trabajo actual podia facilitarme el camino. Tambien elegi nodjs por el tipo de desafio 
la posibilidad de escalabilidad (url).
- Me gustaria haber hecho tests que no se bien en nodejs que modulo uasar seria para invesitgar y refactorizar la app.
- Leyendo y buscando encontre que usar express y passport para la autenticacion coincidida con los requerimientos. En un principio analize unsar Auth0 que es lo que
uso en mi trabajo actual. De ser que la app de chat es comun a otras quizas se puede tener una api de autorizacion corriendo con auth0 o con lo que sea y desde la de
chat llamar a esa.
- Para el modelado de los datos y acceso a la base queria usar ORM pero no llegue a implementarlo ni saber cual era le mejor en este caso (sequelize, mongoose,).
Desde ya seria uno de los pasos siguientes y necesarios para que el codigo sea agnostico de la base y no tener queries literales. Dado que hay 3 o 4 queries nomas avance asi 
solo porque era un challenge.
- Me esta faltando hacer mas pruehas de errores de todas las partes.
- Me gustaria manejar un error handler pero no llegue a revisar como usarlo y alli revisaria tambien si estan correctos los error codes.
- Algo importante para no aceptar cualquier cosa sobretodo en le guardado de mensajes es validar el esquema pero lo estoy escribiendo y aun no esta completo lo comento por ahora.
- Sqlite me parece una base sencilla para un desafio asi pero no para un problema real que quiere escalar.
- Decidi dejar para despues cosas sencillas como agregar el encrypt de las password al guardarla en la base, chequeos de existencia de las tablas y desmas, revisar si las fechas estan en utc, 
- 

### TODOs and REFACTORs:
  ### TODO: Add TESTs
  ### TODO: Add Logger.
  ### TODO: Add SWAGGER and comments.
  ### TODO: Refactor: Add ORM to dbController.
  ### TODO: Refactor: review nodejs best practices.
  ### TODO: Refactor: Avoid literals strings and numbers. Remove debug or unnecesaries log.console.
  ### TODO: Add database validation on Health
  ### TODO: Add Database check where the data tables dont exists and create them.
  ### TODO: Add Encrypt and decrypt password when store on database.
  ### TODO: DB. Improve performance and connectins ( pooling users’ connections, others databases engines, etc)
  ###   TODO: Sqlite. is not the best option thinkin on scaling, could be elasticsearch o postgres.
  ###   TODO: Database security. While sqlite3 do chmod 700 /path/to/sqlitedb or disk encrypt as in Centos7. In another way add user/pwd on database and others.
  ###   TODO ANALYSIS: ORM. I prefer taht but because the time is a TODO. Choose one ORM that allows all possible db and not to write sql explicity.
  ###   TODO CODE: review dbclose and serializacion  
  ### TODO: Analyze AUTH0 API.
  ### TODO: Test token error cases.
  ### TODO: Should I compare the sender/reciept parameters with the token user?.
  ### TODO: Analyze if is ok to use strict mode.
  ### Check if the timestamp are in UTC.
  ### Check the correct error code numbers: 
  - 200	OK	Success	
  - 400	Bad Request	Input is invalid or malformed	Error
  - 401	Unauthorized	Unauthorized to publish this event	Error
  - 500	Internal Server Error	An internal error occurred during event processing	Error
  ### TODO: Validate Message Schema  
  ### -------------------------------------------------------------------------------------------------------------------------------------------------