// ══════════════════════════════════════════════════════════════
// Netlify Serverless Function: /api/settings
// Fetches the owner's "settings" Google Sheet tab and returns
// site config as JSON: google_rating, review_count, delivery_km
//
// Required Netlify Environment Variable:
//   GOOGLE_SETTINGS_SHEET_CSV_URL — The published CSV URL of
//   the "settings" sheet tab. Set it in:
//   Netlify Dashboard → Site Settings → Environment Variables
// ══════════════════════════════════════════════════════════════

exports.handler = async function (event, context) {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  };

  // Default fallback values (used if sheet is missing or blank)
  const DEFAULTS = {
    google_rating: '4.3★',
    review_count: '140+',
    delivery_km: '5',
  };

  const sheetUrl = process.env.GOOGLE_SETTINGS_SHEET_CSV_URL;

  if (!sheetUrl) {
    console.warn('⚠️ GOOGLE_SETTINGS_SHEET_CSV_URL not set — returning defaults.');
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(DEFAULTS),
    };
  }

  try {
    const url = sheetUrl + (sheetUrl.includes('?') ? '&' : '?') + 't=' + Date.now();
    const response = await fetch(url, { headers: { 'cache-control': 'no-cache' } });

    if (!response.ok) {
      console.error(`❌ Sheet fetch failed: ${response.statusText}`);
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(DEFAULTS) };
    }

    const csv = await response.text();

    // Parse CSV: two-column format — "key,value" (header row is "key,value")
    const settings = { ...DEFAULTS };
    const lines = csv.trim().split('\n').slice(1); // skip header row

    lines.forEach(line => {
      // Handle quoted commas
      const parts = line.match(/(".*?"|[^,]+)/g) || [];
      if (parts.length >= 2) {
        const key = parts[0].replace(/^"|"$/g, '').trim().toLowerCase().replace(/\s+/g, '_');
        const val = parts[1].replace(/^"|"$/g, '').trim();
        if (key && val) settings[key] = val;
      }
    });

    console.info('✅ Settings loaded:', settings);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(settings),
    };
  } catch (err) {
    console.error('❌ Settings function error:', err.toString());
    return {
      statusCode: 200, // always 200 — frontend uses fallback values
      headers: CORS_HEADERS,
      body: JSON.stringify(DEFAULTS),
    };
  }
};
