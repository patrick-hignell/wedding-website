import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/registryEntry'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const registryEntries = await db.getAllRegistryEntries()
    res.status(StatusCodes.OK).json(registryEntries)
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
    const newRegistryEntry = await db.addRegistryEntry(req.body)
    res.status(StatusCodes.CREATED).json(newRegistryEntry)
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
    const deletedRegistryEntry = await db.deleteRegistryEntry(req.body)
    if (!deletedRegistryEntry) {
      // Check if deletion was unsuccessful
      console.log('not found')
      return res.status(StatusCodes.NOT_FOUND).send('Login not found')
    }
    res.json(deletedRegistryEntry)
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
    const updatedRegistryEntry = await db.editRegistryEntry(req.body)
    if (!updatedRegistryEntry) {
      return res.status(StatusCodes.NOT_FOUND).send('Guest not found')
    }
    res.status(StatusCodes.OK).json(updatedRegistryEntry)
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
