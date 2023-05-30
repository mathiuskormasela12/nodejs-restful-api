// ========== Todo Model
// import all modules
import { database } from './database.mjs'

export class Todo {
  find () {
    return new Promise((resolve, reject) => {
      database.query('SELECT * FROM todos', (err, results) => {
        if (err) return reject(new Error(err.message))
        return resolve(results)
      })
    })
  }

  create (data) {
    return new Promise((resolve, reject) => {
      database.query('INSERT INTO todos SET ?', data, (err, result) => {
        if (err) return reject(new Error(err.message))
        return resolve(result.affectedRows)
      })
    })
  }

  update (id, data) {
    return new Promise((resolve, reject) => {
      database.query('UPDATE todos SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) return reject(new Error(err.message))
        return resolve(result.affectedRows)
      })
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      database.query('DELETE FROM todos WHERE id = ?', id, (err, result) => {
        if (err) return reject(new Error(err.message))
        return resolve(result.affectedRows)
      })
    })
  }
}
