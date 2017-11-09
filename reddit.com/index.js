const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

let images = [];

request("https://www.reddit.com", (err, res, body) => {
  if (!err && res.statusCode == 200) {
    let $ = cheerio.load(body);
    $('a.title', '#siteTable').each(function() {
      var urlImg = $(this).attr('href');
      if (urlImg.indexOf('i.imgur.com') != -1) {
        images.push(urlImg);
      }
    });
  }

  for(let i = 0; i < images.length; i++) {
    request(images[i]).pipe(fs.createWriteStream('img/' + i + '.jpg'));
  }
});
