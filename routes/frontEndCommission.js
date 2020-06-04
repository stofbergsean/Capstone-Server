const express = require('express');
const { poolPromise } = require('../db.js');  // Import database connection pool
const router = express.Router();

/* READ Price_FrontEndCommission Data */
router.get('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = 'SELECT * FROM Price_FrontEndCommission';

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* CREATE Price_FrontEndCommission Data */
router.post('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `INSERT INTO Price_FrontEndCommission (Source, SiteID, Carrier, TripType, Class, FrontEndCommission, Route, BookingDate, BookingEndDate, DepartureStartDate, DepartureEndDate) VALUES ('${data.Source}', '${data.SiteID}', '${data.Carrier}', '${data.TripType}', '${data.Class}', '${data.FrontEndCommission}', '${data.Route}', '${data.BookingDate}', '${data.BookingEndDate}', '${data.DepartureStartDate}', '${data.DepartureEndDate}')`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* UPDATE Price_FrontEndCommission Data */
router.put('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `UPDATE Price_FrontEndCommission SET Source = '${data.Source}', SiteID = '${data.SiteID}', Carrier = '${data.Carrier}', TripType = '${data.TripType}', Class = '${data.Class}', FrontEndCommission = '${data.FrontEndCommission}', Route = '${data.Route}', BookingDate = '${data.BookingDate}', BookingEndDate = '${data.BookingEndDate}', DepartureStartDate = '${data.DepartureStartDate}', DepartureEndDate = '${data.DepartureEndDate}' WHERE ID = ${req.params.id}`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* DELETE Price_FrontEndCommission Data */
router.delete('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = `DELETE FROM Price_FrontEndCommission WHERE ID IN (${req.params.id})`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

module.exports = router;
