import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/guests'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const guests = await db.getAllGuests()
    res.status(StatusCodes.OK).json(guests)
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
    const newGuests = await db.addGuests(req.body)
    res.status(StatusCodes.CREATED).json(newGuests)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

// router.post('/', async (req, res) => {
//   try {
//     const newGuest = await db.addGuest(req.body)
//     res.status(StatusCodes.CREATED).json(newGuest)
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error(err.message)
//     } else {
//       console.error('something went wrong')
//     }
//     res.sendStatus(500)
//   }
// })

router.put('/', async (req, res) => {
  try {
    const updatedGuest = await db.updateGuest(req.body.id, req.body)
    if (!updatedGuest) {
      return res.status(StatusCodes.NOT_FOUND).send('Guest not found')
    }
    res.status(StatusCodes.OK).json(updatedGuest)
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
    const deletedGuest = await db.deleteGuest(req.body.id)
    console.log(deletedGuest)
    if (!deletedGuest) {
      // Check if deletion was unsuccessful
      console.log('not found')
      return res.status(StatusCodes.NOT_FOUND).send('Guest not found')
    }
    res.json(deletedGuest)
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
