# Google Sheet 管理商品与促销

网站的商品清单、价格和每月促销都从一个 Google Sheet 生成。改完表格跑一次 `npm run sync`，
再重新部署即可。

## 一次性设置

1. 到 [sheets.new](https://sheets.new) 建一个新表格，命名例如 `LG Subscribe 2026`。
2. 建两个页签，名字必须**完全**是 `Products` 和 `Promos`（区分大小写）。
3. 在 `Products` 页签：**文件 → 导入 → 上传** `sheet/products.csv`，导入位置选
   「替换当前工作表」。
4. 在 `Promos` 页签：同样导入 `sheet/promos.csv`。
5. 右上角**共享 → 知道链接的任何人 → 查看者**。不开这一步脚本读不到。
6. 复制浏览器地址栏的链接，跑一次：

   ```bash
   npm run sync -- "粘贴表格链接"
   ```

   表格 ID 会记在 `scripts/.sheet-id`，之后直接 `npm run sync` 就行。

## 日常使用

```bash
npm run sync     # 从 Google Sheet 拉取，重新生成商品和促销数据
npm run dev      # 本地预览
npm run build    # 打包部署
```

其他命令：

```bash
npm run sheet:export   # 重新从本地 xlsx 导出 CSV 模板
npm run import:xlsx    # 不用 Google Sheet，直接从本地 xlsx 导入
```

## Products 页签

一行一个变体（同一商品的不同颜色或容量各占一行）。脚本按 C 列的商品名自动把多行
合并成一个商品，颜色和规格变成商品页上的选项。

| 列 | 标题 | 说明 |
|---|---|---|
| A | Category | 必填。见下方允许值 |
| B | Model | 型号，例如 `WD518AN` |
| C | Product Name | 必填。**同名的行会合并成一个商品** |
| D | Variant | 颜色和规格，例如 `Calming Beige`、`Silver (9kg)`、`55 inch` |
| E | Outright Price | 买断价 |
| F | 84mo Self-Service | 84 个月 · 自助换滤芯月费 |
| G | 84mo Combine | 84 个月 · 混合保养月费 |
| H | 84mo Regular Visit | 84 个月 · 上门保养月费 |
| I | 60mo Self-Service | 60 个月 · 自助换滤芯月费 |
| J | 60mo Regular Visit | 60 个月 · 上门保养月费 |
| K | 60mo Combine | 60 个月 · 混合保养月费 |
| L | LG Page URL | LG 官网商品页链接 |

A 列只能填这些值，填错会被当成新分类、在网站上落不进任何分类区块：

`Water Purifier`、`Air Purifier`、`Air Conditioner`、`Washer`、`Washer Dryer`、
`Top Loader`、`Dryer`、`Refrigerator`、`Dishwasher`、`Styler`、`Massage Chair`、`TV`

### 几个要注意的点

- **价格留空**表示尚未定价，网站会显示「Price to be confirmed」。
- **L 列的链接是详情文案的钥匙。** 商品页的卖点、演示视频、规格表是从 LG 官网抓下来缓存的，
  `npm run sync` 会按这个链接把已有详情接回去。**链接改了或清空，那个商品的详情就会掉。**
  新增商品填好链接后，跑 `node scripts/import-details.mjs` 去抓取详情。
- **D 列的写法决定颜色还是规格。** 括号里是数字或带 kg / HP / L 的，括号内容当规格、
  括号前当颜色（`Silver (9kg)`）；括号里是文字的，括号内容当颜色（`Hot Ambient Cold (Calming Beige)`）。
- 删商品就删掉它的所有行。整个商品的行都删掉后，网站上对应的卡片和分类计数会一起消失。

## Promos 页签

一行一个促销。同一个月可以有多条，只要作用范围不同。

| 列 | 标题 | 说明 |
|---|---|---|
| A | Month | 必填，1–12 |
| B | Scope | 作用范围，见下。留空等于 `all` |
| C | Badge | 卡片左上角的红色小标签，越短越好 |
| D | Title | 必填。促销名称 |
| E | Detail | 商品页上的一句话说明 |
| F | Extra Off (RM) | 每月减免多少钱。填 `0` 表示只显示文案、不改价格 |
| G | Extended | 填 `Yes` 会在标题后加「· Extended」 |
| H | Start | 可选，例如 `2026-09-20`。留空表示整月有效 |
| I | End | 可选。含当天 |

Scope 可以填四种，**越具体的优先**：

| 填法 | 例子 | 作用 |
|---|---|---|
| 型号 | `GC-X24FFC7R` | 只作用于这一个型号（最优先） |
| 分类名 | `Refrigerators` | 该分类全部商品 |
| 分类组 id | `kitchen` | 该大类全部商品 |
| `all` | `all` | 全站（最低优先） |

分类组 id 有五个：`water-air`、`cooling`、`laundry`、`kitchen`、`living`。

举例：9 月同时有一条 `all` 的全站促销和一条 `Refrigerators` 的冰箱促销，那么冰箱显示冰箱那条，
其他商品显示全站那条。

## 出问题时

| 现象 | 原因 |
|---|---|
| `Could not read tab "Products"` | 页签名字不对，或没设成「知道链接的任何人可查看」 |
| `returned a login page instead of CSV` | 共享权限没开 |
| `has no usable rows` | A 列或 C 列空了 |
| 某个商品详情不见了 | L 列链接被改动或清空 |
| 商品没出现在任何分类里 | A 列的分类名不在允许值内 |
