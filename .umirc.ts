import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'bici-wui(博智云创UI组件库，react版本)',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  webpack5: {},
  theme:{
    '@ant-prefix':'mart',
  },
  antd: {
    config: {
      prefixCls: 'mart',
    },
  },
  // exportStatic: {},// 做静态化，即让每个都生成index。html
  lessLoader:{
    modifyVars: {
      'ant-prefix':'mart',
    },
    javascriptEnabled: true,
  }
});
