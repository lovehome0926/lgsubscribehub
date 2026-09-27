# 用 xlsx / Google Sheet 管理商品与促销

日常改商品，打开桌面上的 `LG_Subscribe_Products_2026.xlsx`，或项目里的
`sheet/LG_Subscribe_Products_2026.xlsx`。三个页签：Products、Promos、How to use。

Google Sheet 我只能读取、不能替你写入（没有你 Google 账号的权限）。本地 xlsx 可以直接改。

改完有两种更新网站的方法：

```bash
npm run import:xlsx    # 读这个 xlsx，重新生成网站数据
npm run sync           # 如果你已经把 xlsx 导入 Google 表格，从网上拉
npm run sheet:xlsx     # 用当前网站数据重新生成一份空白填好的 xlsx
npm run dev            # 本地预览
```

当前 Google 表格（只读同步用）：
https://docs.google.com/spreadsheets/d/1vrqUmJl7m2syIR58z63y3NRYPr-bf1wyE5VFiS4LS8o/edit?usp=sharing

共享必须是「知道链接的任何人可查看」。表格 ID 会记在 `scripts/.sheet-id`。

## Products 页签

一行一个变体。脚本按**型号**合并（同一型号的不同颜色合在一张卡）。电视例外：同一系列
（如 NU865）的不同尺寸合在一张卡。

空着的价格格子不会出现在网站上。没有 7 年、没有 Combine、没有某个上门周期，页面就不会画出那个选项。

| 标题 | 说明 |
|---|---|
| Category | 必填。见下方允许值 |
| Model | 型号。`WD518AN` 和 `WD516AN` 会分成两张卡 |
| Name | 必填。商品名 |
| Specs/Variant | 颜色和规格，例如 `Calming Beige`、`Matte Black (12kg)`、`55 inch` |
| Outright_Price_MYR | 买断价（非水机）。留空则网站不显示买断 |
| Outright_Self_MYR | 水机买断 Self-Service（含 1 年保修 + 1 年 CareShip） |
| Outright_Combine_MYR | 水机买断 Combine Maintenance |
| Outright_Regular_MYR | 水机买断 Regular Visit |
| Sub_7Yr_Self_MYR | 7 年 · 自助换滤芯（电视填月费也用这一列） |
| Sub_7Yr_Combine_MYR | 7 年 · Combine |
| Sub_7Yr_Regular_6m_MYR | 7 年 · Regular Visit 每 6 个月 |
| Sub_7Yr_Regular_12m_MYR | 7 年 · Regular Visit 每 12 个月 |
| Sub_7Yr_Regular_24m_MYR | 7 年 · Regular Visit 每 24 个月 |
| Sub_5Yr_Self_MYR | 5 年 · 自助换滤芯 |
| Sub_5Yr_Combine_MYR | 5 年 · Combine |
| Sub_5Yr_Regular_6m_MYR | 5 年 · Regular Visit 每 6 个月 |
| Sub_5Yr_Regular_12m_MYR | 5 年 · Regular Visit 每 12 个月 |
| Sub_5Yr_Regular_24m_MYR | 5 年 · Regular Visit 每 24 个月 |
| LG HQ Detail Page URL | LG 官网商品页。有链接就抓官网卖点和图 |
| Copy_Features_From | 没有官网时，填一个同 feature 的型号，例如 `F2520SNEKR` |
| Hero_Image | 主图文件名或链接。也可把照片丢进 `public/products/型号.jpg` |

本地 xlsx 已经把 6 / 12 / 24 个月上门价拆成独立列。冷气填 6m 和 12m，冰箱填 12m 和 24m。
旧 Google Sheet 里那一列总的 `Sub_7Yr_Regular_MYR` / `Sub_5Yr_Regular_MYR` 仍然能读：默认冷气/净水器 6 个月，冰箱 12 个月。

A 列只能填这些值，填错会被当成新分类、在网站上落不进任何分类区块：

`Water Purifier`、`Air Purifier`、`Air Conditioner`、`Washer`、`Washer Dryer`、
`Top Loader`、`Dryer`、`Refrigerator`、`Dishwasher`、`Styler`、`Massage Chair`、`TV`

### 几个要注意的点

- **价格留空**表示尚未定价，网站会显示「Price to be confirmed」。
- **有官网链接就填链接。** 卖点、演示视频、规格表从 LG 官网抓下来缓存。新增商品填好链接后，跑 `node scripts/import-details.mjs`。
- **官网没有这个型号的页面时：** `Copy_Features_From` 填一个已经导入、feature 一样的型号。卖点文案和演示会沿用，规格数字不会抄过去。主图请自己放进 `public/products/`，文件名用 `型号.jpg` 或 `型号-颜色.jpg`，也可以填 `Hero_Image`。
- **同一商品名、没有链接、也没填 Copy_Features_From** 时，会自动沿用同名商品的卖点（例如另一台 Front Loader）。想指定来源就填型号。
- **Specs/Variant 的写法决定颜色还是规格。** 括号里是数字或带 kg / HP / L 的，括号内容当规格、
  括号前当颜色（`Silver (9kg)`）；括号里是文字的，括号内容当颜色（`Hot Ambient Cold (Calming Beige)`）。
- 删商品就删掉它的所有行。整个商品的行都删掉后，网站上对应的卡片和分类计数会一起消失。

## Promos 页签

一行一个优惠。**按型号填**，不要整类一起打折。每个月有 memo 就加行；没特别优惠的月份不用填，
网站会用 `default` 那一行（前 9 个月半价）。

Offer 可以直接写 memo 原文：`前12m 77% off`、`前7m 77% off`、`前9m半价`、`Merdeka RM20 off`、`RM10 off`。

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
