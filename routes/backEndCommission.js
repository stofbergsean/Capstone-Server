const express = require('express');
const { poolPromise } = require('../db.js');  // Import database connection pool
const router = express.Router();

/* READ Price_BackEndCommission Data */
router.get('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = 'SELECT * FROM Price_BackEndCommission';

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* CREATE Price_BackEndCommission Data */
router.post('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `INSERT INTO Price_BackEndCommission (Source, SiteID, Carrier, TripType, Class, BackEndCommission, Route, Country, BookingDate, BookingEndDate, DepartureStartDate, DepartureEndDate) VALUES ('${data.Source}', '${data.SiteID}', '${data.Carrier}', '${data.TripType}', '${data.Class}', '${data.BackEndCommission}', '${data.Route}', '${data.Country}', '${data.BookingDate}', '${data.BookingEndDate}', '${data.DepartureStartDate}', '${data.DepartureEndDate}')`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* UPDATE Price_BackEndCommission Data */
router.put('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `UPDATE Price_BackEndCommission SET Source = '${data.Source}', SiteID = '${data.SiteID}', Carrier = '${data.Carrier}', TripType = '${data.TripType}', Class = '${data.Class}', BackEndCommission = '${data.BackEndCommission}', Route = '${data.Route}', Country = '${data.Country}', BookingDate = '${data.BookingDate}', BookingEndDate = '${data.BookingEndDate}', DepartureStartDate = '${data.DepartureStartDate}', DepartureEndDate = '${data.DepartureEndDate}' WHERE ID = ${req.params.id}`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* DELETE Price_BackEndCommission Data */
router.delete('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = `DELETE FROM Price_BackEndCommission WHERE ID IN (${req.params.id})`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

module.exports = router;
