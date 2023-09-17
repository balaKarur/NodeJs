const { log } = require('console');
const http = require('http');
//import routes from "./router";
const routes = require("./router");
const server = http.createServer(routes);

server.listen(9000,() => {
    log("Server listening at 9000 port")
})