const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('게시글 가져오기');
});

router.get('/:id', (req, res) => {
    res.send('게시글 목록 가져오기');
});

router.post('/', (req, res) => {
    res.send('게시글 쓰기');
});

router.put('/:id', (req, res) => {
    res.send('게시글 수정');
})

router.delete('/:id', (req, res) => {
    res.send('게시글 삭제');
});

module.exports = router;