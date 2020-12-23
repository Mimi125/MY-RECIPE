const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const path = require("path");
const User = require('../models/User');
const {ensureAuthenticated} = require('../libs/auth');
var multer = require('multer');

  router.get('/', (req, res, next) => {
    Idea.find({})                  // Idea컬렉션을 탐색해서
    .sort('date')            // 날짜 순으로 보여준다. 오래된 날짜가 제일 앞에있음/
    .exec((err, ideas) => {
      if(err) return res.json(err);
      console.log(ideas);
      res.render('ideas', {error: '', title: 'Idea', ideas:ideas});
    });
  });

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'views/uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    }),
  });

  
  router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
  });

  router.get('/user_re_detail/:id', (req, res) => {  // index.ejs에서 받아온 id값을 저장한다.
    Idea.findOne({_id : req.params.id}).exec((err, ideas, image1) =>{
      console.log(ideas);
      res.render('ideas/user_re_detail', {error: '', ideas:ideas, image1:image1});

    });
  });

  router.get('/zzim_re', ensureAuthenticated, (req, res) => {
    res.render('ideas/zzim_re');
  });

  router.get('/mine_re', ensureAuthenticated, (req, res) => {
    Idea.find({})                  // Idea컬렉션을 탐색해서
    .sort('date')            // 날짜 순으로 보여준다. 오래된 날짜가 제일 앞에있음/
    .exec((err, ideas) => {
      if(err) return res.json(err);
      console.log(ideas);
      res.render('ideas/mine_re', {error: '', title: 'Idea', ideas:ideas});
    });
  });

  router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findById(req.params.id).then(idea => {
      if (idea.user != req.user.id) {
        console.log('Not authorized!');
        res.redirect('/ideas');
        return;
      }
      res.render('ideas/edit', {idea});
    }).catch(err => console.log(err));
  });

  var uploadimg = upload.fields([{name: "image_title"}, {name: "image_header"}, {name: "image1"}, {name: "image2"}, {name: "image3"}, {name: "image4"}, {name: "image5"}])
  // post
  router.post('/', uploadimg , (req, res) => {
    let errors = [];
    if (!req.body.title)
      errors.push({text: '레시피명을 입력해주세요!'});
    if (!req.body.ingrediants)
      errors.push({text: '재료를 입력해주세요!'});

    if (errors.length > 0) { 
      res.render('ideas/add', {
        errors,
        title: req.body.title,
        ingrediants: req.body.ingrediants,
        contents1: req.body.contents1,
        contents2: req.body.contents2,
        contents3: req.body.contents3,
        contents4: req.body.contents4,
        contents5: req.body.contents5,
      });
    } else { // 비어있지 않다면, Idea컬렉션에 제목, 재료, 이미지, 내용을 적는다.
      Idea.create({title: req.body.title, ingrediants: req.body.ingrediants,
        image_title: req.files['image_title'][0], image_header: req.files['image_header'][0], image1: req.files['image1'][0], image2: req.files['image2'][0], image3: req.files['image3'][0], image4: req.files['image4'], image5: req.files['image5'][0],
        contents1: req.body.contents1, contents2: req.body.contents2, contents3: req.body.contents3, contents4: req.body.contents4, contents5: req.body.contents5,
         user: req.user.name}).then(() => {
        console.log('Idea created!');
        console.log(req.files);
        res.json(req.file);
        res.redirect('/ideas');
      }).catch(err => console.log(err));
    }
  });

  // update processs
  router.put('/:id', (req, res) => {
    Idea.findByIdAndUpdate(req.params.id, req.body).then(idea => {
      console.log(`${idea.title} updated!`);
      res.redirect('/ideas');
    }).catch(err => console.log(err));
  });

  // remove process
  router.delete('/:id', (req, res) => {
    Idea.findByIdAndRemove(req.params.id).then(() => {
      console.log(`recipe deleted!`);
      res.redirect('/ideas/mine_re');
    }).catch(err => console.log(err));
  });

module.exports = router;
