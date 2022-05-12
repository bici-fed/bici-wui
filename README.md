# bici-wui

## [文档](https://bici-fed.github.io/bici-wui/)

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Run test,

```bash
$ npm test
```

Build library via `father-build`,

```bash
$ npm run build
```

# 部署文档

```bash
yarn deploy
```

## 配置

如果上传到自己服务器不需要更改此处.umirc.ts

如果上传到 Github Pages、需要 非根目录部署

```js
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'bici-wui(博智云创UI组件库，react版本)',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/bici-wui/',
  publicPath: '/bici-wui/',
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
});
```
