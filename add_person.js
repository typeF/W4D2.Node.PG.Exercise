const settings = require('./settings');
const knex = require('knex')({
  client:'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

const firstname = process.argv[2];
const lastname = process.argv[3];
const birthdate = process.argv[4];

addFamousPerson(firstname, lastname, birthdate);

knex.destroy();

function addFamousPerson (name, surname, bday) {
  knex('famous_people')
    .insert([{first_name: name, last_name: surname, birthdate: bday}])
    .asCallback(err =>{
      if (err){
        return console.error('Connection Error', err)
      }
      console.log("Successfully inserted into table");
  });
}


