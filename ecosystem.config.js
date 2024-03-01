module.exports = {
  apps : [{
    name: "djoni-nfe",
    script: "./src/server.js",
    instances: "djoni-nfe",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}