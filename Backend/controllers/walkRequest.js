const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/', async (req, res) => {
    const { from_email, to_email, proposed_time, comment } = req.body

    try {
        await pool.query(`
            INSERT INTO walk_requests (from_email, to_email, proposed_time, comment)
            VALUES ($1, $2, $3, $4)
        `, [from_email, to_email, proposed_time, comment])

        res.status(200).json({ message: 'Предложение отправлено!' })
    } catch (error) {
        console.error('Ошибка при отправке предложения', error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

router.get('/notifications/:to_email', async (req, res) => {
    const { to_email } = req.params

    try {
        const result = await pool.query(`
            SELECT * FROM walk_requests 
            WHERE to_email = $1 AND is_read = FALSE
        `, [to_email])

        res.json(result.rows)
    } catch (error) {
        console.error('Ошибка при получении уведомлений', error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

module.exports = router