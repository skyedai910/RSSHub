const got = require('@/utils/got');
const cheerio = require('cheerio');
const utils = require('./utils');

module.exports = async (ctx) => {
    const link = 'https://xz.aliyun.com/';// 源站URL
    const response = await got.get(link);// 获取HTML
    const data = response.data; // 请求返回的HTML
    const $ = cheerio.load(data);// cheerio加载数据
    const list = $('a[class=topic-title]').get();// 筛选出每则通知作为列表索引
    const result = await utils.ProcessFeed(list, ctx.cache, link);// 加载每则通知详情内容

    ctx.state.data = {
        title: '先知社区', // RSS名称
        description: '先知社区 RSS', // RSS描述
        link: link, // RSS源站URL
        item: result, // 文章具体内容
        allowEmpty: false, // 是否允许RSS内容为空
        language: 'zh-cn', // 频道语言
    };
};