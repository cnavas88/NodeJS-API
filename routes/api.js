var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({
        "message": "INDEX PAGE"
    });
});

router.get('/users', function(req, res, next) {
    res.json({
        "message": "USERS PAGE"
    });
});

module.exports = router;