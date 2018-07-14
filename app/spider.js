const request = require('superagent');
const cheerio = require('cheerio');

const config = require('../config/config.default')();

const entryUrl = config.spider.entry_url;

const MAX_PAGE = 75;

function getPageUrlList(url) {
  const pageUrlList = [];

  for (let i = 1; i <= MAX_PAGE; i += 1) {
    pageUrlList.push(url.replace(/_pg_\d*/, `_pg_${i}`).replace(/page=\d*/, `page=${i}`));
  }

  console.log(pageUrlList);
  return pageUrlList;
}

function getBookInfo(url) {
  const bookInfo = [];
  request
  .get(url)
  .end((err, res) => {
    if (err) {
      console.log(err);
    }
    const $ = cheerio.load(res.text);
    $('#mainResults ul li').each((i, ele) => {
      bookInfo.push({
        asin: $(ele).attr('data-asin'),
        url: $(ele).find('img').parent().attr('href'),
        title: $(ele).find('h2.a-size-medium.a-color-null.s-inline.s-access-title.color-variation-title-replacement.a-text-normal').text(),
        author: $(ele).find('span.a-size-small.a-color-secondary').text(),
        rate: $(ele).find('span.a-icon-alt').text(),
        pub_data: $(ele).find('span.a-size-small.a-color-secondary').text(),
      });
    });
    console.log(bookInfo);
  });
}

let pageUrlList = getPageUrlList(entryUrl);
let bookInfo = getBookInfo(entryUrl);



// console.log(bookUrlList);


// module.exports = () => ({
//   getPageUrlList() {
//     const pageUrlList = [];

//     for (let i = 1; i <= MAX_PAGE; i += 1) {
//       pageUrlList.push(entryUrl.replace(/_pg_\d*/, `_pg_${i}`).replace(/page=\d*/, `page=${i}`));
//     }

//     return pageUrlList;
//   },

//   getBookUrlList(pageUrlList) {
//     const bookUrlList = [];
//     pageUrlList.forEach((pageUrl) => {
//       request
//         .get(pageUrl)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           const $ = cheerio.load(res);
//           bookUrlList.push($('a li ul #mainResults').attr('herf'));
//         });
//     });

//     return bookUrlList;
//   },

//   getBookInfo(bookUrlList) {
//     const bookInfo = [];

//     bookUrlList.forEach((bookUrl) => {
//       request
//         .get(bookUrl)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           }
//           const $ = cheerio.load(res);
//           bookInfo.push({
//             title: $('#productTitle').text(),
//             image: $('#igImage').attr('src'),
//             content: $('#iframeContent').text(),
//           });
//         });
//     });

//     return bookInfo;
//   },
// });

