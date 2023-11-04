const bcrypt = require('bcryptjs');

const plaintext = '5678';
// Sync version
let salt = bcrypt.genSaltSync(100);
// "$2a$10$n518gklkQGXFFKRxXHRiG." + 'secret'

let hash = bcrypt.hashSync(plaintext);
// let hash = bcrypt.hashSync(plaintext, 10);


console.log("salt:", salt);
console.log("hash:", hash);