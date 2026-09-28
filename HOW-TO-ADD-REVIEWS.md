# 怎么添加 / 修改 Review

文字好评和安装照片是分开的。不一定每张安装图都要有文字。

---

## 1. 文字好评（网站 “What customers wrote”）

任选一种，**不要两种同时改**，以免覆盖。

### 方法 A（最快）：改 `sheet/reviews.csv`

用 Excel 或记事本打开 `sheet/reviews.csv`，一行一条：

| 列 | 必填 | 例子 |
|---|---|---|
| Author | 是 | `Ms from Batu Pahat` |
| Rating | 否，默认 5 | `5` |
| Date | 否 | `2026-09-21` |
| Product | 否 | `PuriCare Water Purifier` |
| Quote | 有写才会出现在网站 | `Installation was tidy.` |
| Photo | 不用填 | 安装图请放文件夹，见下面 |
| Source | 否，默认 manual | `manual` 或 `google` |

作者写法建议：`Ms from 地名` / `Mr from 地名`。

保存后在项目根目录运行：

```bash
npm run import:xlsx
```

### 方法 B：在商品 Excel 里加 Reviews 页签

打开 `sheet/LG_Subscribe_Products_2026.xlsx`（或桌面上那份），新增页签，名字必须是 **`Reviews`**。

第一行标题必须包含：

`Author` · `Rating` · `Date` · `Product` · `Quote`

（`Author` 也可以写成 `Ms/Mr from`）

有 Reviews 页签时，网站会用 Excel 里的文字，不再用 `reviews.csv`。  
没有这个页签时，继续用 `sheet/reviews.csv`。

改完同样运行：

```bash
npm run import:xlsx
```

Google 上那 23 条评分不会自动抓进来。要显示某条 Google 文字，请自己抄到上面表格，`Source` 填 `google`。

---

## 2. 安装图 / 合照（网站照片墙）

| 放哪里 | 网站会出现在 | 说明 |
|---|---|---|
| `INSTALL_PHOTOS/` | Customer installations | 全部当安装图 |
| `GROUP_PHOTOS/` | With our customers | 和顾客合照。没有文件时这个区块不显示 |

支持 jpg / jpeg / png / webp。放进去后运行：

```bash
npm run import:xlsx
```

（这个命令也会发布照片。只更新照片也可以：`npm run photos`）

---

## 3. 改完记得预览

```bash
npm run dev
```

打开网站 `#reviews` 检查文字和好评图。
