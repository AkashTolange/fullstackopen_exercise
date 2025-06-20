
const express = require('express');

const morgan  = require('morgan');

const app = express();

//Middleware to parse JSON
app.use(express.json());