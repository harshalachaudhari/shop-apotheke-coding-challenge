const express = require('express');
const router = express.Router();
// const fact = require('./fact');
const repositories = require('./repositories');
// router.get('/facts', fact);
router.get('/repositories', repositories);

module.exports = router;
