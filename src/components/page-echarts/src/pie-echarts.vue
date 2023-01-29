<template>
  <div class="pie-echarts">
    <BaseEcharts :option="option" />
  </div>
</template>

<script lang="ts" setup>
import BaseEcharts from '..'
import type { EChartsOption } from 'echarts'
const props = defineProps<{
  dataCount: any[]
}>()
const option: EChartsOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    top: 'top'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: props.dataCount,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
</script>

<style scoped lang="less"></style>
