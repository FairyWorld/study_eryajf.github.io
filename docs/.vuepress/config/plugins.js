// const {
//   title,
//   description
// } = context.getSiteData ? context.getSiteData() : context;

// -----------------------------------------------------------------------------
// Feed class options
// @see: https://github.com/jpmonette/feed#example

// const feed_options = {
//   title,
//   description,
//   generator: PLUGIN.homepage,
// };

// -----------------------------------------------------------------------------
const default_options = {
  // required; it can also be used as enable/disable
  canonical_base: 'https://wiki.eryajf.net',
  // ---------------------------------------------------------------------------
  // Feed class options - @see: https://github.com/jpmonette/feed#example
  // optional - auto-populated based on context.getSiteData()
  // feed_options,
  // @notes:
  // property name is also the name of the jpmonette/feed package function
  feeds: {
    rss2: {
      enable    : true,
      file_name : 'rss.xml',
      head_link : {
        enable: true,
        type  : 'application/rss+xml',
        title : '%%site_title%% RSS Feed',
      }
    },
  },
  // ---------------------------------------------------------------------------
  // page/post description sources
  // order of what gets the highest priority:
  //
  // 1. frontmatter
  // 2. page excerpt
  // 3. content markdown paragraph
  // 4. content regular html <p>
  description_sources: [
    'frontmatter',
    'excerpt',
    // markdown paragraph regex
    // @todo: needs work
    //
    /^((?:(?!^#)(?!^\-|\+)(?!^[0-9]+\.)(?!^!\[.*?\]\((.*?)\))(?!^\[\[.*?\]\])(?!^\{\{.*?\}\})[^\n]|\n(?! *\n))+)(?:\n *)+\n/gim,
    //
    // this excludes blockquotes using `(?!^>)`
    ///^((?:(?!^#)(?!^\-|\+)(?!^[0-9]+\.)(?!^!\[.*?\]\((.*?)\))(?!^>)(?!^\[\[.*?\]\])(?!^\{\{.*?\}\})[^\n]|\n(?! *\n))+)(?:\n *)+\n/gim,
    // html paragraph regex
    /<p(?:.*?)>(.*?)<\/p>/i,
  ],
  // ---------------------------------------------------------------------------
  // page/post image sources
  // order of what gets the highest priority:
  //
  // 1. frontmatter
  // 2. content markdown image such as `![alt text](http://url)`
  // 3. content regular html img
  image_sources: [
    'frontmatter',
    /!\[.*?\]\((.*?)\)/i,         // markdown image regex
    /<img.*?src=['"](.*?)['"]/i,  // html image regex
  ],
  // ---------------------------------------------------------------------------
  // pages in current directories will be auto added as feed
  // unless they are disabled using their frontmatter
  // this option is used by the default is_feed_page function
  posts_directories: ['/pages/', '/_posts/'],
  // ---------------------------------------------------------------------------
  // function to check if the page is to be used in a feed item
  // is_feed_page: PLUGIN.is_feed_page, // function
  // ---------------------------------------------------------------------------
  count: 20,
  // optional sorting function for the entries. 
  // Gets the array entries as the input, expects the sorted array
  // as its output.
  // e.g.:   sort:  entries => _.reverse( _.sortBy( entries, 'date' ) ),
  // Don't forget to do a `const _ = require('lodash');` to be able to use `_`!
  sort: entries => entries,
  // ---------------------------------------------------------------------------
  // supported - use in config as needed
  // category
  // contributor
};

const autometa_options = {
  site: {
    name: 'Eryajf',
  },
  canonical_base: 'https://wiki.eryajf.net',
};
// const feed_options = {
//   canonical_base: 'https://wiki.eryajf.net',
// };



// 插件配置
module.exports = [
  // 百度自动推送
  'vuepress-plugin-baidu-autopush',
  // 鼠标点击后散开小星星
  'cursor-effects',
  // 全文搜索插件
  'fulltext-search',
  // 阅读顶部进度条
  'reading-progress',
  // 自定义插件
  [
    {
      name: 'custom-plugins',
        globalUIComponents: ["LastReadingPopup"], // 2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
    }
  ],
  // rss 配置
  [ 'feed', default_options ],
  // [
  //   'vuepress-plugin-rss',
  //       {
  //         base_url: '/', // required
  //         copyright: '二丫讲梵', // optional
  //         // filter some post
  //         filter: (frontmatter) => { return [true] },
  //         // How much articles
  //         count: 20,
  //   }
  // ],
  // 首页公告提示--暂时去掉了
  // ["@vuepress-yard/vuepress-plugin-window",{
  //   title: "欢迎",  //vuepress公告插件 先安装在配置 npm install @vuepress-yard/vuepress-plugin-window --save
  //   contentInfo: {
  //     title: "",
  //     needImg: false, // 不展示图片，展示如下的content
  //     imgUrl: "https://reinness.com/avatar.png",
  //     content: "世事细探看，我辈赛仙神。形胜痴迷中，自成画中人。",
  //     contentStyle: ""
  //   },
  //   windowStyle: {
  //     right: '20px',
  //     top: '72px',
  //     width: '135px'
  //   },
  //   bottomInfo: {
  //     btnText: '当赏',
  //     linkTo: 'https://wiki.eryajf.net/reward/'
  //   },
  //   closeOnce: true
  // }],
  // 访问统计插件
  [
    'umami',
     {
       trackerUrl: 'http://f.eryajf.net',
       siteId: '360ec71a-d5d6-45d7-8aed-471ebe51a812'
     }
  ],
  // meta优化 https://github.com/webmasterish/vuepress-plugin-autometa
  ['autometa',autometa_options],
  // 代码块复制按钮
  [
    'one-click-copy',
    {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功 🎉', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false, // whether to display on the mobile side, default: false.
    },
  ],
  [
    'demo-block',
    {
      // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false, // 是否展示为横向样式
      },
    },
  ],
  // 放大图片
  [
    'vuepress-plugin-zooming',
    {
      selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
      options: {
        bgColor: 'rgba(0,0,0,0.6)',
      },
    },
  ],
  // 百度统计
  [
    'vuepress-plugin-baidu-tongji',
    {
      hm: 'f8fd5c4e21ca384b4785396a87bcc468',
    },
  ],
  // last-reading 插件
  // [
  //   'last-reading',
  //   {
  //     popupConfig: {
  //       message: '检测到您上一次阅读的位置，是否移至该位置？',
  //       buttonText: '确定'
  //     },
  //   }
  // ],
  'vuepress-plugin-mermaidjs',
  [
    'sitemap', {
      hostname: 'https://wiki.eryajf.net',
      exclude: ["/404.html"],
    },
  ],
  // 站点地图
  'robots', {
    host: "https://wiki.eryajf.net",
    disallowAll: false,
    allowAll: true,
    sitemap: "/sitemap.xml",
  },
  // gitalk评论
  [
    'vuepress-plugin-comment',
    {
      choosen: 'gitalk',
      options: {
        clientID: 'fb7da8986eeef58a7bdf',
        clientSecret: '9bf3f6d604fa86275b546c0d04654ec362c2a864',
        repo: 'eryajf.github.io', // GitHub 仓库
        owner: 'eryajf', // GitHub仓库所有者
        admin: ['eryajf'], // 对仓库有写权限的人
        // distractionFreeMode: true,
        pagerDirection: 'last', // 'first'正序 | 'last'倒序
        id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>', //  页面的唯一标识,长度不能超过50
        title: '「评论」<%- frontmatter.title %>', // GitHub issue 的标题
        labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
        body:
          '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
      },
    },
  ],
  // "上次更新"时间格式
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs') // https://day.js.org/
        return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
      },
    },
  ],
]
