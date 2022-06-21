---
title: BrickWall - 卡片布局
group:
  path: /antdx
  title: 基础组件(antx)
nav:
  title: 组件
  path: /components
---

## BrickWall

Demo:

<code src="../demos/brickWallDemo.tsx" background="#fff" title="基本使用" />

#### API

| 属性 | 类型 | 是否必须？ | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| items | any[] | 是 | 无 | 列表使用的数据 |
| render | React.Component | 是 | 无 | 渲染列表每一项的组建 |
| columnWidth | number | 否 | 240 | 每一个卡片的宽度 |
| columnGutter | number | 否 | 0 | 卡片之间的水平间距 |
| rowGutter | number | 否 | 否 | 卡片之间垂直间距 |
| columnCount | number | 否 |  | 默认会根据 cloumnWidth 自动计算每一行的卡片个数，当创建列表的时候 |
