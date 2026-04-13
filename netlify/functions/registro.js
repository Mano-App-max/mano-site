const https = require('https');

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzN9Rn3V6v3ci3sYMczc6mrKrzDsb4VccPVPhq8hiVh1Nl7P5_EoQcoNdxQuGgfFaGHrQ/exec';

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  
  const query = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const url = `${SHEET_URL}?${query}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ok: true })
      });
    }).on('error', () => {
      resolve({
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false })
      });
    });
  });
};
