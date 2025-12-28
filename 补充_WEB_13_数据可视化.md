# 补充教程 13：数据可视化

## 你将学到
- 工具选择：Chart.js / ECharts / D3 的差异
- 图表无障碍与交互优化
- 性能与懒加载

---

## 选择指南
- **Chart.js**：快速、简单，常见图表开箱即用。
- **ECharts**：配置丰富、交互强、内置主题；适合业务仪表盘。
- **D3**：底层数据绑定与渲染控制，灵活但需要更多代码。

---

## 无障碍与交互
- 为图表提供文本概要和数据表格（可折叠）。
- 颜色对比达标；不要只依赖颜色区分，添加形状/图例说明。
- 提供工具提示、缩放/筛选的重置按钮；键盘操作时提供 focus 逻辑。

---

## 性能与懒加载
- 大数据量：抽样/降采样，或使用 WebGL 图表库；必要时用 Web Worker 做数据预处理。
- 按需加载：进入图表区域时再加载库（动态 import）；多图表分块渲染。

---

## 最小示例（ECharts 动态加载）
```js
let chart;
async function initChart() {
  const echarts = await import('echarts');
  const dom = document.getElementById('chart');
  chart = echarts.init(dom);
  chart.setOption({
    xAxis: { type: 'category', data: ['Mon','Tue','Wed'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [120, 200, 150] }]
  });
}
```

---

## 进一步阅读
- Chart.js：https://www.chartjs.org
- ECharts：https://echarts.apache.org
- D3：https://d3js.org
