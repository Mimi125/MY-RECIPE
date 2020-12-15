var express = require('express');
var router = express.Router();

router.get('/:id', (req, res) => {
    res.send('Received a GET request, param:', + req.params.id);
});

router.post('/', (req, res) => {
    res.json({ success: true });
});

router.put('/', (req, res) => {
    res.status(400).json({ message: 'Hey you. Bad Request!' });
});

router.delete('/', (req, res) => {
    res.send('Received a DELETE request');
})

module.exports = router;

