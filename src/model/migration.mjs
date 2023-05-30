// ========== Migration
// import modules
import mysql from 'mysql2'
import 'dotenv/config'

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true
})

const sql = `
	CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8 COLLATE utf8_general_ci;
`

connection.query(sql, (err) => {
  if (err) throw err

  console.log('Databse has been created')
  connection.end()
})
