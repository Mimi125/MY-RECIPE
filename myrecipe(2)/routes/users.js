const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Idea = require('../models/Idea');

  router.get('/login', (req, res) => {
    res.render('users/login', {error: ''});
  });
  router.get('/mypage', (req, res) => {
    Idea.find({})                  // Idea컬렉션을 탐색해서
    .sort('date')            // 날짜 순으로 보여준다. 오래된 날짜가 제일 앞에있음/
    .exec((err, ideas) => {
      if(err) return res.json(err);
      console.log(ideas);
      res.render('users/mypage', {error: '', title: 'Idea', ideas:ideas});
    });
  });

  router.get('/edit', (req, res) => {
    res.render('users/edit', {error: ''});
  });

  router.get('/register', (req, res) => {
    res.render('users/register', {
      errors: [],
      name: '',
      email: '',
      password: '',
      rpassword: ''
    });
  });

  //로그아웃 후 인덱스로
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


  //회원가입, 비밀번호 일치 확인
  router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password != req.body.rpassword)
      errors.push({text: 'Password do not match'});
    if (req.body.password.length <4 )
      errors.push({text: 'Password must be at least 4 characters!'});

    if (errors.length > 0) {
      res.render('users/register', {
        errors,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        rpassword: req.body.rpassword
      });
    }  else {
      User.findOne({email: req.body.email}).then(user => {
        if (user) {
          errors.push({text: 'User already exist!'});
          res.render('users/register', {errors, name: '', email: '', password: '', rpassword: ''});
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then( user => {
                console.log(`User ${user.name} register!`);
                res.redirect('/users/login');
              }).catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

  // 로그인 설정
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login'
    })(req, res, next);
  });


  // 개인정보 수정 (이름, 비밀번호)
  router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).then(user => {
      console.log(`${user.name} updated!`);
      res.redirect('/users/mypage');
    }).catch(err => console.log(err));
  });

  router.post('/:id', (req, res) => {

    let errors = [];
    if (errors.length > 0) {
      res.render('users/edit/:id', {
        errors,
        name: req.body.name,
        password: req.body.password,
        rpassword: req.body.rpassword
      });
    }  else {
      User.findOne({email: req.body.email}).then(user => {
        if (user) {
          errors.push({text: 'User already exist!'});
          res.render('users/edit/:id', {errors, name: '', password: '', rpassword: ''});
        } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user.save().then( user => {
                  console.log(`User ${user.name} pw update!`);
                }).catch(err => console.log(err));
              });
            });
        }
      });
    }
  });

  // 회원탈퇴
  router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(() => {
      console.log(`user deleted!`);
      res.redirect('/');
    }).catch(err => console.log(err));
  });


  // 프로필이미지 등록 ------기능안됨ㅠㅠ
  router.post('/:id', (req,res) => { 

    var name = "";
    var filePath = "";
    var form = new formidable.IncomingForm();

    form.on('end', function(fields, files) {

      for (var i = 0; i < this.openedFiles.length; i++) {

          var temp_path = this.openedFiles[i].path;

          var file_name = this.openedFiles[i].name;

          var index = file_name.indexOf('/'); 

          var new_file_name = file_name.substring(index + 1);

          var new_location = '../views/images/';
          var db_new_location = '/images/';

          filePath = db_new_location + file_name;

          fs.copy(temp_path,new_location + file_name, function(err) { // 이미지 파일 저장

              if (err) {

                  console.error(err);

              }

          });
        }
      });
    });

module.exports = router;
