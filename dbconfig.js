const sql = require('mssql');

const config = {
  user: 'your_user_id',
  password: 'your_password',
  server: 'your_server_name',
  database: 'your_database_name',
  options: {
    encrypt: true, // Usar en Azure
    trustServerCertificate: true // Cambiar según la configuración de tu servidor
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
};

