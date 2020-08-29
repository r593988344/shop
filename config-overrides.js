const {
  override,
  overrideDevServer,
  addLessLoader,
  addWebpackAlias,
  addPostcssPlugins,
  fixBabelImports,
  addWebpackPlugin,
  adjustStyleLoaders,
} = require('customize-cra');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const path = require('path');
// 本地调试端口
process.env.PORT = 8001;
// 热跟新
const hotLoader = () => (config, env) => {
  config = rewireReactHotLoader(config, env);
  return config;
};

//生产环境去除console.* functions
const dropConsole = () => {
  return (config) => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true;
        }
      });
    }
    return config;
  };
};

//打包 分包
const splitChunks = () => (config) => {
  config.optimization.splitChunks = {
    chunks: 'all',
    minSize: 20000,
    minChunks: 2,
    automaticNameDelimiter: '.',
    maxInitialRequests: Infinity,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: 10,
      },
    },
  };
  return config;
};

const rewiredMap = () => (config) => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  console.log(config.devtool);
  return config;
};

const addCustomize = () => (config) => {
  // if (process.env.NODE_ENV === 'production') {
  //   // 配置打包后的文件位置
  //   config.output.path = __dirname + '../dist/';
  //   config.output.publicPath = './';
  // }
  return config;
};
// 跨域配置
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: 'xxx',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  };
};

module.exports = {
  // 使用 babel-import 按需加载
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
    addLessLoader(
      {},
      {
        // strictMath: true,
        noIeCompat: true,
        javascriptEnabled: true,
        modifyVars: {},
        // localIdentName: '[local]--[hash:base64:5]', // 自定义 CSS Modules 的 localIdentName
      },
    ),
    addPostcssPlugins([
      require('postcss-pxtorem')({
        rootValue: 16,
        propList: ['*'],
        minPixelValue: 2,
        selectorBlackList: ['am-'],
      }),
    ]),
    adjustStyleLoaders(({ use: [, css, postcss, resolve] }) => {
      css.options.sourceMap = false; // css-loader
      postcss.options.sourceMap = false; // postcss-loader
      // when enable pre-processor,
      // resolve-url-loader will be enabled too
      if (resolve) {
        resolve.options.sourceMap = false; // resolve-url-loader
      }
    }),
    // add an alias for "ag-grid-react" imports
    addWebpackAlias({
      ['@']: path.resolve(__dirname, './src'),
      ['components']: path.resolve(__dirname, './src/components'),
      ['react-dom']: '@hot-loader/react-dom',
    }),
    // 将 tsconfig.json 中的路径配置映射到 webpack 中
    addCustomize(),
    // 热跟新
    hotLoader(),
    dropConsole(),
    rewiredMap(),
    splitChunks(),
    addWebpackPlugin(new ProgressBarPlugin()),
  ),
  devServer: overrideDevServer(devServerConfig()),
};
