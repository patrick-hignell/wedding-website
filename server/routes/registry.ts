import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/registry'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const registry = await db.getAllRegistry()
    res.status(StatusCodes.OK).json(registry)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    const newRegistry = await db.addRegistry(req.body)
    res.status(StatusCodes.CREATED).json(newRegistry)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

router.delete('/', async (req, res) => {
  try {
    const deletedRegistry = await db.deleteRegistry(req.body)
    if (!deletedRegistry) {
      // Check if deletion was unsuccessful
      console.log('not found')
      return res.status(StatusCodes.NOT_FOUND).send('Login not found')
    }
    res.json(deletedRegistry)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

router.put('/', async (req, res) => {
  try {
    const updatedRegistry = await db.editRegistry(req.body)
    if (!updatedRegistry) {
      return res.status(StatusCodes.NOT_FOUND).send('Guest not found')
    }
    res.status(StatusCodes.OK).json(updatedRegistry)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

export default router
