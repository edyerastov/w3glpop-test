const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const sqlite3 = require("sqlite3").verbose();
require('dotenv').config();

const app = express();
const client = new sqlite3.Database("mydatabase.db");

module.exports = {
    express,
    app,
    bcrypt,
    jwt,
    uuid,
    client
};