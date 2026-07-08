# ⚙️ Settings Setup Guide
## Rating, Reviews & Delivery KM — edit directly in your Google Sheet

The **4.3★**, **140+** reviews, and **5 km** delivery range are controlled
from columns **J** and **K** of your existing `menu_data` sheet tab.
No second tab. No extra setup.

---

## 📋 What to add in your Google Sheet

Open your Google Sheet, go to the **menu_data** tab, and make sure
**Row 1** (the header row) has these in columns J and K:

| Column J | Column K |
|---|---|
| `setting_key` | `setting_value` |

Then, in the rows **below your last menu item**, add:

| Column J | Column K |
|---|---|
| `google_rating` | `4.3★` |
| `review_count` | `140+` |
| `delivery_km` | `5` |

> ✅ That's it! To update the rating to `4.5★`, just change the value in Column K.
> The website will show the new number on the next page visit.

---

## ✏️ How to edit values

| Want to change | Edit Column K of this row |
|---|---|
| Google Rating (e.g. `4.5★`) | Row where J = `google_rating` |
| Happy Reviews count (e.g. `200+`) | Row where J = `review_count` |
| Free Delivery km (e.g. `7`) | Row where J = `delivery_km` |

---

## 📍 Where delivery_km updates on the website

Changing `delivery_km` updates **4 places** automatically:
1. 🟢 The green scrolling banner at the top
2. 🏷️ The pink badge in the hero section
3. 📊 The "Free Delivery" stat number
4. 🚚 The delivery note in the order form

---

## ⚠️ No new Netlify env variable needed

The site already uses `GOOGLE_SHEET_CSV_URL` (set up when you first
connected the menu). The settings are read from the same sheet
automatically — no extra setup required in Netlify.
