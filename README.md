# Chat Backend Challenge v1
### Overview
This is a Nodejs based boilerplate which runs an HTTP Server configured to answer the endpoints defined.
All endpoints are configured in `index.js` and if you go deeper to the controllers

### Prerequisites

Installed Nodejs >= v8.x

### How to run it

```
npm start
```

### Documentation:

### Modules added:
- npm install express
- npm install sqlite3
- npm install jsonwebtoken
- npm install jsonschema

### Database run:
- sqlite3 test.db 

### Database creation:
- DROP TABLE IF EXISTS users;
- CREATE TABLE IF NOT EXISTS users (
	user text NOT NULL,
	password text NOT NULL
);

- DROP TABLE IF EXISTS messages;
- CREATE TABLE IF NOT EXISTS messages (
	sender integer NOT NULL,
  recipient integer NOT NULL,
	type text NOT NULL,
	content text not null,
	timestamp text not null);

### -----------------------------------------------------------------
### Comment on challenge delivery:
- IDE visual code. Tets api postman
- nodejs simple y la posibilidad de escalabilidad (url), por velocidad (manejo de eventoloop, io, http, etc),  
- Contenedores: no usare ni dockerfiles ni kuernates.
- Sqlite me parece una base sencilla para un desafio asi pero no para un problema real que quiere escalar.
- El guardado del content de los mensajes lo hago en texto en la base en formato json.
- Automatizar / mockear o lo que sea para testear los endpoints.

La siguiente es la lista de cosas que estaba para seguir:
### TODOs, POV and REFACTORs ANGELES's list:
  1. TODO: Validate Message Schema  - (in progress) -
  1. TODO: Check invalid characters on users - (in progress) -
  1. TODO: Add TESTs
  1. TODO: Add SWAGGER and more comments.
  1. TODO: Refactor: review nodejs best practices, avoid literals strings and numbers, etc. 
  1. TODO: Use module "debug" replace the log.console or add a logger.
  1. TODO: Add Encrypt and decrypt password when store on database - DONE! -
  1. TODO: Add try/catch to each endpoint on controllers. - DONE! -
  1. TODO: DATABASE. Add database verification on Health.
  1. TODO: DATABASE.  primary key is the rowid, shoudl I add explicity?
  1. TODO: DATABASE. index on recipient+rowid. 
  1. TODO: DATABASE. Add Database check where the data tables dont exists and create them.
  1. POV: DATABASE. Sqlite. is not the best option thinkin on scaling, could be elasticsearch, postgres, etc.
  1. POV: DATABASE. Database security. While sqlite3 do chmod 700 /path/to/sqlitedb or disk encrypt (Centos7). In another way add user/pwd on database and others.
  1. TODO: DATABASE. Add sequelize ORM to dbController - (in progress) -
        Because the time is a TODO. ORM allows all possible db and not to write sql explicity and more legible code.
  1. POV: DATABASE. Add a deamon to have the sqlite3 running.
  1. Analyze: AUTH0 API.
  1. TODO: Test token error cases.
  1. TODO: Test send message with all the types ande error cases.
  1. Analyze: Should I compare the sender/reciept parameters with the token user?.
  1. Analyze: is ok to use strict mode?
  1. Review: dbcloses and serializacion.
  1. Review: the timestamp are in UTC.
  1. Review: correct error code numbers: 200	OK / 400 Bad Request / 401 Unauthorized / 500	Internal Server Error
  1. Review: if there is a missing Try/Catch.
  ### --------------------------------------------------------------------------------------------------
