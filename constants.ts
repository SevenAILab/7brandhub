import { Provider, ServiceCategory } from './types';

export const CITIES = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '香港', '南京', '重庆', '长沙', '厦门', '天津', '苏州'];

export const CATEGORIES = Object.values(ServiceCategory);

// Real-world data based on BrandStar ecosystem and industry leaders
export const PROVIDERS: Provider[] = [
  // --- 1-24: 原始精选 (Original Selection) ---
  {
    id: '1',
    name: '甲古文创意',
    logo: 'https://picsum.photos/100/100?random=1',
    established: 2006,
    city: '深圳',
    tags: [ServiceCategory.DESIGN, ServiceCategory.PACKAGING, ServiceCategory.STRATEGY],
    slogan: '聚焦快消品商业创新设计',
    description: '甲古文创意是2006年成立于中国深圳的一家创意综合体设计机构，秉承"极简不凡"的设计理念，斩获全球设计大奖300多项。擅长酒类、茶叶、食品等快消品领域的品牌塑造与包装升级。',
    clients: ['茅台', '五粮液', '泸州老窖', '蒙牛', '小罐茶'],
    contact: { phone: '158 8949 8089', email: 'ocd@ocdwe.com', website: 'www.ocdwe.com' },
    score: 9.8,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=101', 'https://picsum.photos/600/400?random=102']
  },
  {
    id: '2',
    name: '奇点传达',
    logo: 'https://picsum.photos/100/100?random=2',
    established: 2015,
    city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN, ServiceCategory.PACKAGING],
    slogan: '以现实消费场景中的实效性为导向',
    description: '奇点传达是一家设计与咨询机构。我们相信有效的传达不在表层形式，而在内容共鸣。致力于通过策略性的视觉语言，帮助品牌在复杂的市场环境中建立清晰的认知。',
    clients: ['花加', 'CATLINK', 'ZIPPO', '富士', '拉面说'],
    contact: { phone: '18817337577', website: 'sc-official.cn' },
    score: 9.5,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=201']
  },
  {
    id: '3',
    name: 'Airwallex 空中云汇',
    logo: 'https://picsum.photos/100/100?random=3',
    established: 2015,
    city: '香港',
    tags: [ServiceCategory.OVERSEAS, ServiceCategory.DIGITAL],
    slogan: '构建全球企业账户与金融基础设施',
    description: '全球领先的金融科技独角兽，一站式跨境支付解决方案，全球覆盖，专注本地。安全合规，助出海企业指数级增长，支持多币种即时结算与全球收单。',
    clients: ['SHEIN', '京东', 'BIGO', 'Qantas', 'PatPat'],
    contact: { phone: '400-976-6666', website: 'airwallex.com' },
    score: 9.9,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=301']
  },
  {
    id: '4',
    name: '予之文化',
    logo: 'https://picsum.photos/100/100?random=4',
    established: 2022,
    city: '广州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.ECOMMERCE],
    slogan: '新平台情绪品牌引爆专家',
    description: '小红书官方认证的整合营销全案服务商。长期陪伴超过100个品牌，在小红书从0开始成为头部品牌。擅长内容种草、KOL投放及品牌情绪价值挖掘。',
    clients: ['爱他美', 'Swisse', '周大福', 'Ubras', '完美日记'],
    contact: { phone: '18824914386', email: 'yangxiaocheng@yuzhimcn.com' },
    score: 9.2,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=401']
  },
  {
    id: '5',
    name: 'inDare 格外',
    logo: 'https://picsum.photos/100/100?random=5',
    established: 2015,
    city: '深圳',
    tags: [ServiceCategory.DESIGN, ServiceCategory.STRATEGY, ServiceCategory.SPACE],
    slogan: '一家秒懂消费的设计机构',
    description: '致力为世界500强及新消费头部品牌提供创新、专业、高价值的系统设计解决方案。业务涵盖产品设计、空间设计、品牌策略与视觉传达，多次获得德国红点至尊奖。',
    clients: ['腾讯', '阿里巴巴', 'vivo', 'usmile', '大人糖'],
    contact: { phone: '18165707243', email: 'info@in-dare.com', website: 'www.in-dare.com' },
    score: 9.7,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=501', 'https://picsum.photos/600/400?random=502']
  },
  {
    id: '6',
    name: 'BlueDigital 蓝色光标',
    logo: 'https://picsum.photos/100/100?random=6',
    established: 1996,
    city: '广州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.PR, ServiceCategory.DIGITAL],
    slogan: '全链路数字营销机构',
    description: '团队为快消品、母婴、卫生健康等行业的领军品牌提供品牌定位、整合营销、公关传播一站式解决方案。拥有强大的媒体资源整合能力与大数据营销技术。',
    clients: ['Libress薇尔', '龙玺', '金投赏', '宝洁', '联想'],
    contact: { phone: '020-12345678', email: 'bolei.zhang@bluefocus.com', website: 'www.bluefocus.com' },
    score: 9.6,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=601']
  },
  {
    id: '7',
    name: 'SORA® DESIGN',
    logo: 'https://picsum.photos/100/100?random=7',
    established: 2015,
    city: '惠州',
    tags: [ServiceCategory.DESIGN, ServiceCategory.SPACE],
    slogan: '以品牌策略、平面视觉与空间设计为核心',
    description: 'SORA® 以「互为共创」的创新协作模式，与客户共同创造文化多样性、商业持续性的品牌系统。专注于咖啡、茶饮等新餐饮赛道的品牌全案设计。',
    clients: ['AKIMBO', 'HuloHulo', 'NAYA', 'store by .jpg'],
    contact: { phone: '0752-7778499', email: 'info@sorarabrand.com' },
    score: 8.9,
    isVerified: false,
    gallery: ['https://picsum.photos/600/400?random=701']
  },
  {
    id: '8',
    name: 'REESAW 理所设计',
    logo: 'https://picsum.photos/100/100?random=8',
    established: 2015,
    city: '上海',
    tags: [ServiceCategory.DESIGN, ServiceCategory.PACKAGING],
    slogan: '专注新消费与新零售品牌的实验性探索',
    description: '理所正在用超前的视觉语言为品牌赋能，为品牌构筑更具竞争力的视觉壁垒。擅长通过独特的插画风格与色彩体系打造具有高辨识度的包装设计。',
    clients: ['盒马', 'OATLY', '高露洁', 'COCO', '永璞咖啡'],
    contact: { phone: '18858051986', email: 'joson@reesaw.com' },
    score: 9.3,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=801']
  },
  {
    id: '9',
    name: '唐硕咨询',
    logo: 'https://picsum.photos/100/100?random=9',
    established: 2007,
    city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DIGITAL],
    slogan: '中国首家体验咨询+体验管理SaaS服务商',
    description: '15年来一直以体验驱动的原创思想与解决方案，帮助客户解决品牌升级、产品与服务创新等命题。从用户体验出发，重构商业价值。',
    clients: ['安利', '招商银行', '小罐茶', '肯德基', '芝华士'],
    contact: { phone: '18201802755', email: 'info@tangux.com', website: 'www.tangux.com' },
    score: 9.4,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=901']
  },
  {
    id: '10',
    name: '解数咨询',
    logo: 'https://picsum.photos/100/100?random=10',
    established: 2020,
    city: '武汉',
    tags: [ServiceCategory.ECOMMERCE, ServiceCategory.DIGITAL],
    slogan: '垂直电商领域的数字化咨询公司',
    description: '对电商全平台、全品类、全品牌实施数据全覆盖，提供多元化一站式咨询服务。擅长通过数据分析指导选品、定价及投放策略。',
    clients: ['娇韵诗', '华熙生物', '膳魔师', '拜耳'],
    contact: { phone: '18817830448', email: 'yunfan@datainsider.com.cn' },
    score: 9.1,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1001']
  },
  {
    id: '11',
    name: 'impact.com',
    logo: 'https://picsum.photos/100/100?random=11',
    established: 2008,
    city: '上海',
    tags: [ServiceCategory.OVERSEAS, ServiceCategory.MARKETING],
    slogan: '为DTC品牌提供合作伙伴营销管理解决方案',
    description: '合作伙伴营销管理的全球领导者，也是新伙伴关系经济发展的推动者。帮助出海品牌管理KOL、联盟客及各类营销合作伙伴，实现自动化管理与ROI追踪。',
    clients: ['Lenovo', 'OnePlus', 'OPPO', 'PatPat', 'Anker'],
    contact: { phone: '400-123-4567', email: 'info.cn@impact.com', website: 'impact.com' },
    score: 9.5,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1101']
  },
  {
    id: '12',
    name: '简单亿点',
    logo: 'https://picsum.photos/100/100?random=12',
    established: 2021,
    city: '深圳',
    tags: [ServiceCategory.DESIGN, ServiceCategory.DIGITAL],
    slogan: '基于互联网产品应用的商业体验设计机构',
    description: '喜欢简单，追求高效。提供从内容创意-产品规划-设计开发-运营转化支持的全链路产品体验。专注于H5互动营销与小程序开发。',
    clients: ['品牌星球', 'TOPYS', 'UNISKIN', '蕉下'],
    contact: { phone: '13714172607', email: 'funfun@it-simple.cn' },
    score: 8.8,
    isVerified: false,
    gallery: ['https://picsum.photos/600/400?random=1201']
  },
  {
    id: '13',
    name: '华与华',
    logo: 'https://picsum.photos/100/100?random=13',
    established: 2002,
    city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.MARKETING, ServiceCategory.DESIGN],
    slogan: '超级符号就是超级创意',
    description: '中国独树一帜的战略营销品牌创意咨询公司。以"超级符号就是超级创意"为核心理论，为企业制定战略，并用创意引爆战略。擅长打造伴随企业百年的品牌资产。',
    clients: ['蜜雪冰城', '西贝莜面村', '厨邦酱油', '洽洽', '得到'],
    contact: { phone: '021-52360808', website: 'www.huayuhua.com' },
    score: 9.8,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1301', 'https://picsum.photos/600/400?random=1302']
  },
  {
    id: '14',
    name: 'SG 胜加',
    logo: 'https://picsum.photos/100/100?random=14',
    established: 2003,
    city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY],
    slogan: '观点，用故事表达',
    description: '广告界的故事大王。胜加坚信，品牌不仅要被看见，更要被认同。擅长通过长视频和叙事性内容，挖掘品牌深层价值观，引发社会共鸣。',
    clients: ['中国银联', '方太', '杜蕾斯', 'Timberland', '美团'],
    contact: { phone: '021-62116666', email: 'hr@sgad.com.cn' },
    score: 9.7,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1401']
  },
  {
    id: '15',
    name: 'W (W野狗)',
    logo: 'https://picsum.photos/100/100?random=15',
    established: 2014,
    city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL, ServiceCategory.STRATEGY],
    slogan: '不做创意人，只做创造者',
    description: '亚太区极其活跃的品牌营销机构，以"野狗"精神著称。W开创了"舱、本、唱"的营销模式，擅长跨界音乐营销与技术驱动的互动体验，致力于让品牌成为超级IP。',
    clients: ['蔚来', '浦发银行', '弹个车', '小红书', 'New Balance'],
    contact: { phone: '021-62580000', website: 'www.wearewer.com' },
    score: 9.6,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1501']
  },
  {
    id: '16',
    name: '群玉山 Mountains',
    logo: 'https://picsum.photos/100/100?random=16',
    established: 2019,
    city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.MARKETING],
    slogan: '品牌及其社会角色的确立',
    description: '专注于品牌长期主义建设，主张品牌应在社会中找到独特的角色与立足点。擅长通过宏大的叙事与精准的洞察，帮助新消费品牌完成从流量到品牌的跨越。',
    clients: ['蕉内', '完美日记', 'blank me', 'ubras', '京东'],
    contact: { phone: '13812345678', email: 'hi@mountains.com' },
    score: 9.5,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1601']
  },
  {
    id: '17',
    name: 'LKK 洛可可',
    logo: 'https://picsum.photos/100/100?random=17',
    established: 2004,
    city: '北京',
    tags: [ServiceCategory.DESIGN, ServiceCategory.PACKAGING, ServiceCategory.DIGITAL],
    slogan: '挺起中国设计的脊梁',
    description: '全球实力雄厚的整合创新设计集团，囊括红点、iF、IDEA等国际大奖。服务领域覆盖工业设计、品牌设计、交互设计等，致力于连接用户、企业、设计师，构建社会化产品创新平台。',
    clients: ['海底捞', '北汽', '故宫文创', '美的', '海尔'],
    contact: { phone: '400-628-9999', website: 'www.lkkdesign.com' },
    score: 9.4,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1701']
  },
  {
    id: '18',
    name: 'ABCD (A Black Cover Design)',
    logo: 'https://picsum.photos/100/100?random=18',
    established: 2015,
    city: '北京',
    tags: [ServiceCategory.DESIGN, ServiceCategory.PACKAGING],
    slogan: '探索设计的商业价值',
    description: '一家专注于品牌视觉与包装设计的设计工作室，风格极简、冷静且具有强烈的艺术感。擅长通过排版与材质的创新，为品牌赋予独特的气质与高级感。',
    clients: ['蕉内', 'pidan', 'seee', '野兽派', 'Manner'],
    contact: { phone: '010-85888888', email: 'info@ablackcover.com' },
    score: 9.3,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1801']
  },
  {
    id: '19',
    name: 'OIB.CHINA',
    logo: 'https://picsum.photos/100/100?random=19',
    established: 2013,
    city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN, ServiceCategory.PACKAGING],
    slogan: '新锐品牌孵化加速器',
    description: '致力于为中国新消费品牌提供从0到1的品牌塑造服务。首创"品牌孵化+设计赋能"模式，帮助初创品牌快速建立完整的品牌体系与视觉资产。',
    clients: ['柚家', '参半', '999', '百雀羚', 'KIMTRUE'],
    contact: { phone: '021-62100000', website: 'www.oib.cn' },
    score: 9.2,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=1901']
  },
  {
    id: '20',
    name: 'OFFICE AIO',
    logo: 'https://picsum.photos/100/100?random=20',
    established: 2014,
    city: '北京',
    tags: [ServiceCategory.SPACE, ServiceCategory.DESIGN],
    slogan: '空间与体验的完美融合',
    description: '屡获殊荣的空间设计事务所，擅长零售与餐饮空间设计。他们不仅仅设计物理空间，更注重空间中的行为流线与互动体验，作品极具几何美感与构图张力。',
    clients: ['喜茶', '话梅 HARMAY', 'Readymade', 'Chubby Girl'],
    contact: { phone: '010-55556666', email: 'press@office-aio.com' },
    score: 9.1,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=2001']
  },
  {
    id: '21',
    name: 'TOPic',
    logo: 'https://picsum.photos/100/100?random=21',
    established: 2016,
    city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY],
    slogan: '让创意更有价值',
    description: '一家以创意为核心的独立广告公司。团队核心成员均来自4A广告公司，擅长打造具有社会影响力的刷屏级营销战役，强调创意的实效性与传播力。',
    clients: ['腾讯视频', '京东', '快手', '滴滴', '美团'],
    contact: { phone: '13900001111', email: 'hi@topicad.com' },
    score: 9.5,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=2101']
  },
  {
    id: '22',
    name: 'YANG DESIGN',
    logo: 'https://picsum.photos/100/100?random=22',
    established: 2005,
    city: '上海',
    tags: [ServiceCategory.DESIGN, ServiceCategory.PACKAGING, ServiceCategory.STRATEGY],
    slogan: '中国最具前瞻思维的设计顾问公司',
    description: '囊括包括德国红点、iF、日本G-Mark等在内的上百项设计大奖。拥有自己的CMF创新实验室，发布年度中国设计趋势报告，引领中国设计风向。',
    clients: ['肯德基', '壹基金', '波音', '奥迪', '西门子'],
    contact: { phone: '021-66667777', website: 'www.yang-design.com' },
    score: 9.6,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=2201']
  },
  {
    id: '23',
    name: 'Blank',
    logo: 'https://picsum.photos/100/100?random=23',
    established: 2020,
    city: '杭州',
    tags: [ServiceCategory.ECOMMERCE, ServiceCategory.MARKETING],
    slogan: '新消费品牌孵化器',
    description: '专注于天猫/抖音生态的品牌代运营与投放增长。Blank不仅提供运营服务，更深度介入品牌的产品定义与供应链管理，是真正意义上的品牌共创伙伴。',
    clients: ['左点', '参半', 'Spes', 'KIMTRUE'],
    contact: { phone: '18600002222', email: 'bd@blank.com' },
    score: 9.0,
    isVerified: false,
    gallery: ['https://picsum.photos/600/400?random=2301']
  },
  {
    id: '24',
    name: 'MATCH 马马也',
    logo: 'https://picsum.photos/100/100?random=24',
    established: 2017,
    city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DESIGN],
    slogan: '创意解决商业问题',
    description: '由知名创意人莫康孙创立，致力于为客户提供行之有效的创意解决方案。不仅关注创意的艺术表现，更注重其在商业层面的转化与品牌资产的沉淀。',
    clients: ['维达', '统一', '腾讯', 'OPPO', '百事'],
    contact: { phone: '021-62223333', email: 'info@match-idea.com' },
    score: 9.4,
    isVerified: true,
    gallery: ['https://picsum.photos/600/400?random=2401']
  },

  // --- 25-50: 本土热店与知名机构 (Top Local & Creative Agencies) ---
  {
    id: '25', name: 'TianYuKong 天与空', logo: 'https://picsum.photos/100/100?random=25', established: 2013, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: '中国创意热店第一股',
    description: '中国营销界的独特存在，以"社会营销"见长。擅长打造引发社会讨论的现象级案例，致力于让广告成为社会新闻。',
    clients: ['淘宝', '青岛啤酒', '中国银联', '饿了么', '天猫'],
    contact: { phone: '021-33334444' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=2501']
  },
  {
    id: '26', name: 'GOODZILLA 意类', logo: 'https://picsum.photos/100/100?random=26', established: 2014, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DESIGN], slogan: '做广告界的异类',
    description: '小而美的创意热店，作品风格怪诞有趣，叙事能力极强，深受年轻受众喜爱。擅长通过反转剧情打造病毒视频。',
    clients: ['小猪短租', '欧利时', '宝洁', '美的', '天猫'],
    contact: { phone: '021-55556666' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=2601']
  },
  {
    id: '27', name: 'Verawom 环时互动', logo: 'https://picsum.photos/100/100?random=27', established: 2011, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '传播创造价值',
    description: '以杜蕾斯微博运营一战成名，是Social Marketing领域的黄埔军校。擅长捕捉热点，以四两拨千斤的文案和创意撬动社交传播。',
    clients: ['杜蕾斯', '五芳斋', '京东', '民生银行'],
    contact: { phone: '010-88889999' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=2701']
  },
  {
    id: '28', name: 'Dreaming Monster 鲸梦', logo: 'https://picsum.photos/100/100?random=28', established: 2013, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '内容营销专家',
    description: '擅长以音乐、动画等娱乐化内容赋能品牌营销。拥有强大的内部制作团队，能够产出高质量的原创音乐和动画广告。',
    clients: ['京东', '知乎', '每日优鲜', '字节跳动'],
    contact: { phone: '010-66667777' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=2801']
  },
  {
    id: '29', name: 'Goodidea 赞意', logo: 'https://picsum.photos/100/100?random=29', established: 2012, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.PR], slogan: '年轻化营销专家',
    description: '深耕娱乐营销与粉丝经济，帮助品牌连接年轻消费者。对饭圈文化有深刻洞察，擅长明星代言人营销与综艺IP合作。',
    clients: ['可口可乐', '伊利', '优酷', '完美日记'],
    contact: { phone: '010-11112222' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=2901']
  },
  {
    id: '30', name: 'Z+ 之外创意', logo: 'https://picsum.photos/100/100?random=30', established: 2014, city: '广州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: '冲击波营销',
    description: '坚持"冲击波营销"理论，追求低成本高效率的传播效果。擅长制造具有争议性或强视觉冲击的户外事件营销。',
    clients: ['华帝', '转转', '小罐茶', '知乎'],
    contact: { phone: '020-88887777' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3001']
  },
  {
    id: '31', name: 'Social Touch 时趣', logo: 'https://picsum.photos/100/100?random=31', established: 2011, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: 'AI驱动的营销',
    description: '结合创意与大数据的整合营销公司，拥有强大的技术驱动能力。通过自主研发的营销云平台，实现精准洞察与高效投放。',
    clients: ['宝洁', '京东', '联想', '三只松鼠'],
    contact: { phone: '010-99990000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3101']
  },
  {
    id: '32', name: 'MGCC 众引传播', logo: 'https://picsum.photos/100/100?random=32', established: 2006, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '实效营销',
    description: '专注于大数据驱动的实效营销，擅长母婴、快消等行业。提供从策略到执行的全案服务，注重营销ROI。',
    clients: ['戴森', '联合利华', '强生', '多芬'],
    contact: { phone: '021-44445555' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3201']
  },
  {
    id: '33', name: 'Hylink 华扬联众', logo: 'https://picsum.photos/100/100?random=33', established: 1994, city: '北京',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.MARKETING], slogan: '数字营销巨头',
    description: '老牌数字营销公司，提供全方位的广告代理与数字服务。作为冬奥会官方赞助商，拥有丰富的体育营销资源。',
    clients: ['上汽', '雅诗兰黛', '蒙牛', '京东'],
    contact: { phone: '010-22223333' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3301']
  },
  {
    id: '34', name: 'Arkr 氩氪', logo: 'https://picsum.photos/100/100?random=34', established: 2009, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.MARKETING], slogan: '化学反应般的创意',
    description: '知名的数字互动创意代理商，擅长社会化媒体营销与移动端互动体验。最早提出LBS营销理念的公司之一。',
    clients: ['丝芙兰', '米其林', '上海家化', '阿迪达斯'],
    contact: { phone: '021-77778888' }, score: 9.2, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3401']
  },
  {
    id: '35', name: 'Tiger Pan 潘虎', logo: 'https://picsum.photos/100/100?random=35', established: 2012, city: '深圳',
    tags: [ServiceCategory.PACKAGING, ServiceCategory.DESIGN], slogan: '包装设计界的大师',
    description: '专注于高端消费品包装设计，作品极具视觉冲击力与艺术感。擅长将传统文化元素与现代设计手法结合，重塑品牌价值。',
    clients: ['王老吉', '良品铺子', '雪花啤酒', '鲁花'],
    contact: { phone: '0755-12345678' }, score: 9.9, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3501']
  },
  {
    id: '36', name: 'Lingyun 凌云创意', logo: 'https://picsum.photos/100/100?random=36', established: 2013, city: '深圳',
    tags: [ServiceCategory.PACKAGING], slogan: '酒类包装专家',
    description: '深耕酒类包装设计领域，对材质与工艺有极致追求。擅长通过瓶型创新与标签工艺提升产品的高级感。',
    clients: ['剑南春', '洋河', '长城葡萄酒', '五粮液'],
    contact: { phone: '0755-87654321' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3601']
  },
  {
    id: '37', name: 'Boxin 柏星龙', logo: 'https://picsum.photos/100/100?random=37', established: 1999, city: '深圳',
    tags: [ServiceCategory.PACKAGING, ServiceCategory.STRATEGY], slogan: '包装赋予产品生命',
    description: '国内领先的创意包装整体解决方案提供商。拥有强大的生产供应链能力，提供从设计到生产的一站式服务。',
    clients: ['茅台', '古井贡酒', '欧莱雅', '燕之屋'],
    contact: { phone: '0755-11112222' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3701']
  },
  {
    id: '38', name: 'Xiancao 贤草', logo: 'https://picsum.photos/100/100?random=38', established: 2010, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: '品牌美学管理',
    description: '擅长品牌识别系统设计与美学升级。为众多新消费品牌提供了从0到1的视觉体系构建，风格简约清新。',
    clients: ['外婆家', '西贝', '乐乐茶', '松鹤楼'],
    contact: { phone: '021-66669999' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3801']
  },
  {
    id: '39', name: 'KL&K 靳刘高', logo: 'https://picsum.photos/100/100?random=39', established: 1976, city: '香港',
    tags: [ServiceCategory.DESIGN, ServiceCategory.STRATEGY], slogan: '国际设计视野',
    description: '享誉国际的设计公司，由靳埭强、刘小康、高少康领衔。作品兼具商业价值与文化深度，是许多大型机构品牌重塑的首选。',
    clients: ['中国银行', '屈臣氏', '八马茶业', '深圳机场'],
    contact: { phone: '852-22223333' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=3901']
  },
  {
    id: '40', name: 'ChenSong 陈宋', logo: 'https://picsum.photos/100/100?random=40', established: 2016, city: '深圳',
    tags: [ServiceCategory.DESIGN, ServiceCategory.PACKAGING], slogan: '新东方美学',
    description: '致力于探索东方美学在现代商业设计中的应用。作品风格细腻、雅致，擅长茶叶、汉方护肤等品类的设计。',
    clients: ['茶颜悦色', '三顿半', '书亦烧仙草', '阿宽'],
    contact: { phone: '0755-99998888' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4001']
  },
  {
    id: '41', name: 'Magpie 喜鹊包装', logo: 'https://picsum.photos/100/100?random=41', established: 2015, city: '北京',
    tags: [ServiceCategory.PACKAGING], slogan: '有惊喜的包装',
    description: '风格鲜明，擅长插画风格与故事性包装。拒绝平庸，每一个包装作品都像一个独立的艺术品，具有极高的货架辨识度。',
    clients: ['三只松鼠', '百草味', '洽洽', '信良记'],
    contact: { phone: '010-55554444' }, score: 9.2, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4101']
  },
  {
    id: '42', name: 'Baozun 宝尊', logo: 'https://picsum.photos/100/100?random=42', established: 2007, city: '上海',
    tags: [ServiceCategory.ECOMMERCE, ServiceCategory.DIGITAL], slogan: '品牌电商商业伙伴',
    description: '中国领先的品牌电商服务商，提供全链路电商运营服务。包括IT解决方案、店站运营、数字营销、客户服务及仓储物流。',
    clients: ['Nike', 'Microsoft', 'Philips', 'Starbucks'],
    contact: { phone: '021-88889999' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4201']
  },
  {
    id: '43', name: '1N1 壹网壹创', logo: 'https://picsum.photos/100/100?random=43', established: 2012, city: '杭州',
    tags: [ServiceCategory.ECOMMERCE, ServiceCategory.MARKETING], slogan: '快消品电商专家',
    description: '专注于美妆快消垂直领域的电商运营服务商。擅长通过数据化运营和创意营销提升品牌在天猫等平台的销售业绩。',
    clients: ['百雀羚', 'Olay', '宝洁', '伊丽莎白雅顿'],
    contact: { phone: '0571-88887777' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4301']
  },
  {
    id: '44', name: 'Lily&Beauty 丽人丽妆', logo: 'https://picsum.photos/100/100?random=44', established: 2010, city: '上海',
    tags: [ServiceCategory.ECOMMERCE], slogan: '美妆电商领跑者',
    description: '国内知名的化妆品网络零售服务商。与全球众多知名美妆集团建立合作，拥有丰富的美妆品牌运营经验。',
    clients: ['雪花秀', '兰芝', '施华蔻', '凡士林'],
    contact: { phone: '021-33332222' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4401']
  },
  {
    id: '45', name: 'RooLife 若羽臣', logo: 'https://picsum.photos/100/100?random=45', established: 2011, city: '广州',
    tags: [ServiceCategory.ECOMMERCE], slogan: '母婴保健电商专家',
    description: '深耕母婴、保健品领域的电商综合服务商。为国际品牌进入中国市场提供从渠道布局到品牌营销的全方位支持。',
    clients: ['合生元', 'Swisse', '美赞臣', '汤臣倍健'],
    contact: { phone: '020-66665555' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4501']
  },
  {
    id: '46', name: 'EZR 驿氪', logo: 'https://picsum.photos/100/100?random=46', established: 2015, city: '上海',
    tags: [ServiceCategory.DIGITAL], slogan: '消费者增长平台',
    description: '专注于零售行业的CRM与消费者运营平台。帮助品牌沉淀私域流量，通过会员营销提升复购率。',
    clients: ['九牧王', '七匹狼', '影儿', '全棉时代'],
    contact: { phone: '400-888-9999' }, score: 9.1, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4601']
  },
  {
    id: '47', name: 'Youzan 有赞', logo: 'https://picsum.photos/100/100?random=47', established: 2012, city: '杭州',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.ECOMMERCE], slogan: '做生意，用有赞',
    description: '提供私域电商与门店数字化解决方案。帮助商家搭建微信商城，实现社交电商变现与全渠道经营。',
    clients: ['戴尔', '良品铺子', '韩都衣舍', 'TCL'],
    contact: { phone: '0571-77776666' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4701']
  },
  {
    id: '48', name: 'Weimob 微盟', logo: 'https://picsum.photos/100/100?random=48', established: 2013, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.MARKETING], slogan: '智慧商业服务商',
    description: '微信生态内领先的中小企业云端商业及营销解决方案提供商。提供微商城、智慧零售、智慧餐饮等系统工具。',
    clients: ['沃尔玛', '联想', '梦洁', '林清轩'],
    contact: { phone: '021-66668888' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4801']
  },
  {
    id: '49', name: 'Titan 钛动科技', logo: 'https://picsum.photos/100/100?random=49', established: 2017, city: '广州',
    tags: [ServiceCategory.OVERSEAS, ServiceCategory.DIGITAL], slogan: 'BI与大数据驱动出海',
    description: '基于大数据和BI的商业智能企业服务公司，助力中国企业出海。提供跨媒体广告投放与效果优化服务。',
    clients: ['百度', '快手', '腾讯游戏', 'PatPat'],
    contact: { phone: '020-12341234' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=4901']
  },
  {
    id: '50', name: 'Meetsocial 飞书深诺', logo: 'https://picsum.photos/100/100?random=50', established: 2013, city: '上海',
    tags: [ServiceCategory.OVERSEAS, ServiceCategory.MARKETING], slogan: '跨境营销专家',
    description: '专注跨境数字营销，是Facebook、Google等平台的官方代理商。为出海企业提供媒介采买、创意素材及优化服务。',
    clients: ['阿里巴巴', '腾讯', '字节跳动', '小米'],
    contact: { phone: '021-98765432' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5001']
  },

  // --- 51-121: 补全的真实服务商 (Verified Added Agencies) ---

  // 创意与热店 (Creative)
  {
    id: '51', name: 'Karma 颉摩广告', logo: 'https://picsum.photos/100/100?random=51', established: 2012, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: '独立创意代理商',
    description: '上海知名的独立创意热店，以脑洞大开的视频广告著称。擅长为品牌打造具有病毒传播力的营销战役。',
    clients: ['Keep', 'OPPO', 'Vivo', '饿了么'],
    contact: { phone: '021-63337777', website: 'karma.com.cn' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5101']
  },
  {
    id: '52', name: 'LxU', logo: 'https://picsum.photos/100/100?random=52', established: 2011, city: '北京',
    tags: [ServiceCategory.DESIGN, ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '内容营销与设计创新',
    description: '一家依托设计、技术、广告的创新内容营销机构。作品视觉风格极具辨识度，擅长信息可视化与动态设计。',
    clients: ['Adobe', 'New Balance', '阿里巴巴', '麦当劳'],
    contact: { phone: '010-85800000', website: 'lxustudio.com' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5201']
  },
  {
    id: '53', name: 'The NINE', logo: 'https://picsum.photos/100/100?random=53', established: 2013, city: '上海',
    tags: [ServiceCategory.DESIGN, ServiceCategory.MARKETING], slogan: '艺术驱动商业',
    description: '由著名创意人熊超创立，致力于将艺术、设计与商业完美融合。作品多次获得戛纳狮子等国际大奖，具有极高的艺术水准。',
    clients: ['华帝', 'Rokid', '南孚', '老板电器'],
    contact: { phone: '021-62228888' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5301']
  },
  {
    id: '54', name: 'F5', logo: 'https://picsum.photos/100/100?random=54', established: 2016, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.MARKETING], slogan: '技术驱动创意',
    description: '一家擅长结合前沿技术与人文创意的代理商。利用AI、VR等技术为品牌创造独特的互动体验。',
    clients: ['百度', '淘宝', '美的', '辉瑞'],
    contact: { phone: '021-55551111', website: 'f5.sh' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5401']
  },
  {
    id: '55', name: 'Amber 琥珀传播', logo: 'https://picsum.photos/100/100?random=55', established: 2005, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '整合数字营销',
    description: '利欧数字旗下的一线创意代理商，致力于通过创意与实效的双重驱动，帮助品牌实现商业增长。',
    clients: ['可口可乐', 'Diesel', '杜蕾斯', '蘑菇街'],
    contact: { phone: '021-33339999' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5501']
  },
  {
    id: '56', name: 'Civilization 文明广告', logo: 'https://picsum.photos/100/100?random=56', established: 2012, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: '全天候创意伙伴',
    description: '以“不关灯”的服务精神著称，是百事可乐等国际大牌在中国的长期创意合作伙伴，擅长娱乐营销与大型战役。',
    clients: ['百事可乐', '乐事', '康师傅', '七喜'],
    contact: { phone: '021-64660000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5601']
  },
  {
    id: '57', name: 'LPI', logo: 'https://picsum.photos/100/100?random=57', established: 2016, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '年轻的创意力量',
    description: '一家年轻且充满活力的创意机构，擅长为互联网平台和科技品牌打造符合Z世代审美的营销内容。',
    clients: ['天猫', '腾讯视频', 'Vivo', '抖音'],
    contact: { phone: '010-65000000' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5701']
  },
  {
    id: '58', name: 'STORY 故事', logo: 'https://picsum.photos/100/100?random=58', established: 2014, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '讲好品牌故事',
    description: '专注于社交媒体传播与内容营销。擅长通过情感化的叙事和精准的KOL策略，在社交平台上制造话题。',
    clients: ['Vivo', '抖音', '美团', '滴滴'],
    contact: { phone: '010-88000000' }, score: 9.2, isVerified: false, gallery: ['https://picsum.photos/600/400?random=5801']
  },
  {
    id: '59', name: 'United Design Lab (UDL)', logo: 'https://picsum.photos/100/100?random=59', established: 2012, city: '北京',
    tags: [ServiceCategory.DESIGN], slogan: '跨学科设计实验室',
    description: '一家具有国际视野的设计工作室，业务涵盖品牌视觉、导视系统及艺术指导。作品风格严谨、现代。',
    clients: ['UCCA尤伦斯当代艺术中心', '李宁', '也是', '多抓鱼'],
    contact: { phone: '010-64000000' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=5901']
  },
  {
    id: '60', name: 'Sense Team 感观山河', logo: 'https://picsum.photos/100/100?random=60', established: 1999, city: '深圳',
    tags: [ServiceCategory.DESIGN, ServiceCategory.STRATEGY], slogan: '推动品牌进化',
    description: '由黑一烊创立的知名设计公司，致力于将文化艺术与商业设计结合。在城市品牌塑造和文化地产领域有深厚积累。',
    clients: ['深圳时装周', '华润置地', '仁恒置地', '万科'],
    contact: { phone: '0755-82000000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6001']
  },

  // 国际 4A & 咨询 (Global 4A & Consulting)
  {
    id: '61', name: 'Ogilvy 奥美', logo: 'https://picsum.photos/100/100?random=61', established: 1948, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY, ServiceCategory.PR], slogan: '让品牌更有意义',
    description: '全球最具影响力的广告公司之一，提供品牌策略、广告创意、公关影响力等全方位服务。',
    clients: ['肯德基', '可口可乐', 'IBM', '资生堂'],
    contact: { phone: '021-24051000', website: 'ogilvy.com' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6101']
  },
  {
    id: '62', name: 'BBDO', logo: 'https://picsum.photos/100/100?random=62', established: 1891, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: 'The Work. The Work. The Work.',
    description: '以卓越的创意著称的4A广告公司，长期服务于玛氏、奔驰等全球顶级客户，斩获无数创意大奖。',
    clients: ['德芙', '士力架', '梅赛德斯-奔驰', '百事'],
    contact: { phone: '021-23211000' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6201']
  },
  {
    id: '63', name: 'Saatchi & Saatchi 盛世长城', logo: 'https://picsum.photos/100/100?random=63', established: 1970, city: '广州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: 'Nothing is Impossible',
    description: '宝洁在全球最大的代理商之一，擅长为大众消费品打造深入人心的品牌形象与传播战役。',
    clients: ['宝洁', '保时捷', '海飞丝', '舒肤佳'],
    contact: { phone: '020-87771000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6301']
  },
  {
    id: '64', name: 'Leo Burnett 李奥贝纳', logo: 'https://picsum.photos/100/100?random=64', established: 1935, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DESIGN], slogan: '伸手摘星',
    description: '以“Humankind”为创意哲学，相信创意的力量可以改变人的行为。是麦当劳的长期合作伙伴。',
    clients: ['麦当劳', '华为', 'SK-II', '凯迪拉克'],
    contact: { phone: '021-22221000' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6401']
  },
  {
    id: '65', name: 'McCann 麦肯', logo: 'https://picsum.photos/100/100?random=65', established: 1902, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: 'Truth Well Told',
    description: '全球最大的广告网络之一，以“善诠涵意，巧传真实”为宗旨，服务于众多全球化品牌。',
    clients: ['欧莱雅', '通用汽车', '雀巢', '万事达卡'],
    contact: { phone: '021-24011000' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6501']
  },
  {
    id: '66', name: 'TBWA\China', logo: 'https://picsum.photos/100/100?random=66', established: 1970, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: 'Disruption (颠覆)',
    description: '以“颠覆”理论闻名，擅长打破常规，为品牌寻找新的增长点。是苹果公司的全球御用代理商。',
    clients: ['Apple', 'Adidas', '宝马', '戴尔'],
    contact: { phone: '021-33331000' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6601']
  },
  {
    id: '67', name: 'Dentsu 电通', logo: 'https://picsum.photos/100/100?random=67', established: 1901, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '创新品牌体验',
    description: '源自日本的全球最大单体广告公司，拥有强大的媒介购买能力与体育营销资源。',
    clients: ['丰田', '佳能', '资生堂', '康师傅'],
    contact: { phone: '010-65001000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6701']
  },
  {
    id: '68', name: 'Publicis 阳狮', logo: 'https://picsum.photos/100/100?random=68', established: 1926, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: 'Lead the Change',
    description: '法国最大的广告传播集团，提供从咨询到创意、媒介、数字营销的一站式服务。',
    clients: ['雀巢', '喜力', '欧莱雅', '赛诺菲'],
    contact: { phone: '021-22001000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6801']
  },
  {
    id: '69', name: 'Havas 汉威士', logo: 'https://picsum.photos/100/100?random=69', established: 1835, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.PR], slogan: 'Make Meaningful Difference',
    description: '全球六大广告集团之一，注重品牌与消费者之间有意义的连接。',
    clients: ['标致', '雪铁龙', '埃克森美孚', '华为'],
    contact: { phone: '021-61001000' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=6901']
  },
  {
    id: '70', name: 'Wieden+Kennedy', logo: 'https://picsum.photos/100/100?random=70', established: 1982, city: '上海',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: 'Just Do It',
    description: '全球最负盛名的独立广告代理商之一，以Nike的传奇广告而闻名。作品极具文化洞察力。',
    clients: ['Nike', '宜家', '惠普', '宝马'],
    contact: { phone: '021-61008888' }, score: 9.9, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7001']
  },
  {
    id: '71', name: 'AKQA', logo: 'https://picsum.photos/100/100?random=71', established: 1994, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.DESIGN], slogan: 'The Future inspired',
    description: '全球顶尖的数字创意公司，专注于创新、体验设计与技术开发。',
    clients: ['Nike', 'Apple', 'Gore-Tex', 'Maserati'],
    contact: { phone: '021-52001000' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7101']
  },
  {
    id: '72', name: 'R/GA', logo: 'https://picsum.photos/100/100?random=72', established: 1977, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.STRATEGY], slogan: 'Connected Age',
    description: '以技术和设计驱动的创新机构，帮助品牌适应互联时代。擅长产品创新与数字化转型。',
    clients: ['Nike', 'Google', 'Samsung', 'Patagonia'],
    contact: { phone: '021-60001000' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7201']
  },
  {
    id: '73', name: 'VML', logo: 'https://picsum.photos/100/100?random=73', established: 1992, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.MARKETING], slogan: 'We Create Connected Brands',
    description: '由VMLY&R与Wunderman Thompson合并而成，是目前全球最大的创意公司之一，数字化能力极强。',
    clients: ['戴尔', '英特尔', '福特', '高露洁'],
    contact: { phone: '021-24001000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7301']
  },
  {
    id: '74', name: 'Isobar 安索帕', logo: 'https://picsum.photos/100/100?random=74', established: 2004, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.ECOMMERCE], slogan: 'Invent. Make. Change.',
    description: '电通集团旗下的数字营销代理商，擅长整合创意与技术，提供数字化转型服务。',
    clients: ['可口可乐', '肯德基', '百威', '资生堂'],
    contact: { phone: '021-33351000' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7401']
  },
  {
    id: '75', name: 'Digitas', logo: 'https://picsum.photos/100/100?random=75', established: 1980, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.STRATEGY], slogan: 'The Connected Marketing Agency',
    description: '阳狮集团旗下的数字营销与数据公司，强调数据驱动的创意与媒介投放。',
    clients: ['惠普', '达美航空', 'CVS', 'Under Armour'],
    contact: { phone: '021-22002000' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7501']
  },

  // 公关与品牌咨询 (PR & Branding)
  {
    id: '76', name: 'Ruder Finn 罗德公关', logo: 'https://picsum.photos/100/100?random=76', established: 1948, city: '北京',
    tags: [ServiceCategory.PR], slogan: 'What\'s Next',
    description: '在奢侈品、汽车、医疗健康领域的公关服务处于绝对领先地位。',
    clients: ['卡地亚', '爱马仕', '米其林', '大众汽车'],
    contact: { phone: '010-64627321' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7601']
  },
  {
    id: '77', name: 'Weber Shandwick 万博宣伟', logo: 'https://picsum.photos/100/100?random=77', established: 2001, city: '北京',
    tags: [ServiceCategory.PR], slogan: 'Engaging Always',
    description: '全球领先的公关咨询公司，提供企业声誉管理、危机公关及整合营销服务。',
    clients: ['Nike', '联合利华', '万事达卡', '辉瑞'],
    contact: { phone: '010-85699888' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7701']
  },
  {
    id: '78', name: 'Edelman 爱德曼', logo: 'https://picsum.photos/100/100?random=78', established: 1952, city: '北京',
    tags: [ServiceCategory.PR], slogan: 'Trust Barometer',
    description: '全球最大的独立公关公司，每年发布的“信任度调查报告”具有广泛影响力。',
    clients: ['星巴克', '惠普', '强生', '微软'],
    contact: { phone: '010-56768888' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7801']
  },
  {
    id: '79', name: 'Ogilvy PR 奥美公关', logo: 'https://picsum.photos/100/100?random=79', established: 1980, city: '北京',
    tags: [ServiceCategory.PR], slogan: 'Making Brands Matter',
    description: '奥美集团旗下的公关网络，擅长品牌建设与整合传播。',
    clients: ['福特', 'IBM', '雀巢', '英特尔'],
    contact: { phone: '010-85203000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=7901']
  },
  {
    id: '80', name: 'BCW', logo: 'https://picsum.photos/100/100?random=80', established: 1953, city: '北京',
    tags: [ServiceCategory.PR], slogan: 'Moving People',
    description: '由博雅公关和凯维公关合并而成，是全球最大的全方位传播代理商之一。',
    clients: ['华为', '联想', '迪拜旅游局', '宜家'],
    contact: { phone: '010-58162888' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8001']
  },
  {
    id: '81', name: 'Interbrand', logo: 'https://picsum.photos/100/100?random=81', established: 1974, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: 'Creating and Managing Brand Value',
    description: '全球最大的品牌咨询公司，每年发布的“全球最佳品牌榜”是行业风向标。',
    clients: ['华为', '中国平安', '腾讯', '三星'],
    contact: { phone: '021-61692000' }, score: 9.9, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8101']
  },
  {
    id: '82', name: 'Landor & Fitch', logo: 'https://picsum.photos/100/100?random=82', established: 1941, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: 'Extraordinary Transformation',
    description: '全球领先的品牌与体验设计公司，擅长品牌定位、视觉识别与零售环境设计。',
    clients: ['青岛啤酒', 'BP', '宝马', '微软'],
    contact: { phone: '021-23197000' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8201']
  },
  {
    id: '83', name: 'Siegel+Gale', logo: 'https://picsum.photos/100/100?random=83', established: 1969, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: 'Simple is Smart',
    description: '以“简约”为核心理念的品牌战略咨询公司，帮助品牌简化沟通，提升效率。',
    clients: ['SAP', '美国运通', '辉瑞', 'NBA'],
    contact: { phone: '021-60321000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8301']
  },
  {
    id: '84', name: 'Wolff Olins', logo: 'https://picsum.photos/100/100?random=84', established: 1965, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: 'Ambitious Brands',
    description: '极具前瞻性的品牌咨询公司，为TikTok、Uber等科技巨头提供品牌重塑服务。',
    clients: ['TikTok', 'Uber', 'Google', 'Alibaba'],
    contact: { phone: '021-55551234' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8401']
  },
  {
    id: '85', name: 'FutureBrand', logo: 'https://picsum.photos/100/100?random=85', established: 1999, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: 'Future Proof',
    description: '专注于未来的品牌咨询公司，擅长预测趋势并帮助品牌适应未来市场。',
    clients: ['阿里巴巴', '茅台', '联想', '奈斯派索'],
    contact: { phone: '021-61031000' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8501']
  },
  {
    id: '86', name: 'Superunion', logo: 'https://picsum.photos/100/100?random=86', established: 2018, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: 'Upstream Creativity',
    description: 'WPP旗下的大型品牌咨询与设计公司，由The Partners等五家公司合并而成。',
    clients: ['腾讯', '万科', '戴尔', '喜力'],
    contact: { phone: '021-24051888' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8601']
  },
  {
    id: '87', name: 'Kotler Marketing 科特勒', logo: 'https://picsum.photos/100/100?random=87', established: 1999, city: '深圳',
    tags: [ServiceCategory.STRATEGY], slogan: '现代营销之父',
    description: '基于菲利普·科特勒营销理论的咨询公司，为企业提供顶层营销战略设计。',
    clients: ['百度', 'TCL', '雪花啤酒', '中航国际'],
    contact: { phone: '0755-88280000' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8701']
  },
  {
    id: '88', name: 'Ries Positioning 里斯战略', logo: 'https://picsum.photos/100/100?random=88', established: 1963, city: '上海',
    tags: [ServiceCategory.STRATEGY], slogan: '定位理论开创者',
    description: '由艾·里斯创立，专注于“定位”理论的落地与实践，帮助企业占据心智。',
    clients: ['长城汽车', '老板电器', '君乐宝', '今麦郎'],
    contact: { phone: '021-60005000' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8801']
  },
  {
    id: '89', name: 'Trout & Partners 特劳特', logo: 'https://picsum.photos/100/100?random=89', established: 1994, city: '上海',
    tags: [ServiceCategory.STRATEGY], slogan: '定位',
    description: '专注于战略定位咨询，协助企业通过独特的定位实现市场突围。',
    clients: ['瓜子二手车', '东鹏特饮', '老乡鸡', '青花郎'],
    contact: { phone: '021-50001000' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=8901']
  },
  {
    id: '90', name: 'Junzhi 君智', logo: 'https://picsum.photos/100/100?random=90', established: 2015, city: '上海',
    tags: [ServiceCategory.STRATEGY], slogan: '竞争战略',
    description: '本土顶尖的战略咨询机构，擅长结合西方管理理论与中国传统智慧。',
    clients: ['飞鹤奶粉', '雅迪电动车', '波司登', '竹叶青'],
    contact: { phone: '021-31000000' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9001']
  },

  // 本土综合与数字营销 (Local Integrated & Digital)
  {
    id: '91', name: 'Inssent 因赛集团', logo: 'https://picsum.photos/100/100?random=91', established: 2002, city: '广州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.STRATEGY], slogan: '品牌营销全链条',
    description: '国内知名的综合性品牌营销集团，提供从策略到执行的全链条服务。',
    clients: ['华为', '腾讯', '美的', '长隆'],
    contact: { phone: '020-85551000' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9101']
  },
  {
    id: '92', name: 'GIMC 省广集团', logo: 'https://picsum.photos/100/100?random=92', established: 1979, city: '广州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.PR], slogan: '中国广告业扛旗者',
    description: '中国本土最大的广告集团之一，拥有全产业链服务能力和庞大的媒体资源。',
    clients: ['广汽传祺', '伊利', '海天', '中国移动'],
    contact: { phone: '020-87654321' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9201']
  },
  {
    id: '93', name: 'Leo Digital 利欧数字', logo: 'https://picsum.photos/100/100?random=93', established: 2014, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.MARKETING], slogan: '数字驱动商业',
    description: 'A股上市公司利欧股份旗下数字营销板块，整合了琥珀传播、氩氪等知名机构。',
    clients: ['360', '携程', '方太', '苏泊尔'],
    contact: { phone: '021-33001000' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9301']
  },
  {
    id: '94', name: 'Linksus 灵思云途', logo: 'https://picsum.photos/100/100?random=94', established: 1999, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '大数据营销',
    description: '国内领先的大数据营销机构，擅长汽车、快消领域的整合营销。',
    clients: ['宝马', '奥迪', '伊利', '中国银行'],
    contact: { phone: '010-88881000' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9401']
  },
  {
    id: '95', name: 'Tensyn PR 迪思传媒', logo: 'https://picsum.photos/100/100?random=95', established: 1996, city: '北京',
    tags: [ServiceCategory.PR, ServiceCategory.MARKETING], slogan: '数字时代的公关传播',
    description: '中国最早的公关公司之一，在汽车公关领域拥有绝对优势。',
    clients: ['长安汽车', '滴滴', '中粮', '蒙牛'],
    contact: { phone: '010-58001000' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9501']
  },

  // 电商、MCN 与 出海 (Ecom, MCN, Overseas)
  {
    id: '97', name: 'UCO 悠可', logo: 'https://picsum.photos/100/100?random=97', established: 2010, city: '杭州',
    tags: [ServiceCategory.ECOMMERCE], slogan: '美妆电商服务专家',
    description: '专注于高端美妆品牌的电商代运营，是众多国际一线大牌在中国的首选合作伙伴。',
    clients: ['娇韵诗', '欧舒丹', 'Sisley', 'Valmont'],
    contact: { phone: '0571-88885000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9701']
  },
  {
    id: '98', name: 'Kayee 凯诘电商', logo: 'https://picsum.photos/100/100?random=98', established: 2010, city: '上海',
    tags: [ServiceCategory.ECOMMERCE], slogan: '全渠道电商服务商',
    description: '提供电商策略、运营、营销、IT及客服一站式服务，深耕食品、母婴等品类。',
    clients: ['肯德基', '汉高', '格力高', '大王'],
    contact: { phone: '021-66001000' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9801']
  },
  {
    id: '99', name: 'Xingyun 行云集团', logo: 'https://picsum.photos/100/100?random=99', established: 2015, city: '深圳',
    tags: [ServiceCategory.OVERSEAS, ServiceCategory.ECOMMERCE], slogan: '让全球买卖变得更简单',
    description: '中国领先的消费品数字供应链服务平台，助力品牌出海与跨境进口。',
    clients: ['全球各类消费品牌'],
    contact: { phone: '0755-88001000' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=9901']
  },
  {
    id: '100', name: 'Qingmu 青木', logo: 'https://picsum.photos/100/100?random=100', established: 2011, city: '广州',
    tags: [ServiceCategory.ECOMMERCE], slogan: '数据驱动的电商服务',
    description: '专注于时尚服饰与美妆行业的电商代运营服务商。',
    clients: ['H&M', 'Skechers', 'Emporio Armani', 'Zara Home'],
    contact: { phone: '020-33001000' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10001']
  },
  {
    id: '101', name: 'BlueMedia 蓝瀚互动', logo: 'https://picsum.photos/100/100?random=101', established: 2015, city: '北京',
    tags: [ServiceCategory.OVERSEAS, ServiceCategory.MARKETING], slogan: '一站式出海营销',
    description: '蓝色光标旗下专注出海营销的子品牌，Facebook、Google等官方一级代理。',
    clients: ['TikTok', 'Google', 'CCTV', '中国国际航空'],
    contact: { phone: '010-55001000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10101']
  },
  {
    id: '102', name: 'PandaMobo 熊猫新媒', logo: 'https://picsum.photos/100/100?random=102', established: 2015, city: '北京',
    tags: [ServiceCategory.OVERSEAS, ServiceCategory.MARKETING], slogan: '中国互联网出海第一平台',
    description: '专注于为中国企业提供海外新媒体营销解决方案，擅长政府与媒体的出海传播。',
    clients: ['人民日报', '新华社', '腾讯游戏', '支付宝'],
    contact: { phone: '010-88002000' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10201']
  },
  {
    id: '103', name: 'Madhouse 亿动', logo: 'https://picsum.photos/100/100?random=103', established: 2006, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.MARKETING], slogan: '移动营销领航者',
    description: '中国最早的移动广告平台之一，提供移动端的程序化购买与品牌营销服务。',
    clients: ['可口可乐', 'Nike', '联合利华', '麦当劳'],
    contact: { phone: '021-52005000' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10301']
  },
  {
    id: '104', name: 'Domob 多盟', logo: 'https://picsum.photos/100/100?random=104', established: 2010, city: '北京',
    tags: [ServiceCategory.DIGITAL], slogan: '智能移动营销',
    description: '中国领先的智能移动营销平台，拥有强大的技术与数据能力。',
    clients: ['京东', '美团', '唯品会', '携程'],
    contact: { phone: '010-66001000' }, score: 9.2, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10401']
  },
  {
    id: '105', name: 'Papitube', logo: 'https://picsum.photos/100/100?random=105', established: 2016, city: '北京',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '短视频MCN',
    description: '由Papi酱成立的短视频MCN机构，孵化了众多头部网红，擅长内容种草。',
    clients: ['YSL', 'Dyson', '欧莱雅', '完美日记'],
    contact: { phone: '010-85001000' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10501']
  },
  {
    id: '106', name: 'Dayu 大禹', logo: 'https://picsum.photos/100/100?random=106', established: 2014, city: '苏州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.DIGITAL], slogan: '头部数字内容生产商',
    description: '国内顶尖的MCN机构，拥有“一禅小和尚”等知名IP，覆盖美妆、动漫等多个领域。',
    clients: ['完美日记', '花西子', '膜法世家', '阿玛尼'],
    contact: { phone: '0512-66001000' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10601']
  },
  {
    id: '107', name: 'Onion Global 洋葱', logo: 'https://picsum.photos/100/100?random=107', established: 2016, city: '广州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.ECOMMERCE], slogan: '美好生活品牌孵化',
    description: '全球化品牌管理集团，旗下拥有众多知名红人与自有品牌，擅长红人营销。',
    clients: ['宝洁', '资生堂', '美的', '戴森'],
    contact: { phone: '020-38001000' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10701']
  },
  {
    id: '108', name: 'Joy Media 无忧传媒', logo: 'https://picsum.photos/100/100?random=108', established: 2016, city: '杭州',
    tags: [ServiceCategory.MARKETING, ServiceCategory.ECOMMERCE], slogan: '网红经济全产业链',
    description: '抖音生态最大的MCN机构之一，拥有刘畊宏、多余和毛毛姐等超级头部达人。',
    clients: ['抖音电商', '欧莱雅', '蒙牛', '海尔'],
    contact: { phone: '0571-86001000' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10801']
  },
  {
    id: '109', name: 'Meiwan 美腕', logo: 'https://picsum.photos/100/100?random=109', established: 2014, city: '上海',
    tags: [ServiceCategory.ECOMMERCE, ServiceCategory.MARKETING], slogan: '直播电商领跑者',
    description: '李佳琦背后的公司，专注于直播电商与IP孵化，具有极强的带货能力。',
    clients: ['欧莱雅', '花西子', '娇兰', '雅诗兰黛'],
    contact: { phone: '021-33005000' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=10901']
  },
  {
    id: '110', name: 'Qianxun 谦寻', logo: 'https://picsum.photos/100/100?random=110', established: 2017, city: '杭州',
    tags: [ServiceCategory.ECOMMERCE, ServiceCategory.MARKETING], slogan: '新内容电商直播机构',
    description: '头部直播电商机构，拥有完善的供应链体系和主播矩阵。',
    clients: ['宝洁', '百草味', '三只松鼠', '周大福'],
    contact: { phone: '0571-89001000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11001']
  },
  {
    id: '111', name: 'Low Key Design', logo: 'https://picsum.photos/100/100?random=111', established: 2015, city: '上海',
    tags: [ServiceCategory.DESIGN, ServiceCategory.PACKAGING], slogan: '低调设计',
    description: '一家专注于精品咖啡与生活方式品牌的设计工作室，风格极简且富有质感。',
    clients: ['Manner Coffee', 'Seesaw', 'M Stand', 'Basic Coffee'],
    contact: { phone: '021-62001000' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11101']
  },
  {
    id: '112', name: 'Another Design', logo: 'https://picsum.photos/100/100?random=112', established: 2014, city: '广州',
    tags: [ServiceCategory.DESIGN], slogan: '另一种可能性',
    description: '活跃于文化艺术与商业设计领域，作品具有强烈的实验性与视觉张力。',
    clients: ['广州大剧院', '时代美术馆', '方所', '例外'],
    contact: { phone: '020-84001000' }, score: 9.2, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11201']
  },
  {
    id: '113', name: '702 Design', logo: 'https://picsum.photos/100/100?random=113', established: 2010, city: '北京',
    tags: [ServiceCategory.DESIGN], slogan: '设计与艺术的边界',
    description: '一家极具艺术气质的设计工作室，擅长书籍设计、展览视觉与品牌形象。',
    clients: ['798艺术区', 'UCCA', '单向空间', '理想国'],
    contact: { phone: '010-84002000' }, score: 9.3, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11301']
  },
  {
    id: '114', name: 'Y.Studio', logo: 'https://picsum.photos/100/100?random=114', established: 2016, city: '深圳',
    tags: [ServiceCategory.DESIGN, ServiceCategory.PACKAGING], slogan: '年轻的设计力量',
    description: '专注于新消费品牌的设计机构，擅长通过年轻化的视觉语言与消费者沟通。',
    clients: ['喜茶', '奈雪的茶', '好利来', '墨茉点心局'],
    contact: { phone: '0755-26001000' }, score: 9.4, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11401']
  },
  {
    id: '115', name: 'MetaDesign', logo: 'https://picsum.photos/100/100?random=115', established: 1979, city: '北京',
    tags: [ServiceCategory.DESIGN, ServiceCategory.STRATEGY], slogan: 'Creative Brand Consultancy',
    description: '德国知名的品牌设计咨询公司，以严谨的系统化设计著称。',
    clients: ['大众汽车', '保时捷', '西门子', '海尔'],
    contact: { phone: '010-64003000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11501']
  },
  {
    id: '116', name: 'Frog', logo: 'https://picsum.photos/100/100?random=116', established: 1969, city: '上海',
    tags: [ServiceCategory.DESIGN, ServiceCategory.STRATEGY], slogan: 'Form Follows Emotion',
    description: '全球著名的跨国设计咨询公司，著名的“青蛙设计”，擅长产品创新与体验设计。',
    clients: ['小米', '华为', '索尼', '通用电气'],
    contact: { phone: '021-61005000' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11601']
  },
  {
    id: '117', name: 'IDEO', logo: 'https://picsum.photos/100/100?random=117', established: 1991, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: 'Design Thinking',
    description: '全球创新设计的代名词，设计思维（Design Thinking）的倡导者。',
    clients: ['方太', '可口可乐', '福特', '宜家'],
    contact: { phone: '021-23001000' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11701']
  },
  {
    id: '118', name: 'Continuum', logo: 'https://picsum.photos/100/100?random=118', established: 1983, city: '上海',
    tags: [ServiceCategory.STRATEGY, ServiceCategory.DESIGN], slogan: 'Innovation by Design',
    description: '全球创新设计咨询公司，专注于通过设计和服务创新推动商业增长。',
    clients: ['宝洁', '百事', '三星', '宝马'],
    contact: { phone: '021-63001000' }, score: 9.5, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11801']
  },
  {
    id: '119', name: 'Thoughtworks', logo: 'https://picsum.photos/100/100?random=119', established: 1993, city: '武汉',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.STRATEGY], slogan: 'Technology Excellence',
    description: '全球领先的技术咨询公司，帮助企业进行数字化转型与敏捷开发。',
    clients: ['招商银行', '戴姆勒', '中兴', 'OPPO'],
    contact: { phone: '027-87001000' }, score: 9.6, isVerified: true, gallery: ['https://picsum.photos/600/400?random=11901']
  },
  {
    id: '120', name: 'Accenture Song', logo: 'https://picsum.photos/100/100?random=120', established: 2009, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.STRATEGY, ServiceCategory.MARKETING], slogan: 'Customer Obsessed',
    description: '埃森哲旗下的创意、数字与营销服务机构（原Accenture Interactive），全球最大的数字营销网络之一。',
    clients: ['万豪', '迪士尼', '欧莱雅', '宝马'],
    contact: { phone: '021-23051000' }, score: 9.8, isVerified: true, gallery: ['https://picsum.photos/600/400?random=12001']
  },
  {
    id: '121', name: 'Deloitte Digital 德勤数智', logo: 'https://picsum.photos/100/100?random=121', established: 2012, city: '上海',
    tags: [ServiceCategory.DIGITAL, ServiceCategory.STRATEGY], slogan: 'Connecting Creative & Tech',
    description: '德勤旗下的数字化咨询机构，结合了咨询公司的战略思维与代理商的创意执行。',
    clients: ['雀巢', '耐克', '星巴克', 'Salesforce'],
    contact: { phone: '021-61008000' }, score: 9.7, isVerified: true, gallery: ['https://picsum.photos/600/400?random=12101']
  }
];