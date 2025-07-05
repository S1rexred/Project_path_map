const path = require('path');
const express = require('express');
const app = express();
const PORT = 3001;
const session = require('express-session')
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use(session({
  secret: 'секретная_строка',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite:'lax'
  }
}))

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

const login = require('./controllers/login')
app.use('/login', login)

const usersRouter = require('./routes/users')
app.use('/api/users', usersRouter)

const registerRoute = require('./controllers/register')
app.use('/api/register', registerRoute)

const walk_requests = require('./controllers/walkRequest')
app.use('/api/walkRequest', walk_requests)

// Статические файлы из сборки React
const frontendPath = path.resolve(__dirname, '..', 'Frontend', 'dist');
app.use(express.static(frontendPath));

// Обработка всех маршрутов — отправляем index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/single-route', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/registration', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/edit', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/api/notifications', (res, req) => {
  const email = req.session?.email
  if (!email) return res.statusCode(401).json({ error: 'not logged in'})

    const userNotifications = notifications.filter(n => n.to_email === email)
    res.json(userNotifications)
})

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер находится по адресу http://localhost:${PORT}`);
});