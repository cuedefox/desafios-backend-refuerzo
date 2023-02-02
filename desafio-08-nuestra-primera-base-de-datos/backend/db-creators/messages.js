import { sqlite3Config } from '../config/config.js';
import knex from 'knex';

const database = knex(sqlite3Config);

database.schema.createTable('messages', table => {
    table.increments('id');
    table.string('mail');
    table.string('message');
    table.string('date');
})
.then(() => console.log('Table created'))
.catch(err => { console.log(err); throw err })
.finally(() => database.destroy())