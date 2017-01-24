module.exports = () => {
  const config = {};
  config.port = 6001;

  config.spider = {
    entry_url: 'https://www.amazon.cn/s/ref=lp_658394051_pg_1?rh=n%3A658390051%2Cn%3A%21658391051%2Cn%3A658394051&page=1&ie=UTF8&qid=1485273739&spIA=B017LEHXH0,B01A0DH82Y',
    set_time: '2',
    concurrency: '3',
  };

  return config;
};
