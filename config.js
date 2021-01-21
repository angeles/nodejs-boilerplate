var config = {};

//database
config.database = {};
config.database.server = 'localhost';
config.database.database = 'sqlite3';
config.database.base = 'test.db';

//web
config.web = {};
config.web.port = process.env.PORT || 8080;

//storemessagedata
config.storage = {};
config.storage.typescount = 4;
//LEAVE for future changes..
config.storage.types = {
    1:{name:"text",ext:"txt"},
    2:{name:"image",ext:"jpg"},
    3:{name:"video",ext:"mp4"},
    4:{name:"audio",ext:"txt"}
};

module.exports = config;