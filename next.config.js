module.exports = {
  trailingSlash: true,
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only for client
    if (!isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
  
    return config;
  },
};
