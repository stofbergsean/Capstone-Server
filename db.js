const sql = require('mssql')

// Database configurations
const dbConfig = {
    server: 'localhost',
    port: 1433,
    user: 'SA',
    password: 'Password01',
    database: 'Capstone_DB',
    connectionTimeout: 150000,
    driver: 'tedious',
    stream: false,
    options: {
      appName: 'Server',
      encrypt: false
    },
    pool: {
      max: 20,
      min: 0,
      idleTimeoutMillis: 30000
    }
  }

// Database pool for use accross routes
const pool = new sql.ConnectionPool(dbConfig);
const poolPromise = pool
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
}