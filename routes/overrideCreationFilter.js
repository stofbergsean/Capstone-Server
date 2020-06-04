const express = require('express');
const { poolPromise } = require('../db.js');  // Import database connection pool
const router = express.Router();

/* READ Price_OverrideCreationFilter Data */
router.get('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = 'SELECT * FROM Price_OverrideCreationFilter';

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    // Use express async next function to handle errors
    next(err);

  }
});

/* CREATE Price_OverrideCreationFilter Data */
router.post('/', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `INSERT INTO Price_OverrideCreationFilter (CarrierCode, OriginCode, DestinationCode, Priority) VALUES ('${data.CarrierCode}', '${data.OriginCode}', '${data.DestinationCode}', '${data.Priority}')`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    // Use express async next function to handle errors
    next(err);

  }
});

/* UPDATE Price_OverrideCreationFilter Data */
router.put('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var data = req.body;
    var sqlQuery = `UPDATE Price_OverrideCreationFilter SET CarrierCode = '${data.CarrierCode}', OriginCode = '${data.OriginCode}', DestinationCode = '${data.DestinationCode}', Priority = '${data.Priority}' WHERE Id = ${req.params.id}`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    // Use express async next function to handle errors
    next(err);

  }
});

/* DELETE Price_OverrideCreationFilter Data */
router.delete('/:id', async (req, res, next) => {
  try {

    // Create request with mssql database server pool
    const pool = await poolPromise; 
    const request = pool.request();

    // Construct mssql query
    var sqlQuery = `DELETE FROM Price_OverrideCreationFilter WHERE Id IN (${req.params.id})`;

    // Wait for response then send to frontend
    const response = await request.query(sqlQuery);
    res.status(200).json(response.recordset);

  } catch (err) {

    // Use express async next function to handle errors
    next(err);

  }
});

module.exports = router;
