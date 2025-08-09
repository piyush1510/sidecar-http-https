const express = require('express');
const fs = require('fs');
const https = require('https');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.port || 8081;
const target = process.env.target || 'http://localhost:8080'; // Default target

var privateKey  = process.env.key || fs.readFileSync("key.pem", 'utf8');
var certificate = process.env.cert || fs.readFileSync("cert.pem", 'utf8');;

var credentials = {key: privateKey, cert: certificate};
const app = express();

// Proxy all requests to target server
app.use('/', createProxyMiddleware({
  target: target,
  changeOrigin: true,
  secure: false // Set to true if target uses valid SSL
}));

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Reverse proxy listening on port ${port}`);
});
