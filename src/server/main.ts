import { createServer } from 'http'
import { connect, connection } from 'mongoose'
import express = require('express')
import bodyParser = require('body-parser')
import deploymentsRouter from 'api/deployments-router'

const {
  CLIENT_HOST,
  API_HOST,
  API_PORT,
  API_PROXY_PATH,
  CONNECTION_STRING,
} = process.env

if (typeof CONNECTION_STRING === 'string') {
  connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('\nMongo connection is closed')
      process.exit(0)
    })
  })
}

const app = express().use(bodyParser.json())

deploymentsRouter(app)
createServer(app).listen({ host: API_HOST, port: API_PORT }, createServerCb)

function createServerCb() {
  console.log(
    `\nServer started. API available by following address: http://${CLIENT_HOST}${API_PROXY_PATH}\n`
  )
}
