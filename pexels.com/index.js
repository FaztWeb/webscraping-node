// analizing unsplash.com, to save photos

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let images = [];

request("https://www.pexels.com/",
	function(err, res, body) {
		if (!err && res.statusCode == 200) {
			var $ = cheerio.load(body);
			$('img', 'div.photos').each(function () {
				var img = $(this).attr('src');
				images.push(img);
			});
			for(let i = 0; i < images.length; i++) {
				if (images[i]) {
					request(images[i]).pipe(fs.createWriteStream(`images/photo_${i}.jpg`))
				}
			}
		}
	});
