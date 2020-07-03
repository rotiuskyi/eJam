import { createServer } from 'http'
import express = require('express')
import bodyParser = require('body-parser')
import deploymentsRouter from 'api/deployments-router'

const { CLIENT_HOST, API_HOST, API_PORT, API_PROXY_PATH } = process.env

const app = express().use(bodyParser.json())

deploymentsRouter(app)
createServer(app).listen({ host: API_HOST, port: API_PORT }, createServerCb)

function createServerCb() {
  console.log(
    `\nServer started. API available by following address: http://${CLIENT_HOST}${API_PROXY_PATH}\n`
  )
}
