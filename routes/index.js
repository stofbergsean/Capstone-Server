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

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express api' });
});

/* READ Price_AIRCoop Data */
router.get('/aircoop', (req, res, next) => {
    // connect to your database
    sql.connect(dbConfig, (err) => {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM Price_AIRCoop', (err, result) => {
            
            if (err) console.log(err)

            // send records as a response
            res.send(JSON.stringify(result.recordset, null, 4));
            
        });
    });
});

/* CREATE Price_AIRCoop Data */
router.post('/aircoop', (req, res) => {
  var data = req.body;
  console.log(data)

  // connect to your database
  sql.connect(dbConfig, (err) => {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      var sqlQuery = `INSERT INTO Price_AIRCoop (SiteID, Carrier, Route, CampaignName, CampaignMargin, CampaignFixedMargin, CampaignStartDate, CampaignEndDate, DepartAfter, DepartBefore, Origin, Destination, COIPercentage, MaximumCOIPercentage, FixedCostPercentage) VALUES ('${data.SiteID}', '${data.Carrier}', '${data.Route}', '${data.CampaignName}', '${data.CampaignMargin}', '${data.CampaignFixedMargin}', '${data.CampaignStartDate}', '${data.CampaignEndDate}', '${data.DepartAfter}', '${data.DepartBefore}', '${data.Origin}', '${data.Destination}', '${data.COIPercentage}', '${data.MaximumCOIPercentage}', '${data.FixedCostPercentage}')`;

      // query to the database and submit the new record
      request.query(sqlQuery, (err, result) => {

          if (err) console.log(err)

          // send records as a response
          res.send(JSON.stringify(result, null, 4));

      });
  });
});

/* UPDATE Price_AIRCoop Data */
router.put('/aircoop/:id', (req, res) => {
  var data = req.body;

  // connect to your database
  sql.connect(dbConfig, (err) => {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      var sqlQuery = `UPDATE Price_AIRCoop SET SiteID = '${data.SiteID}', Carrier = '${data.Carrier}', Route = '${data.Route}', CampaignName = '${data.CampaignName}', CampaignMargin = '${data.CampaignMargin}', CampaignFixedMargin = '${data.CampaignFixedMargin}', CampaignStartDate = '${data.CampaignStartDate}', CampaignEndDate = '${data.CampaignEndDate}', DepartAfter = '${data.DepartAfter}', DepartBefore = '${data.DepartBefore}', Origin = '${data.Origin}', Destination = '${data.Destination}', COIPercentage = '${data.COIPercentage}', MaximumCOIPercentage = '${data.MaximumCOIPercentage}', FixedCostPercentage = '${data.FixedCostPercentage}' WHERE ID = ${req.params.id}`;

      // query to the database and set the record
      request.query(sqlQuery, (err, result) => {

          if (err) console.log(err)

          // send records as a response
          res.send(JSON.stringify(result, null, 4));

      });
  });
  
});

/* DELETE Price_AIRCoop Data */
router.delete('/aircoop/:id', (req, res) => {
  var data = req.body;
  
  console.log(req.params.id);

  // connect to your database
  sql.connect(dbConfig, (err) => {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // create query to handle single and mutliple deletes
      var sqlQuery = `DELETE FROM Price_AIRCoop WHERE ID IN (${req.params.id})`;
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
