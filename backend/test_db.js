const db = require("./db/connection");
console.log("Does db have promise method?", typeof db.promise === 'function');
process.exit(0);
