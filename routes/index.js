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

/* GET Price_AIRCoop Data */
router.get('/aircoop', (req, res, next) => {
    // connect to your database
    sql.connect(dbConfig, (err) => {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Price_AIRCoop', (err, result) => {
            
            if (err) console.log(err)

            // send records as a response
            res.send(JSON.stringify(result.recordset, null, 4));
            
        });
    });
});

/* GET Price_AIRCoop Data */
router.post('/aircoop', (req, res) => {
  var data = req.body;
  console.log(data)
  
  // connect to your database
  sql.connect(dbConfig, (err) => {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      var sqlQuery = 'INSERT INTO Price_AIRCoop (SiteID, Carrier, Route, CampaignName, CampaignMargin, CampaignFixedMargin, CampaignStartDate, CampaignEndDate, DepartAfter, DepartBefore, Origin, Destination, COIPercentage, MaximumCOIPercentage, FixedCostPercentage) VALUES (' + "'" + data.SiteID + "'" + ',' + "'" + data.Carrier + "'" + ',' + "'" + data.Route + "'" + ',' + "'" + data.CampaignName + "'" + ',' + "'" + data.CampaignMargin + "'" + ',' + "'" + data.CampaignFixedMargin + "'" + ',' + "'" + data.CampaignStartDate + "'" + ',' + "'" + data.CampaignEndDate + "'" + ',' + "'" + data.DepartAfter + "'" + ',' + "'" + data.DepartBefore + "'" + ',' + "'" + data.Origin + "'" + ',' + "'" + data.Destination + "'" + ',' + "'" + data.COIPercentage + "'" + ',' + "'" + data.MaximumCOIPercentage + "'" + ',' + "'" + data.FixedCostPercentage + "'" + ')';
      // , CampaignFixedMargin, CampaignStartDate, CampaignEndDate, DepartAfter, DepartBefore, Origin, Destination, COIPercentage, MaximumCOIPercentage, FixedCostPercentage
      console.log(sqlQuery);
      // query to the database and get the records
      request.query(sqlQuery, (err, result) => {

          if (err) console.log(err)

          // send records as a response
          res.send(JSON.stringify(result, null, 4));

      });
  });
});

module.exports = router;
