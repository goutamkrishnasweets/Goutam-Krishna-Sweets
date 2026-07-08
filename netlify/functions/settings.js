// ══════════════════════════════════════════════════════════════
// Netlify Serverless Function: /api/settings
//
// Reads columns J (setting_key) and K (setting_value) from the
// SAME Google Sheet used for the menu. No separate sheet or
// env variable needed — reuses GOOGLE_SHEET_CSV_URL.
//
// Owner just fills in J and K in their existing menu sheet tab:
//   J2: google_rating   K2: 4.3★
//   J3: review_count    K3: 140+
//   J4: delivery_km     K4: 5
// ══════════════════════════════════════════════════════════════

exports.handler = async function (event, context) {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  // Hardcoded defaults — used if sheet is unreachable or J/K not filled
  const DEFAULTS = {
    google_rating: '4.3\u2605',
    review_count: '140+',
    delivery_km: '5',
  };

  // Reuse the same env var as menu.js — no new variable needed!
  const sheetUrl = process.env.GOOGLE_SHEET_CSV_URL;

  if (!sheetUrl) {
    console.warn('\u26a0\ufe0f GOOGLE_SHEET_CSV_URL not set \u2014 returning defaults.');
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(DEFAULTS) };
  }

  try {
    const url = sheetUrl + (sheetUrl.includes('?') ? '&' : '?') + 't=' + Date.now();
    const response = await fetch(url, { headers: { 'cache-control': 'no-cache' } });

    if (!response.ok) {
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(DEFAULTS) };
    }

    const csv = await response.text();
    const lines = csv.trim().split('\n');
    if (lines.length < 2) {
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(DEFAULTS) };
    }

    // Find column indices for setting_key (J) and setting_value (K)
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
    const jIdx = headers.indexOf('setting_key');
    const kIdx = headers.indexOf('setting_value');

    if (jIdx === -1 || kIdx === -1) {
      console.warn('\u26a0\ufe0f setting_key/setting_value columns not found in sheet \u2014 using defaults.');
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(DEFAULTS) };
    }

    const settings = { ...DEFAULTS };

    lines.slice(1).forEach(line => {
      // Simple split (settings values won't have commas)
      const cols = line.split(',');
      const key = (cols[jIdx] || '').trim().replace(/^"|"$/g, '');
      const val = (cols[kIdx] || '').trim().replace(/^"|"$/g, '');
      if (key && val) {
        settings[key] = val;
        console.info(`\u2705 Setting: ${key} = ${val}`);
      }
    });

    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(settings) };
  } catch (err) {
    console.error('\u274c Settings function error:', err.toString());
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(DEFAULTS) };
  }
};
