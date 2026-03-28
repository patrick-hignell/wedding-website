import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/logins'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const newLogin = await db.addLogins(req.body)
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

export default router
