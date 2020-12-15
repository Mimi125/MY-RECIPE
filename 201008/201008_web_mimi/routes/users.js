const express = require('express');
let router = express.Router();

router.get('/:id', (req, res) => {
    res.send('사용자 정보 가져오기');
});

router.post('/', (req, res) => {
    res.send('회원 가입');
});

router.put('/:id', (req, res) => {
    res.send('회원 정보 수정');
});

router.delete('/:id', (req, res) => {
    res.send('회원 탈퇴');
});

module.exports = router;
