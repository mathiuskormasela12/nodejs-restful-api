// ========== Server
// import all modules
import http from 'http'
import os from 'os'
import cluster from 'cluster'
import process from 'process'
import 'dotenv/config'
import { TodoService } from './todo-service.mjs'
import { generateTables } from './model/database.mjs'

if (cluster.isPrimary) {
  for (let index = 0; index < os.cpus().length; index++) {
    cluster.fork()
  }

  cluster.addListener('exit', (worker) => {
    console.log(`Worker ${worker.id} is down`)
    cluster.fork()
  })
}

if (cluster.isWorker) {
  const { PORT = 3000 } = process.env

  const todoService = new TodoService()

  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json')

    switch (request.url) {
      case '/api/todo' :
        if (request.method === 'GET') {
          todoService.getTodos(request, response)
        } else if (request.method === 'POST') {
          todoService.createTodo(request, response)
        } else if (request.method === 'PUT') {
          todoService.updateTodo(request, response)
        } else if (request.method === 'DELETE') {
          todoService.deleteTodo(request, response)
        } else {
          todoService.notFound(request, response)
        }

        break

      default:
        todoService.notFound(request, response)
    }
  })

  server.addListener('listening', async () => {
    await generateTables()
    console.log('Database connected')
  })

  server.listen(PORT, () => {
    console.log(`Magic happen at ${PORT} at process ${process.pid}`)
  })
}
