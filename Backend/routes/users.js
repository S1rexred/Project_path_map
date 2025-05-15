const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC')
    res.json(result.rows)
  } catch (err) {
    console.error('Ошибка при получении анкет:', err)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.get('/me', async (req, res) => {
  try {
    const userId = req.session.userId

    if (!userId) {
      return res.status(401).json({ message: "Пользователь не авторизован"})
    }

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
    const user = result.rows[0]

    if(!user) {
      return res.status(401).json({ message: 'Пользователь не найден'})
    }

    user.photo = `http://localhost:3001/uploads/${user.photo}`

    res.json(user)
    
  } catch (error) {
    console.error('Ошибка при получении текущего пользователя', error)
    res.status(500).json({ message: 'Ошибка сервера'})
  }
})

module.exports = router