if (process.env.NODE_ENV  === 'production')
  module.exports = {url: 'mongodb://germancutraro:sherman@ds013172.mlab.com:13172/myrecipe-production'};
else
  module.exports = {url: 'mongodb://localhost/myrecipe'};
