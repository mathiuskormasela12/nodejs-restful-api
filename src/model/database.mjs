// ========== Database
// import modules
import mysql from 'mysql2'

export const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

export const generateTables = async () => {
  return new Promise((resolve, reject) => {
    const sql = `
			CREATE TABLE IF NOT EXISTS todos(
				id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
				name VARCHAR(255) NOT NULL
			);
		`

    database.query(sql, (err) => {
      if (err) reject(new Error(err.message))
      resolve(true)
    })
  })
}
