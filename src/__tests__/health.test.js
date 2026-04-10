const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../index.js');

const TEST_PORT = 3099;
let server;

before(() => {
  server = app.listen(TEST_PORT);
});

after(() => {
  server.close();
});

test('GET /health returns 200 with { status: "ok" }', async () => {
  await new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/health',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      assert.equal(res.statusCode, 200, 'Status code should be 200');

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const body = JSON.parse(data);
          assert.deepEqual(body, { status: 'ok' }, 'Body should be { status: "ok" }');
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
});
