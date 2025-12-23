const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const sqlite3 = require("sqlite3").verbose();
require('dotenv').config();

const app = express();
const db = new sqlite3.Database("mydatabase.db");

const convertPostgresToSqlite = (sql, params) => {
    const convertedSql = sql.replace(/\$(\d+)/g, '?');
    return { sql: convertedSql, params };
};

const client = {
    run: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            const { sql: convertedSql, params: convertedParams } = convertPostgresToSqlite(sql, params);
            
            if (convertedSql.toUpperCase().includes('RETURNING')) {
                if (convertedSql.toUpperCase().includes('INSERT') || convertedSql.toUpperCase().includes('UPDATE')) {
                    db.get(convertedSql, convertedParams, (err, row) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ rows: row ? [row] : [] });
                        }
                    });
                } else {
                    db.all(convertedSql, convertedParams, (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ rows: rows || [] });
                        }
                    });
                }
            } else if (convertedSql.toUpperCase().includes('SELECT')) {
                db.all(convertedSql, convertedParams, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ rows: rows || [] });
                    }
                });
            } else {
                db.run(convertedSql, convertedParams, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ rows: [], lastID: this.lastID, changes: this.changes });
                    }
                });
            }
        });
    },
    get: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            const { sql: convertedSql, params: convertedParams } = convertPostgresToSqlite(sql, params);
            db.get(convertedSql, convertedParams, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
    all: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            const { sql: convertedSql, params: convertedParams } = convertPostgresToSqlite(sql, params);
            db.all(convertedSql, convertedParams, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    },
    close: () => {
        return new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

module.exports = {
    express,
    app,
    bcrypt,
    jwt,
    uuid,
    client
};