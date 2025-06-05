module.exports = {
  apps: [
    {
      name: "abc-quote",
      script: "dist/index.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};