# LG Subscribe 2C 落地页

面向家庭客户的 LG Subscribe 订阅落地页（React + Tailwind CSS）。产品图与演示视频使用 LG 官方 CDN。

## 启动

```bash
npm install
npm run dev
```

WhatsApp 号码请在 `src/config.js` 中替换为实际顾问号码。

## 改商品和促销

商品清单、价格和每月促销都从一个 Google Sheet 生成。改完表格跑：

```bash
npm run sync
```

首次设置（建表、导入模板、开共享）见 [`sheet/README.md`](sheet/README.md)。

## 数据说明

| 文件 | 内容 | 怎么更新 |
|---|---|---|
| `src/data/subscribe2026.js` | 商品、颜色、规格、价格 | `npm run sync`（自动生成，别手改） |
| `src/data/promos.js` | 每月促销 | `npm run sync`（自动生成，别手改） |
| `src/data/catalog.js` | 分类分组、服务方案、价格计算 | 手动编辑 |
| `scripts/detail-cache.json` | 从 LG 官网抓的详情文案缓存 | `node scripts/import-details.mjs` |

商品页的卖点文案、演示视频和规格表是按表格 L 列的 LG 官网链接抓取的。`npm run sync`
会按这个链接把已有详情接回去，所以刷新价格不会丢详情。

## 命令

```bash
npm run dev            # 本地开发
npm run build          # 生产打包
npm run lint           # oxlint
npm run sync           # 从 Google Sheet 拉取商品和促销
npm run sheet:export   # 从本地 xlsx 导出 CSV 模板到 sheet/
npm run import:xlsx    # 不用 Google Sheet，直接从本地 xlsx 导入
```

## 网站分类

目录页按五个大类分组，定义在 `src/data/catalog.js` 的 `CATEGORY_GROUPS`：

| 分组 id | 显示名 | 包含分类 |
|---|---|---|
| `water-air` | Water & Air | Water Purifiers, Air Purifiers |
| `cooling` | Air Conditioners | Air Conditioners |
| `laundry` | Laundry & Care | Washers, Washer Dryers, Dryers, Styler |
| `kitchen` | Kitchen | Refrigerators, Dishwashers |
| `living` | TV & Living | TVs, Massage Chairs |

要调整分组，改 `CATEGORY_GROUPS` 里的 `categories` 数组即可，目录页的 tab、计数和
顶部导航下拉会跟着变。`#group-kitchen` 这样的链接可以直接打开并筛选到某个分类。
