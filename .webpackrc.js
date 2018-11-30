const path = require('path');

export default {
  proxy: {
    '/admin': {
      target: '',
      changeOrigin: true,
    },
  },
  entry: 'src/index.js',
  define: {
    __DEV__: true,
  },
  alias: {
    Components: path.resolve(__dirname, 'src/components/'),
    Utils: path.resolve(__dirname, 'src/utils/'),
    Assets: path.resolve(__dirname, 'src/assets/'),
    react: path.resolve(
      __dirname,
      'node_modules/react/umd/react.production.min.js'
    ),
    'react-dom': path.resolve(
      __dirname,
      'node_modules/react-dom/umd/react-dom.production.min.js'
    ),
  },
  env: {
    development: {
      publicPath: '/',
      disableCSSSourceMap: true,
      alias: {
        Components: path.resolve(__dirname, 'src/components/'),
        Utils: path.resolve(__dirname, 'src/utils/'),
        Assets: path.resolve(__dirname, 'src/assets/'),
        react: path.resolve(
          __dirname,
          'node_modules/react/umd/react.development.js'
        ),
        'react-dom': path.resolve(
          __dirname,
          'node_modules/react-dom/umd/react-dom.development.js'
        ),
      },
      extraBabelPlugins: [
        'dva-hmr',
        [
          'import',
          { libraryName: 'antd', style: 'css' },
        ],
        [
          'import',
          { libraryName: 'antd-mobile', style: 'css' },
          'antd-mobile'
        ],
      ],
      devtool: 'eval',
      ignoreMomentLocale: true,
    },
    production: {
      publicPath: './',
      hash: true,
      extraBabelPlugins: [
        [
          'import',
          { libraryName: 'antd', style: 'css' },
        ],
        [
          'import',
          { libraryName: 'antd-mobile', style: 'css' },
          'antd-mobile'
        ],
      ],
    },
  },
};
