<template>
  <div class="line-echarts">
    <BaseEcharts :option="option" />
  </div>
</template>

<script lang="ts" setup>
import BaseEcharts from '..'
import type { EChartsOption } from 'echarts'
const option: EChartsOption = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
  ]
}
</script>

<style scoped lang="less"></style>
