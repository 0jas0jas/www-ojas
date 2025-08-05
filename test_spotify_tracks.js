const https = require('https');

const accessToken = 'BQDMfKJIx47Ll3TKLY6DxGnsHHXOY1aiVWwq_wUzu0N3Kw9TNG5DjV8yLYN2YgjMPq_abUdQbIpHP1aC6rSMKBrlvoCslRgPQuMNSP8oEW4SgZZJO4Q_Tf_m3S5kAqCpAi_SsmdQp2BhSJ8wIeRROO46IOwOAd3mArx7UWC7luAgzJStOR5ZL5LEOIn-fJhEP4PLh5Q6usHN925UPS1ipx2lHJBZ6ne9_1AHhpmHLBdhUVVpEY1Unw';

const options = {
  hostname: 'api.spotify.com',
  port: 443,
  path: '/v1/me/top/tracks?time_range=short_term&limit=1&offset=0',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
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

req.end(); 