/**************************SQL**************************/
const mysql = require("mysql2/promise");

const config = {
    host: "localhost",
    user: "root",
    password: "*******",
    database: "sql",
    waitForConnections: true,
};

module.exports = {
    mysql,
    config
}