import express from 'express'
import * as Path from 'node:path'

// import fruitRoutes from './routes/fruits.ts'

import guestsRoutes from './routes/guests.ts'
import loginsRoutes from './routes/logins.ts'
import registryRoutes from './routes/registry.ts'
import registryEntryRoutes from './routes/registryEntry.ts'

const server = express()

server.use(express.json())

// server.use('/api/v1/fruits', fruitRoutes)
server.use('/api/v1/guests', guestsRoutes)
server.use('/api/v1/logins', loginsRoutes)
server.use('/api/v1/registry', registryRoutes)
server.use('/api/v1/registryEntry', registryEntryRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
