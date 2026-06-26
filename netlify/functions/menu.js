exports.handler = async function (event, context) {
  const sheetUrl = process.env.GOOGLE_SHEET_CSV_URL;
  if (!sheetUrl) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Error: GOOGLE_SHEET_CSV_URL environment variable is not defined.'
    };
  }

  try {
    // Append cache buster to bypass Google caching
    const url = sheetUrl + (sheetUrl.includes('?') ? '&' : '?') + 't=' + Date.now();
    const response = await fetch(url, { headers: { 'cache-control': 'no-cache' } });
    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: `Error fetching Google Sheet: ${response.statusText}`
      };
    }

    const data = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Serverless Function Error: ' + err.toString()
    };
  }
};
