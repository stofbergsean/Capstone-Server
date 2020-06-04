const express = require('express');
const { poolPromise } = require('../db.js');  // Import database connection pool
const router = express.Router();

/* READ Price_MetaExpense Data */
router.get('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = 'SELECT * FROM Price_MetaExpense';

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* CREATE Price_MetaExpense Data */
router.post('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `INSERT INTO Price_MetaExpense (Source, SiteID, Carrier, TripType, MetaExpense, Route, BookingDate, BookingEndDate, DepartureDate, DepartureEndDate) VALUES ('${data.Source}', '${data.SiteID}', '${data.Carrier}', '${data.TripType}', '${data.MetaExpense}', '${data.Route}', '${data.BookingDate}', '${data.BookingEndDate}', '${data.DepartureDate}', '${data.DepartureEndDate}')`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* UPDATE Price_MetaExpense Data */
router.put('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `UPDATE Price_MetaExpense SET Source = '${data.Source}', SiteID = '${data.SiteID}', Carrier = '${data.Carrier}', TripType = '${data.TripType}', MetaExpense = '${data.MetaExpense}', Route = '${data.Route}', BookingDate = '${data.BookingDate}', BookingEndDate = '${data.BookingEndDate}', DepartureDate = '${data.DepartureDate}', DepartureEndDate = '${data.DepartureEndDate}' WHERE ID = ${req.params.id}`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

/* DELETE Price_MetaExpense Data */
router.delete('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = `DELETE FROM Price_MetaExpense WHERE ID IN (${req.params.id})`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    console.log(err);
    next(err);        // Use express async next function to handle errors

  }
});

module.exports = router;
