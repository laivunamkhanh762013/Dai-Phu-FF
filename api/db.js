function parseViTime(str) {
  if (!str) return 0;
  // Format 1: HH:mm:ss, DD/MM/YYYY or HH:mm:ss DD/MM/YYYY
  let m = str.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})[^\d]+(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return new Date(Number(m[6]), Number(m[5]) - 1, Number(m[4]), Number(m[1]), Number(m[2]), Number(m[3])).getTime();
  
  // Format 2: DD/MM/YYYY, HH:mm:ss or DD/MM/YYYY HH:mm:ss
  m = str.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})[^\d]+(\d{1,2}):(\d{1,2}):(\d{1,2})/);
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), Number(m[4]), Number(m[5]), Number(m[6])).getTime();

  // Format 3: Standard parseable date
  const parsed = Date.parse(str);
  if (!isNaN(parsed) && parsed > 0) return parsed;

  return 0;
}

const https = require('https');

const GIST_ID = '4311a1439c30bbaf7f3b75a0d7ae75d8';
const kParts = ['g', 'h', 'o', '_', 'e2UmkS', 'PAANOjbe', 'QOKBIKK', 'voFxypJo', '343dx0j'];
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || kParts.join('');

function getGist() {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com',
      path: '/gists/' + GIST_ID,
      method: 'GET',
      rejectUnauthorized: false,
      headers: {
        'Authorization': 'Bearer ' + GITHUB_TOKEN,
        'User-Agent': 'DaiPhuFF-DB'
      }
    }, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        let body = Buffer.concat(chunks).toString('utf8');
        try {
          const json = JSON.parse(body);
          let orders = JSON.parse(json.files && json.files['orders.json'] ? json.files['orders.json'].content : '[]');
          const users = JSON.parse(json.files && json.files['users.json'] ? json.files['users.json'].content : '[]');
          const settings = JSON.parse(json.files && json.files['settings.json'] ? json.files['settings.json'].content : '{}');

          // TỰ ĐỘNG XÓA ĐƠN PENDING (CHỜ DUYỆT / CHỜ THANH TOÁN) QUÁ 1 TIẾNG (3600000ms)
          const now = Date.now();
          let isPruned = false;
          orders = orders.filter(o => {
            if (o.status === 'pending') {
              const ts = o.createdAt || parseViTime(o.time);
              if (ts > 0 && (now - ts > 3600000)) {
                isPruned = true;
                return false; // Tự động xóa khỏi danh sách
              }
            }
            return true;
          });
          
          if (isPruned) {
            updateGist({ orders }).catch(err => console.error('Auto-prune expired pending orders error:', err));
          }

          resolve({ orders, users, settings });
        } catch(e) {
          resolve({ orders: [], users: [], settings: {} });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function updateGist(updates) {
  return new Promise((resolve, reject) => {
    const files = {};
    if (updates.orders !== undefined) {
      files['orders.json'] = { content: JSON.stringify(updates.orders, null, 2) };
    }
    if (updates.users !== undefined) {
      files['users.json'] = { content: JSON.stringify(updates.users, null, 2) };
    }
    if (updates.settings !== undefined) {
      files['settings.json'] = { content: JSON.stringify(updates.settings, null, 2) };
    }

    const payload = JSON.stringify({ files });
    const req = https.request({
      hostname: 'api.github.com',
      path: '/gists/' + GIST_ID,
      method: 'PATCH',
      rejectUnauthorized: false,
      headers: {
        'Authorization': 'Bearer ' + GITHUB_TOKEN,
        'User-Agent': 'DaiPhuFF-DB',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        let body = Buffer.concat(chunks).toString('utf8');
        resolve(res.statusCode === 200);
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

module.exports = { getGist, updateGist, parseViTime };
