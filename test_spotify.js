const https = require('https');

const clientId = '6be89f1908c5462d9e9a67e153d5ed94';
const clientSecret = '7d6a65681d804496b47d977b5312a93b';
const refreshToken = 'AQC6BVNBhshW_5JQ95vvzc3YBhe1TI9bd8KnSLaChfH1XBZowIGwlu9Fi1f5HbV2TyqGgotdRpMPLoAE6WnQdEnlxYDutPmm3jxcF77-lC7s4xicuZmmY2avJustN9TJm2s';

const postData = `grant_type=refresh_token&refresh_token=${refreshToken}`;
const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const options = {
  hostname: 'accounts.spotify.com',
  port: 443,
  path: '/api/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${auth}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end(); 