const express = require('express');
const router = express.Router();

const repositories = require('./repositories');

router.get('/repositories', repositories);

module.exports = router;
