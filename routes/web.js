var express = require('express'),
    router = express.Router(),
    web = require('../App/Controllers/UserController');



router.get('/my', web.list);

module.exports = router;