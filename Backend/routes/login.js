const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        req.session.userId = user.id

        console.log('Сессия после логина', req.session)

        res.status(200).json({ message: 'Успешный вход' });
    } catch (err) {
        console.error('Ошибка при входе:', err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;