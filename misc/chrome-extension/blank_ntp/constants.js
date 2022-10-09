const urlsMap = {
  drive: 'https://bytedance.feishu.cn/drive/',
  docx: 'https://bytedance.feishu.cn/docx/',
  bd: 'https://www.baidu.com/',
  googleTranslate: 'https://translate.google.com/',
};

const googleTranslate = `${urlsMap.googleTranslate}?sl=zh-CN&tl=en&op=translate`;

const bdCalendar = `${urlsMap.bd}s?ie=utf-8&f=3&rsv_bp=1&tn=baidu&wd=%E6%97%A5%E5%8E%86&oq=%25E5%2586%259C%25E5%258E%2586%25E6%2597%25A5%25E5%258E%2586%2520iframe&rsv_pq=e7e27b390001c9ba&rsv_t=797cRD4larDWNeISV9peSFlfQy5fouhTnoB46gpp8qR1kbGpYyh7fSYaFME&rqlang=cn&rsv_dl=ts_0&rsv_enter=1&rsv_sug3=6&rsv_sug1=4&rsv_sug7=100&rsv_sug2=0&rsv_btype=t&prefixsug=rili%2520&rsp=0&inputT=3065&rsv_sug4=3740`;

const bdCalc = `${urlsMap.bd}s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=计算器&oq=jsremovechild&rsv_pq=b182e3880000228a&rsv_t=9a81mc67VbBj9NGuw4atYhq9UbrhLFXXYXjJKx8CKH0zPRXorLIIZnJ6%2B8s&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=6424&rsv_sug3=42&rsv_sug1=30&rsv_sug7=101&rsv_sug2=0&rsv_sug4=9132`;

const NEWLINE = '|';

const iframes = [
  [null, ''],
  [[googleTranslate, NEWLINE, bdCalendar, bdCalc], '工具'],
  ['https://bytedance.feishu.cn/messenger/', '消息'],
  // ['https://www.icloud.com.cn/notes/0deBZsLWnGR2EUJAXjUVDtoqA', 'icloud'],
  [urlsMap.docx + 'doxcnSCX57RMgHoglsT8S3bM4xe', ''],
  [urlsMap.docx + 'doxcn2EDJtEmqNmb6uVnJ5MTUbc', ''],
  [urlsMap.docx + 'doxcnL8nSmUoRzFpuQc9Dwm5Wqe', ''],
];
