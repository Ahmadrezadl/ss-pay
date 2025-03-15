module.exports = {
  apps: [
    {
      name: 'purchase-verification-server',
      script: './server.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
