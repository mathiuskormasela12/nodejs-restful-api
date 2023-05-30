// ========= Todo Service
// import all modules
import { Todo } from './model/Todo.mjs'

export class TodoService {
  constructor () {
    this.todoModel = new Todo()
  }

  generateResponse (code, message, data) {
    return JSON.stringify({
      code,
      message,
      data
    })
  }

  async getTodos (request, response) {
    try {
      const todos = await this.todoModel.find()

      response.writeHead(200)
      response.write(this.generateResponse(200, 'OK', todos))
      response.end()
    } catch (err) {
      response.writeHead(500)
      response.write(this.generateResponse(500, err.message, []))
      response.end()
    }
  }

  async createTodo (request, response) {
    request.addListener('data', async (data) => {
      const body = JSON.parse(data.toString())

      try {
        await this.todoModel.create(body)
        response.writeHead(201)
        response.write(this.generateResponse(201, 'Created'))
        response.end()
      } catch (err) {
        response.writeHead(500)
        response.write(this.generateResponse(500, err.message, []))
        response.end()
      }
    })
  }

  async updateTodo (request, response) {
    request.addListener('data', async (data) => {
      const body = JSON.parse(data.toString())

      try {
        await this.todoModel.update(body.id, { name: body.name })
        response.writeHead(200)
        response.write(this.generateResponse(200, 'Updated'))
        response.end()
      } catch (err) {
        response.writeHead(500)
        response.write(this.generateResponse(500, err.message, []))
        response.end()
      }
    })
  }

  async deleteTodo (request, response) {
    let body = null

    // Menerima dan assign request body kedalam body varriavel
    request.addListener('data', (data) => {
      body = JSON.parse(data.toString())
    })

    request.addListener('end', async () => {
      if (body !== null) {
        try {
          await this.todoModel.delete(body.id)
          response.writeHead(200)
          response.write(this.generateResponse(200, 'Deleted'))
          response.end()
        } catch (err) {
          response.writeHead(500)
          response.write(this.generateResponse(500, err.message, []))
          response.end()
        }
      } else {
        response.writeHead(400)
        response.write(this.generateResponse(400, 'Name is required'))
        response.end()
      }
    })
  }

  notFound (request, response) {
    response.writeHead(404)
    response.write(JSON.stringify({
      code: 400,
      message: 'Not Found'
    }))
    response.end()
  }
}
