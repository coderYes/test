<template>
  <div class="rose-echarts">
    <BaseEcharts :option="option" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import BaseEcharts from '..'
import type { EChartsOption } from 'echarts'
import type { IEchartValueType } from '../types'
const props = defineProps<{
  roseData: IEchartValueType[]
}>()

const option = computed<EChartsOption>(() => ({
  legend: {
    top: 'bottom'
  },
  tooltip: {
    trigger: 'item'
  },

  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: [10, 130],
      center: ['50%', '50%'],
      roseType: 'area',
      bottom: '-12%',
      itemStyle: {
        borderRadius: 8
      },
      data: props.roseData,
      label: {
        show: false
      }
    }
  ]
}))
</script>

<style scoped lang="less"></style>
