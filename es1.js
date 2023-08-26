const crypto = require("crypto");
const randomID = crypto.randomBytes(16).toString("hex");

console.log("ID casuale generato:", randomID);


//si può fare anche direttamente nel REPL
