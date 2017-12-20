// const knex = require('knex');
const settings = require('./settings');

// const client = new knex.Client({
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

const searchParam = process.argv[2];

getFamousPerson(searchParam);

knex.destroy();

function getFamousPerson (searchString){
  knex.select()
    .from('famous_people')
    .where('first_name', searchString)
    .orWhere('last_name', searchString)
    .asCallback((err,rows) =>{
      if (err){
        return console.error('Connection Error', err)
      }
      // console.log(rows);
      console.log(`Found ${rows.length} person(s) by the name '${searchString}': `);
    console.log(`- ${rows[0].id}: ${rows[0].first_name} ${rows[0].last_name}, born '${moment(rows[0].birthdate).format('YYYY[-]MM[-]DD')}'`);

  });
}


