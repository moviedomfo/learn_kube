module.exports = {
  apps: [{
    name: "boleteria-vip-daemon",
    script: './dist/app.js',
    watch: 'true',
    env: {
      "NODE_ENV": "dev",
    },
    env_production: {
      "NODE_ENV": "prod"
    }
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
