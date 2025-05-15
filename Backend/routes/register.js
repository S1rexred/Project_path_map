const express = require('express')
const router = express.Router()
const pool = require('../db')
const multer = require('multer')
const bcrypt = require('bcrypt')
const saltRounds = 10
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})
 
const upload = multer({ storage: storage })

router.post('/', async (req, res) => {
    const { email } = req.body

    try {
        const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (existing.rows.length > 0) {
            return res.status(400).json({ message: 'Данная почта уже зарегестрирована'})
        }

    } catch (error) {
        console.error('Ошибка проверки почты', error)
        res.status(500).json({ message: 'Ошибка сервера при проверке почты'})
    }

    next()
}, upload.single('photo'), async (req, res) => {
    const [email, password, name, age, sity, time, interests, about] = req.body
    const filename = req.file.filename

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const query = 
            `INSERT INTO users (photo, email, password, name, age, sity, time, interests, about)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

        const values = [filename, email, hashedPassword, name, age, sity, time, interests, about]

        await pool.query(query, values)
        res.status(200).json({ message: 'Анкета успешно получена'})
    } catch (error) {
        console.error('Ошибка при создании анкеты:', error)
        res.status(500).json({ message: 'Ошибка сервера'})
    }
})

module.exports = router