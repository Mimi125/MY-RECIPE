module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/user_re_category', (req, res) => {
    res.render('user_re_category');
  });

  app.get('/famous_re_category', (req, res) => {
    res.render('famous_re_category');
  });

  app.get('/famous_re_main', (req, res) => {
    res.render('famous_re_main');
  });

  app.get('/famous_re_detail', (req, res) => {
    res.render('famous_re_detail');
  });
};
