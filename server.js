const http = require("http");
const app = require("./app");
const env = require("dotenv");
env.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log("Server is Listning in port : " + port);

// get an environment variable which holds a user object
