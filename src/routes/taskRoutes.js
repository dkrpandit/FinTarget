// src/routes/taskRoutes.js
const express = require('express');
const rateLimiter = require('../middlewares/rateLimiter');
const processTask = require('../controllers/taskController');
const router = express.Router();


router.post('/v1/task', rateLimiter, processTask);

module.exports = router;
