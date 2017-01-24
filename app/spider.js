const request = require('superagent');
const cheerio = require('cheerio');

const config = require('../config/config.default');

const entryUrl = config.spider.entry_url;

const MAX_PAGE = 75;


module.exports = () => ({
  getPageUrlList() {
    const pageUrlList = [];

    for (let i = 1; i <= MAX_PAGE; i += 1) {
      pageUrlList.push(entryUrl.replace(/_pg_\d*/, `_pg_${i}`).replace(/page=\d*/, `page=${i}`));
    }

    return pageUrlList;
  },

  getBookUrlList(pageUrlList) {
    const bookUrlList = [];
    pageUrlList.forEach((pageUrl) => {
      request
        .get(pageUrl)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          const $ = cheerio.load(res);
          bookUrlList.push($('a li ul #mainResults').attr('herf'));
        });
    });

    return bookUrlList;
  },

  getBookInfo(bookUrlList) {
    const bookInfo = [];

    bookUrlList.forEach((bookUrl) => {
      request
        .get(bookUrl)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          const $ = cheerio.load(res);
          bookInfo.push({
            title: $('#productTitle').text(),
            image: $('#igImage').attr('src'),
            content: $('#iframeContent').text(),
          });
        });
    });

    return bookInfo;
  },
});

