# LG Subscribe 2C 落地页

面向家庭客户的 LG Subscribe 订阅落地页（React + Tailwind CSS）。产品图与演示视频使用 LG 官方 CDN。

## 启动

```bash
npm install
npm run dev
```

WhatsApp 号码请在 `src/config.js` 中替换为实际顾问号码。

## 改商品和促销

日常改商品，打开桌面上的 `LG_Subscribe_Products_2026.xlsx`（项目里也有一份：`sheet/LG_Subscribe_Products_2026.xlsx`）。
三个页签：Products、Promos、How to use。改完保存，然后：

```bash
npm run import:xlsx
```

也可以把这个 xlsx 导入你的 Google 表格（文件 → 导入 → 替换整个表格），再跑 `npm run sync`。
Google Sheet 我只能读取、不能替你改（没有你账号的写入权限）。

现有表格：https://docs.google.com/spreadsheets/d/1vrqUmJl7m2syIR58z63y3NRYPr-bf1wyE5VFiS4LS8o/edit?usp=sharing

列说明和上门周期（6 / 12 / 24 个月）见 [`sheet/README.md`](sheet/README.md)。

## 数据说明

| 文件 | 内容 | 怎么更新 |
|---|---|---|
| `src/data/subscribe2026.js` | 商品、颜色、规格、价格 | `npm run import:xlsx` 或 `npm run sync`（自动生成，别手改） |
| `src/data/promos.js` | 每月促销 | 同上（自动生成，别手改） |
| `src/data/catalog.js` | 分类分组、服务方案、价格计算 | 手动编辑 |
| `scripts/detail-cache.json` | 从 LG 官网抓的详情文案缓存 | `node scripts/import-details.mjs` |

商品页的卖点文案、演示视频和规格表优先按表格里的 LG 官网链接抓取。没有官网链接时，
在 `Copy_Features_From` 填一个同系列、同 feature 的型号，卖点会沿用过去（规格表不抄，避免容量尺寸抄错）。
主图你自己找：把照片放进 `public/products/`，文件名写成 `型号.jpg`（例如 `FX1412S5GR.jpg`），或填 `Hero_Image` 列。

## 命令

```bash
npm run dev            # 本地开发
npm run build          # 生产打包
npm run lint           # oxlint
npm run sync           # 从 Google Sheet 拉取商品和促销
npm run import:xlsx    # 从本地 xlsx 导入（默认 sheet/LG_Subscribe_Products_2026.xlsx）
npm run sheet:xlsx     # 用当前网站数据重新生成可编辑 xlsx（桌面 + sheet/）
npm run sheet:export   # 从 Downloads 里的旧 xlsx 导出 CSV 模板
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
