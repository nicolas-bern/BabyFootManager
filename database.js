
const { Client } = require('pg');

const client = new Client({
  user: 'apple',
  host: 'localhost',
  database: 'bfm',
  password: 'epsi2020',
  port: 5432
})


client.connect()

module.exports = client