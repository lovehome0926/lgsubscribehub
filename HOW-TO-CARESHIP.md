# 怎么添加 / 修改 CareShip 保养价钱

网站 `#care` 的 **LG CareShip Service & Maintenance** 计算器，价钱来自表格，不是手写在页面里。

---

## 方法 A（最快）：改 `sheet/careship.csv`

用 Excel 打开 `sheet/careship.csv`。一行一个「型号 + 方案」。

| 列 | 必填 | 例子 |
|---|---|---|
| Category | 是 | `Water Purifier` / `Air Purifier` / `Dehumidifier` / `Styler` |
| Model | 是 | `WD518AN` 或 `WD216AN / WD516AN` |
| Name | 是 | `PuriCare Tankless Water Purifier` |
| Variant/Color | 否 | `Beige, Pebble Grey, Cream White` |
| Plan_Type | 是 | `Regular Visit (6mth)` / `Self-Service` / `Combine Maintenance` |
| 1_Year_RM | 有就填 | `350`。没有一年方案写 `N/A` |
| 2_Year_RM | 有就填 | `665` |
| Details | 否 | `1x Regular visit every 6mth` |

同一型号、同一商品名的多行会自动合成一个产品（不同 Plan_Type 变成选项）。  
没有价钱的年份，网站不会显示那个按钮。

保存后在项目根目录运行：

```bash
npm run import:xlsx
```

## 方法 B：在商品 Excel 里加 CareShip 页签

打开 `sheet/LG_Subscribe_Products_2026.xlsx`，新增页签，名字写成 **`CareShip`**。

第一行标题必须包含：

`Category` · `Model` · `Name` · `Variant/Color` · `Plan_Type` · `1_Year_RM` · `2_Year_RM` · `Details`

有 CareShip 页签时，网站用 Excel；没有页签时，继续用 `sheet/careship.csv`。

改完同样运行：

```bash
npm run import:xlsx
```

---

## 产品图

把型号图放进 `CARESHIP_PHOTOS/`，文件名带型号即可，例如：

- `WD512AN.avif`
- `AS20GPHK0.jpg`
- `WD112AN_AWHRLML_EAML_MY_C-450x450.avif`

支持 jpg / jpeg / jfif / png / webp / avif。文件名对不上型号时，网站会改用 Shop 里已有的官方图。

放进去后运行：

```bash
npm run photos
```

或 `npm run import:xlsx`（也会一起发布照片）。

---

## 预览

```bash
npm run dev
```

打开网站 `#care`，选类别 → 型号 → 方案 → 1 年 / 2 年，核对价钱后用 WhatsApp 询价。
