const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const {ensureAuthenticated} = require('../libs/auth');
var multer = require('multer');

  // router.get('/', ensureAuthenticated, (req, res) => {
  //   Idea.find({user: req.user.id}).sort({date: 'desc'}).then(ideas => {
  //     res.render('ideas/index', {ideas, user: req.user.name});
  //   }).catch(err => console.log(err));
  // });

  var upload = multer({dest: 'uplaods/'})
  
  router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
  });

  router.get('/', (req, res) => {
    res.render('ideas/index', {error: ''});
  });

  router.get('/user_re_detail', (req, res) => {
    res.render('ideas/user_re_detail', {error: ''});
  });

  router.get('/zzim_re', ensureAuthenticated, (req, res) => {
    res.render('ideas/zzim_re');
  });

  router.get('/mine_re', ensureAuthenticated, (req, res) => {
    res.render('ideas/mine_re');
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

  // post
  router.post('/', upload.fields([{name: "image_title"}, {name: "image_header"}, {name: "image1"}, {name: "image2"}, {name: "image3"}, {name: "image4"}, {name: "image5"}]), (req, res) => {
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
        images: req.files,
        contents1: req.body.contents1,
        contents2: req.body.contents2,
        contents3: req.body.contents3,
        contents4: req.body.contents4,
        contents5: req.body.contents5,
      });
    } else {
      Idea.create({title: req.body.title, ingrediants: req.body.ingrediants, images: req.files,
        contents1: req.body.contents1, contents2: req.body.contents2, contents3: req.body.contents3, contents4: req.body.contents4, contents5: req.body.contents5,
         user: req.user.id}).then(() => {
        console.log('Idea created!');
        console.log(req.files);
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
      console.log(`Idea deleted!`);
      res.redirect('/ideas');
    }).catch(err => console.log(err));
  });

module.exports = router;
