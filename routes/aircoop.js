const express = require('express');
const { poolPromise } = require('../db.js');  // Import database connection pool
const router = express.Router();

/* READ Price_AIRCoop Data */
router.get('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = 'SELECT * FROM Price_AIRCoop';

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* CREATE Price_AIRCoop Data */
router.post('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `INSERT INTO Price_AIRCoop (SiteID, Carrier, Route, CampaignName, CampaignMargin, CampaignFixedMargin, CampaignStartDate, CampaignEndDate, DepartAfter, DepartBefore, Origin, Destination, COIPercentage, MaximumCOIPercentage, FixedCostPercentage) VALUES ('${data.SiteID}', '${data.Carrier}', '${data.Route}', '${data.CampaignName}', '${data.CampaignMargin}', '${data.CampaignFixedMargin}', '${data.CampaignStartDate}', '${data.CampaignEndDate}', '${data.DepartAfter}', '${data.DepartBefore}', '${data.Origin}', '${data.Destination}', '${data.COIPercentage}', '${data.MaximumCOIPercentage}', '${data.FixedCostPercentage}')`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* UPDATE Price_AIRCoop Data */
router.put('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `UPDATE Price_AIRCoop SET SiteID = '${data.SiteID}', Carrier = '${data.Carrier}', Route = '${data.Route}', CampaignName = '${data.CampaignName}', CampaignMargin = '${data.CampaignMargin}', CampaignFixedMargin = '${data.CampaignFixedMargin}', CampaignStartDate = '${data.CampaignStartDate}', CampaignEndDate = '${data.CampaignEndDate}', DepartAfter = '${data.DepartAfter}', DepartBefore = '${data.DepartBefore}', Origin = '${data.Origin}', Destination = '${data.Destination}', COIPercentage = '${data.COIPercentage}', MaximumCOIPercentage = '${data.MaximumCOIPercentage}', FixedCostPercentage = '${data.FixedCostPercentage}' WHERE ID = ${req.params.id}`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* DELETE Price_AIRCoop Data */
router.delete('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = `DELETE FROM Price_AIRCoop WHERE ID IN (${req.params.id})`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

module.exports = router;
