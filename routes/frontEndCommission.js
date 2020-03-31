const express = require('express');
const sql = require('mssql');
const router = express.Router();

var dbConfig = {
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

/* READ Price_FrontEndCommission Data */
router.get('/', (req, res, next) => {
    // connect to your database
    sql.connect(dbConfig, (err) => {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM Price_FrontEndCommission', (err, result) => {
            
            if (err) console.log(err)

            // send records as a response
            res.send(JSON.stringify(result.recordset, null, 4));
            
        });
    });
});

/* CREATE Price_FrontEndCommission Data */
router.post('/', (req, res) => {
  var data = req.body;
  console.log(data)

  // connect to your database
  sql.connect(dbConfig, (err) => {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      var sqlQuery = `INSERT INTO Price_FrontEndCommission (Source, SiteID, Carrier, TripType, Class, FrontEndCommission, Route, BookingDate, BookingEndDate, DepartureStartDate, DepartureEndDate) VALUES ('${data.Source}', '${data.SiteID}', '${data.Carrier}', '${data.TripType}', '${data.Class}', '${data.FrontEndCommission}', '${data.Route}', '${data.BookingDate}', '${data.BookingEndDate}', '${data.DepartureStartDate}', '${data.DepartureEndDate}')`;

      // query to the database and submit the new record
      request.query(sqlQuery, (err, result) => {

          if (err) console.log(err)

          // send records as a response
          res.send(JSON.stringify(result, null, 4));

      });
  });
});

/* UPDATE Price_FrontEndCommission Data */
router.put('/:id', (req, res) => {
  var data = req.body;

  // connect to your database
  sql.connect(dbConfig, (err) => {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      var sqlQuery = `UPDATE Price_FrontEndCommission SET Source = '${data.Source}', SiteID = '${data.SiteID}', Carrier = '${data.Carrier}', TripType = '${data.TripType}', Class = '${data.Class}', FrontEndCommission = '${data.FrontEndCommission}', Route = '${data.Route}', BookingDate = '${data.BookingDate}', BookingEndDate = '${data.BookingEndDate}', DepartureStartDate = '${data.DepartureStartDate}', DepartureEndDate = '${data.DepartureEndDate}' WHERE ID = ${req.params.id}`;

      // query to the database and set the record
      request.query(sqlQuery, (err, result) => {

          if (err) console.log(err)

          // send records as a response
          res.send(JSON.stringify(result, null, 4));

      });
  });
  
});

/* DELETE Price_FrontEndCommission Data */
router.delete('/:id', (req, res) => {

  // connect to your database
  sql.connect(dbConfig, (err) => {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // create query to handle single and mutliple deletes
      var sqlQuery = `DELETE FROM Price_FrontEndCommission WHERE ID IN (${req.params.id})`;
      console.log(sqlQuery);
      // query to the database and delete the record(s)
      request.query(sqlQuery, (err, result) => {

          if (err) console.log(err)

          // send records as a response
          res.send(JSON.stringify(result, null, 4));

      });
  });
  
});

module.exports = router;
