import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/logins'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const logins = await db.getAllLogins()
    res.status(StatusCodes.OK).json(logins)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

router.get('/login-guests', async (req, res) => {
  try {
    const loginGuests = await db.getAllLoginsWithGuests()
    res.status(StatusCodes.OK).json(loginGuests)
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
    const newLogin = await db.addLogins(req.body)
    await db.updateLoginIds(req.body, newLogin.id)
    res.status(StatusCodes.CREATED).json(newLogin)
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
    const deletedLogin = await db.deleteLogin(req.body.id)
    if (!deletedLogin) {
      // Check if deletion was unsuccessful
      console.log('not found')
      return res.status(StatusCodes.NOT_FOUND).send('Login not found')
    }
    res.json(deletedLogin)
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
