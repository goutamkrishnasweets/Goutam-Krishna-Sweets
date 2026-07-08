# ⚙️ Settings Sheet Setup Guide
## For: Goutam Krishna Sweets – Site Stats (Rating, Reviews, Delivery km)

This guide explains how to set up the **Settings Sheet** so the owner can update the website's hero stats (Google Rating, Happy Reviews, and Free Delivery distance) without touching any code.

---

## 📋 Step 1: Add a "settings" tab to your Google Sheet

1. Open your **Goutam Krishna Sweets Google Sheet** (the same sheet that has the menu data).
2. At the bottom of the screen, click the **+** button to add a new sheet tab.
3. Rename the new tab to exactly: `settings`

---

## 📝 Step 2: Fill in the settings table

In the **settings** tab, create this exact table (Row 1 is the header):

| key | value |
|---|---|
| `google_rating` | `4.3★` |
| `review_count` | `140+` |
| `delivery_km` | `5` |

**Cell by cell:**
- **A1:** `key`
- **B1:** `value`
- **A2:** `google_rating`
- **B2:** `4.3★`  ← change this anytime (e.g. `4.5★`)
- **A3:** `review_count`
- **B3:** `140+`   ← change this anytime (e.g. `180+`)
- **A4:** `delivery_km`
- **B4:** `5`      ← change this anytime (e.g. `7`)

> ✅ **To update any stat**: Just edit the value in Column B and the website will show the new number automatically on the next page visit.

---

## 🌐 Step 3: Publish the settings tab as a CSV

1. In Google Sheets, go to **File → Share → Publish to web**
2. In the first dropdown, select the **settings** tab (not "Entire Document")
3. In the second dropdown, select **Comma-separated values (.csv)**
4. Click **Publish** and then **OK**
5. Copy the URL that appears — it will look like:
   ```
   https://docs.google.com/spreadsheets/d/XXXXXXXXXX/pub?gid=XXXXXXX&single=true&output=csv
   ```
6. Keep this URL — you'll need it in the next step.

---

## 🔧 Step 4: Add the URL to Netlify

1. Go to your **Netlify Dashboard** → Open your site
2. Click **Site configuration** → **Environment variables**
3. Click **Add a variable**
4. Set:
   - **Key:** `GOOGLE_SETTINGS_SHEET_CSV_URL`
   - **Value:** *(paste the CSV URL from Step 3)*
5. Click **Save**
6. Go to **Deploys** → Click **Trigger deploy → Deploy site** to restart with the new variable

---

## ✅ Done! How it works

Every time someone visits your website, the page automatically:
1. Calls `/api/settings` (a secure server-side function)
2. Reads your Google Sheet's `settings` tab
3. Updates the hero stats and delivery info on the page

**If the sheet is unreachable** (e.g., internet issue), the website falls back to the hardcoded defaults and never breaks.

---

## 🔑 Quick Reference: What each setting does

| Key | What it controls | Example |
|---|---|---|
| `google_rating` | The star rating shown in the hero section | `4.5★` |
| `review_count` | The review count shown in the hero section | `200+` |
| `delivery_km` | Free delivery radius (updates **4 places** on the page) | `7` |

---

## 📍 Where `delivery_km` appears on the website

Changing `delivery_km` in the sheet automatically updates **all 4 places** on the page:
1. 🟢 The green scrolling strip at the very top
2. 🏷️ The pink badge in the hero section
3. 📊 The "Free Delivery" stat number in the hero section
4. 🚚 The delivery note in the "Pre-book Cake" form section
