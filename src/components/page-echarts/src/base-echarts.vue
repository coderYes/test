<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import ChinaJson from '../data/china.json'
import type { EChartsOption } from 'echarts'
interface IProps {
  option: EChartsOption
}
echarts.registerMap('china', ChinaJson as any)
const props = defineProps<IProps>()

const echartsRef = ref<HTMLElement>()
onMounted(() => {
  const echartsInstance = echarts.init(echartsRef.value!, 'light', {
    renderer: 'canvas'
  })
  watchEffect(() => echartsInstance.setOption(props.option))
})
</script>

<style scoped lang="less">
.echarts {
  height: 300px;
  background-color: #fff;
}
</style>
