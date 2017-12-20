const pg = require('pg');
const settings = require('./settings');
const moment = require('moment');

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
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
});

function getFamousPerson (searchString){
  client.query('SELECT * FROM famous_people WHERE last_name=$1::text OR first_name=$1::text', [searchString], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name '${searchString}': `);
    console.log(`- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${moment(result.rows[0].birthdate).format('YYYY[-]MM[-]DD')}'`);
  });
}