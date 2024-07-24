const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@service': path.resolve(__dirname, 'src/service'),
      '@types': path.resolve(__dirname, 'src/types')
    }
  }
};
