import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

// Categories data
const categoriesData = [
  { name: '品牌策略', slug: 'brand-strategy', icon: 'Lightbulb', sortOrder: 1 },
  { name: '品牌设计', slug: 'brand-design', icon: 'Palette', sortOrder: 2 },
  { name: '包装设计', slug: 'packaging-design', icon: 'Package', sortOrder: 3 },
  { name: '空间设计', slug: 'space-design', icon: 'Building', sortOrder: 4 },
  { name: '数字营销', slug: 'digital-marketing', icon: 'TrendingUp', sortOrder: 5 },
  { name: '社媒运营', slug: 'social-media', icon: 'Share2', sortOrder: 6 },
  { name: '内容营销', slug: 'content-marketing', icon: 'FileText', sortOrder: 7 },
  { name: '品牌出海', slug: 'global-expansion', icon: 'Globe', sortOrder: 8 },
  { name: '电商代运营', slug: 'ecommerce', icon: 'ShoppingCart', sortOrder: 9 },
  { name: '品牌咨询', slug: 'brand-consulting', icon: 'MessageSquare', sortOrder: 10 },
];

// Cities data
const citiesData = [
  { name: '上海', slug: 'shanghai', sortOrder: 1 },
  { name: '北京', slug: 'beijing', sortOrder: 2 },
  { name: '深圳', slug: 'shenzhen', sortOrder: 3 },
  { name: '广州', slug: 'guangzhou', sortOrder: 4 },
  { name: '杭州', slug: 'hangzhou', sortOrder: 5 },
  { name: '成都', slug: 'chengdu', sortOrder: 6 },
  { name: '南京', slug: 'nanjing', sortOrder: 7 },
  { name: '武汉', slug: 'wuhan', sortOrder: 8 },
  { name: '惠州', slug: 'huizhou', sortOrder: 9 },
  { name: '宁波', slug: 'ningbo', sortOrder: 10 },
  { name: '珠海', slug: 'zhuhai', sortOrder: 11 },
  { name: '西安', slug: 'xian', sortOrder: 12 },
  { name: '香港', slug: 'hongkong', sortOrder: 13 },
];

// Providers data - comprehensive list from PDF with verified logos
const providersData = [
  // 品牌策略类
  {
    name: '华与华',
    englishName: 'Hua & Hua',
    slug: 'huayuhua',
    logo: '/images/providers/huayuhua.jpg',
    description: '华与华是中国本土最具影响力的战略营销咨询公司，以"超级符号就是超级创意"方法论著称。服务过海底捞、西贝、蜜雪冰城、汉庭等众多知名品牌，帮助企业建立品牌资产，实现持续增长。',
    shortDescription: '中国本土最具影响力的战略营销咨询公司',
    city: '上海',
    foundedYear: 2002,
    teamSize: '200-500人',
    website: 'https://www.huayuhua.com',
    phone: '021-52360778',
    verified: true,
    featured: true,
    weight: 98,
    categories: ['品牌策略', '品牌咨询'],
    services: ['品牌战略', '超级符号', '产品开发', '广告创意'],
    clients: ['海底捞', '西贝', '蜜雪冰城', '汉庭', '老娘舅'],
  },
  {
    name: '小马宋',
    englishName: 'Xiaomasong',
    slug: 'xiaomasong',
    logo: '/images/providers/xiaomasong.png',
    description: '小马宋战略营销咨询是一家专注于品牌战略和营销咨询的公司，创始人小马宋是知名营销专家，著有《营销笔记》等畅销书。公司以"不投标、不比稿"著称，服务众多餐饮和消费品牌。',
    shortDescription: '专注品牌战略和营销咨询，不投标不比稿',
    city: '北京',
    foundedYear: 2016,
    teamSize: '20-50人',
    website: 'https://www.xiaomasong.cn',
    verified: true,
    featured: true,
    weight: 95,
    categories: ['品牌策略', '品牌咨询'],
    services: ['品牌战略', '营销咨询', '品牌命名', '广告创意'],
    clients: ['南城香', '元气森林', '半天妖', '瑞幸咖啡'],
  },
  {
    name: '唐硕咨询',
    englishName: 'TANG Consulting',
    slug: 'tang-consulting',
    logo: '/images/providers/tang-logo.jpg',
    description: '唐硕是中国领先的体验创新咨询公司，专注于品牌体验升级、数字化转型和客户体验管理，帮助企业构建以用户为中心的体验战略。',
    shortDescription: '中国领先的体验创新咨询公司',
    city: '上海',
    foundedYear: 2007,
    teamSize: '200-500人',
    website: 'https://www.tangux.com',
    verified: true,
    featured: true,
    weight: 92,
    categories: ['品牌咨询', '品牌策略', '数字营销'],
    services: ['品牌体验升级', '数字化转型', '客户体验管理', '服务设计'],
    clients: ['华为', '腾讯', '阿里巴巴', '招商银行'],
  },
  
  // 品牌设计类
  {
    name: '正邦',
    englishName: 'Zhengbang',
    slug: 'zhengbang',
    logo: '/images/providers/zhengbang.jpg',
    description: '正邦是中国品牌设计行业标杆企业，中国4A成员，在北京、上海、广州设有分公司，团队超过700人。服务过中国移动、中国电信、CCTV等众多央企和知名品牌。',
    shortDescription: '中国品牌设计行业标杆，中国4A成员',
    city: '北京',
    foundedYear: 1996,
    teamSize: '500-1000人',
    website: 'https://www.zhengbang.com.cn',
    phone: '400-040-9778',
    verified: true,
    featured: true,
    weight: 96,
    categories: ['品牌设计', '品牌策略'],
    services: ['品牌战略', 'VI设计', '标志设计', '品牌升级'],
    clients: ['中国移动', '中国电信', 'CCTV', '中国东方航空', '保利集团'],
  },
  {
    name: '东道设计',
    englishName: 'Dongdao',
    slug: 'dongdao',
    logo: '/images/providers/dongdao.jpg',
    description: '东道品牌创意集团是中国领先的品牌创意设计公司，专注于品牌战略、视觉识别、空间设计等领域，服务众多世界500强企业和中国知名品牌。',
    shortDescription: '中国领先的品牌创意设计公司',
    city: '北京',
    foundedYear: 1997,
    teamSize: '200-500人',
    website: 'https://www.dongdao.net',
    verified: true,
    featured: true,
    weight: 94,
    categories: ['品牌设计', '空间设计', '品牌策略'],
    services: ['品牌战略', 'VI设计', '空间设计', '导视系统'],
    clients: ['中国银行', '国家电网', '中石油', '万科'],
  },
  {
    name: '朗涛',
    englishName: 'Landor',
    slug: 'landor',
    logo: '/images/providers/landor.jpg',
    description: '朗涛是全球领先的品牌咨询公司，隶属于WPP集团，在全球26个国家设有办公室。专注于品牌战略、品牌设计和品牌体验，服务众多世界500强企业。',
    shortDescription: '全球领先的品牌咨询公司，WPP集团成员',
    city: '上海',
    foundedYear: 1941,
    teamSize: '100-200人',
    website: 'https://landor.com',
    verified: true,
    featured: true,
    weight: 93,
    categories: ['品牌设计', '品牌策略', '品牌咨询'],
    services: ['品牌战略', '品牌设计', '品牌体验', '品牌命名'],
    clients: ['宝洁', '联合利华', '可口可乐', 'BP'],
  },
  
  // 包装设计类
  {
    name: '潘虎包装设计',
    englishName: 'Tiger Pan',
    slug: 'tigerpan',
    logo: '/images/providers/tigerpan.jpg',
    description: '潘虎包装设计实验室是中国最具影响力的包装设计公司之一，创始人潘虎被誉为"中国包装设计第一人"。作品多次获得红点、iF、Pentawards等国际大奖，服务过褚橙、良品铺子等知名品牌。',
    shortDescription: '中国最具影响力的包装设计公司',
    city: '深圳',
    foundedYear: 2010,
    teamSize: '50-100人',
    website: 'https://www.tigerpan.com',
    verified: true,
    featured: true,
    weight: 97,
    categories: ['包装设计', '品牌设计'],
    services: ['包装设计', '品牌设计', '产品设计'],
    clients: ['褚橙', '良品铺子', '洽洽', '卫龙', '认养一头牛'],
  },
  {
    name: '柏星龙',
    englishName: 'Baixinglong',
    slug: 'baixinglong',
    logo: '/images/providers/baixinglong.png',
    description: '柏星龙是北交所创意包装设计第一股，专注于酒类、食品、日化等领域的创意包装设计和生产。拥有完整的设计-生产-交付产业链，服务众多知名酒企和消费品牌。',
    shortDescription: '北交所创意包装设计第一股',
    city: '深圳',
    foundedYear: 2003,
    teamSize: '500-1000人',
    website: 'https://www.baixinglong.cn',
    verified: true,
    featured: true,
    weight: 91,
    categories: ['包装设计'],
    services: ['包装设计', '包装生产', '创意策划'],
    clients: ['茅台', '五粮液', '泸州老窖', '洋河'],
  },
  {
    name: '甲古文创意',
    englishName: 'OCD',
    slug: 'ocd-oracle-creative-design',
    logo: '/images/providers/ocd-logo.png',
    description: '甲古文创意是一家聚焦快消品商业创新设计的综合性设计公司，荣获德国iF评选全球设计公司Top7，斩获全球设计大奖300+，服务快消类领域知名企业1000+。',
    shortDescription: '德国iF全球Top7设计公司',
    city: '深圳',
    foundedYear: 2008,
    teamSize: '100-200人',
    website: 'https://www.ocdwe.com',
    phone: '400-009-1208',
    verified: true,
    featured: true,
    weight: 95,
    categories: ['品牌策略', '包装设计', '品牌设计'],
    services: ['品牌营销策略', '产品视觉设计', '空间体验设计', '新媒体UI设计'],
    clients: ['元气森林', '农夫山泉', '康师傅', '统一', '伊利'],
  },
  
  // 数字营销类
  {
    name: '飞书深诺',
    englishName: 'Meetsocial',
    slug: 'meetsocial',
    logo: '/images/providers/placeholder.svg',
    description: '飞书深诺是中国领先的出海数字营销服务商，是Google、Facebook、TikTok等平台的核心代理商，帮助中国品牌成功出海。',
    shortDescription: '中国领先的出海数字营销服务商',
    city: '上海',
    foundedYear: 2013,
    teamSize: '500-1000人',
    website: 'https://www.meetsocial.com',
    verified: true,
    featured: true,
    weight: 90,
    categories: ['品牌出海', '数字营销'],
    services: ['出海数字营销', '海外媒体投放', '广告优化', 'Google/Facebook代理'],
    clients: ['SHEIN', 'Anker', 'PatPat', 'Zaful'],
  },
  {
    name: '众引传播',
    englishName: 'MGCC',
    slug: 'mgcc',
    logo: '/images/providers/placeholder.svg',
    description: '众引传播是一家专注于品牌增长咨询和实效型整合营销传播全案服务的公司，帮助品牌实现可持续增长。',
    shortDescription: '品牌增长咨询、实效型整合营销传播',
    city: '上海',
    foundedYear: 2006,
    teamSize: '100-200人',
    verified: true,
    featured: true,
    weight: 82,
    categories: ['数字营销', '内容营销', '社媒运营'],
    services: ['品牌增长咨询', '整合营销传播', '社交媒体营销'],
    clients: ['联合利华', '宝洁', '欧莱雅'],
  },
  {
    name: '简天下',
    englishName: 'Jian Tianxia',
    slug: 'jian-tianxia',
    logo: '/images/providers/placeholder.svg',
    description: '简天下是小红书和知乎的核心代理商，拥有强大的数据系统和MCN基因，为品牌提供精准的社交媒体营销服务。',
    shortDescription: '小红书知乎核心代理、数据系统、MCN基因',
    city: '上海',
    foundedYear: 2018,
    teamSize: '50-100人',
    verified: true,
    featured: true,
    weight: 80,
    categories: ['社媒运营', '内容营销', '数字营销'],
    services: ['小红书代理', '知乎代理', '数据分析', 'MCN服务'],
    clients: [],
  },
  
  // 其他优质服务商
  {
    name: 'L3branding',
    englishName: 'L3 Branding',
    slug: 'l3-branding',
    logo: '/images/providers/l3branding-logo.jpg',
    description: 'L3branding是一家专注于品牌策略、包装设计和体验设计的创意机构，为新消费品牌提供从0到1的品牌建设服务。',
    shortDescription: '品牌策略、包装设计、体验设计',
    city: '北京',
    foundedYear: 2014,
    teamSize: '20-50人',
    website: 'https://www.l3branding.com',
    verified: true,
    featured: true,
    weight: 85,
    categories: ['品牌策略', '包装设计', '品牌设计'],
    services: ['品牌策略', '包装设计', '体验设计'],
    clients: ['三顿半', '钟薛高', '王饱饱'],
  },
  {
    name: 'inDare格外',
    englishName: 'inDare Design Strategy',
    slug: 'indare-design',
    logo: '/images/providers/indare-logo.png',
    description: 'inDare格外是一家品牌创新设计公司，专注于产品创新、空间创新和品牌全案服务，服务众多新消费品牌。',
    shortDescription: '品牌创新、产品创新、空间创新',
    city: '深圳',
    foundedYear: 2015,
    teamSize: '50-100人',
    website: 'https://www.indare.cn',
    verified: true,
    featured: true,
    weight: 87,
    categories: ['品牌设计', '空间设计', '品牌策略'],
    services: ['品牌创新', '产品创新', '空间创新', '品牌全案'],
    clients: ['喜茶', '奈雪的茶', '茶颜悦色'],
  },
  {
    name: 'BottleDream',
    englishName: 'BottleDream',
    slug: 'bottledream',
    logo: '/images/providers/bottledream-logo.png',
    description: 'BottleDream是一家专注于商业向善咨询、可持续趋势研究和意义营销的创新机构，帮助品牌实现商业价值与社会价值的统一。',
    shortDescription: '商业向善咨询、可持续趋势研究、意义营销',
    city: '上海',
    foundedYear: 2011,
    teamSize: '20-50人',
    website: 'https://www.bottledream.com',
    verified: true,
    featured: false,
    weight: 78,
    categories: ['品牌咨询', '内容营销'],
    services: ['商业向善咨询', '可持续趋势研究', '意义营销'],
    clients: [],
  },
  {
    name: 'SORA DESIGN',
    englishName: 'SORA DESIGN',
    slug: 'sora-design',
    logo: '/images/providers/sora-design-logo.png',
    description: 'SORA DESIGN致力于筑造独特品牌系统，创新焕活商业机能。专注于餐饮茶酒、零售美业、新消费品、社区改造等领域的品牌策略与空间设计。',
    shortDescription: '筑造独特品牌系统，创新焕活商业机能',
    city: '惠州',
    foundedYear: 2016,
    teamSize: '20-50人',
    verified: true,
    featured: false,
    weight: 75,
    categories: ['品牌策略', '空间设计', '品牌设计'],
    services: ['品牌策略', '平面视觉', '空间设计'],
    clients: [],
  },
  {
    name: '奇点传达',
    englishName: 'Singularity Comm.',
    slug: 'singularity-comm',
    logo: '/images/providers/placeholder.svg',
    description: '奇点传达是一家专注于品牌策略咨询、VI设计和包装设计的创意设计公司，致力于为品牌提供从概念到落地的全案设计服务。',
    shortDescription: '品牌策略咨询、VI设计、包装设计',
    city: '上海',
    foundedYear: 2015,
    teamSize: '50-100人',
    website: 'https://www.sc-official.cn',
    verified: true,
    featured: true,
    weight: 88,
    categories: ['品牌策略', '品牌设计', '包装设计'],
    services: ['品牌策略咨询', 'VI设计', '包装设计', '品牌全案'],
    clients: ['FlowerPlus花加'],
  },
  {
    name: '热浪设计创新',
    englishName: 'Hot Wave Design',
    slug: 'hot-wave-design',
    logo: '/images/providers/placeholder.svg',
    description: '热浪设计创新是一家专注于品牌策划、品牌设计和品牌营销的综合性设计公司，帮助品牌实现从策略到落地的全链路服务。',
    shortDescription: '品牌策划、品牌设计、品牌营销',
    city: '杭州',
    foundedYear: 2016,
    teamSize: '20-50人',
    verified: true,
    featured: false,
    weight: 70,
    categories: ['品牌策略', '品牌设计', '数字营销'],
    services: ['品牌策划', '品牌设计', '品牌营销'],
    clients: [],
  },
];

async function seedDatabase() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  try {
    console.log('Starting database seeding...');
    
    // Insert categories
    console.log('Inserting categories...');
    for (const cat of categoriesData) {
      await connection.execute(
        'INSERT INTO categories (name, slug, icon, sortOrder) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [cat.name, cat.slug, cat.icon, cat.sortOrder]
      );
    }
    
    // Insert cities
    console.log('Inserting cities...');
    for (const city of citiesData) {
      await connection.execute(
        'INSERT INTO cities (name, slug, sortOrder) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [city.name, city.slug, city.sortOrder]
      );
    }
    
    // Get category and city mappings
    const [categoryRows] = await connection.execute('SELECT id, name FROM categories');
    const categoryMap = new Map(categoryRows.map(r => [r.name, r.id]));
    
    const [cityRows] = await connection.execute('SELECT id, name FROM cities');
    const cityMap = new Map(cityRows.map(r => [r.name, r.id]));
    
    // Insert providers
    console.log('Inserting providers...');
    for (const provider of providersData) {
      const cityId = cityMap.get(provider.city) || null;
      
      // Check if provider exists
      const [existing] = await connection.execute(
        'SELECT id FROM providers WHERE slug = ?',
        [provider.slug]
      );
      
      let providerId;
      if (existing.length > 0) {
        providerId = existing[0].id;
        // Update existing
        await connection.execute(
          `UPDATE providers SET 
            name=?, englishName=?, logo=?, description=?, shortDescription=?,
            cityId=?, foundedYear=?, teamSize=?, website=?, phone=?,
            verified=?, featured=?, weight=?, status='approved'
          WHERE id=?`,
          [
            provider.name, provider.englishName, provider.logo, provider.description,
            provider.shortDescription, cityId, provider.foundedYear, provider.teamSize,
            provider.website || null, provider.phone || null, provider.verified,
            provider.featured, provider.weight, providerId
          ]
        );
      } else {
        // Insert new
        const [result] = await connection.execute(
          `INSERT INTO providers 
            (name, englishName, slug, logo, description, shortDescription, cityId, 
             foundedYear, teamSize, website, phone, verified, featured, weight, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`,
          [
            provider.name, provider.englishName, provider.slug, provider.logo,
            provider.description, provider.shortDescription, cityId,
            provider.foundedYear, provider.teamSize, provider.website || null,
            provider.phone || null, provider.verified, provider.featured, provider.weight
          ]
        );
        providerId = result.insertId;
      }
      
      // Clear and insert categories
      await connection.execute('DELETE FROM provider_categories WHERE providerId = ?', [providerId]);
      for (const catName of provider.categories) {
        const catId = categoryMap.get(catName);
        if (catId) {
          await connection.execute(
            'INSERT INTO provider_categories (providerId, categoryId) VALUES (?, ?)',
            [providerId, catId]
          );
        }
      }
      
      // Clear and insert services
      await connection.execute('DELETE FROM provider_services WHERE providerId = ?', [providerId]);
      for (const service of provider.services) {
        await connection.execute(
          'INSERT INTO provider_services (providerId, name) VALUES (?, ?)',
          [providerId, service]
        );
      }
      
      // Clear and insert clients
      await connection.execute('DELETE FROM provider_clients WHERE providerId = ?', [providerId]);
      for (const client of provider.clients) {
        await connection.execute(
          'INSERT INTO provider_clients (providerId, name) VALUES (?, ?)',
          [providerId, client]
        );
      }
      
      console.log(`  - ${provider.name} inserted/updated`);
    }
    
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

seedDatabase();
