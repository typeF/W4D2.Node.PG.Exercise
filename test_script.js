const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.password,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const searchParam = process.argv[2];

client.connect((err) =>{
  if (err) {
    return console.error('Connection Error', err);
  }
  getFamousPerson(searchParam);
  // client.query('SELECT * FROM famouse_people WHERE last_name=$1::text OR first_name=$1::text', [searchParam], (err, result) => {
  //   if (err) {
  //     return console.error('error running query', err);
  //   }
  //   console.log(result.rows[0].number);
  // });
});

function getFamousPerson (searchString){
  client.query('SELECT * FROM famouse_people WHERE last_name=$1::text OR first_name=$1::text', [searchString], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
  });
}