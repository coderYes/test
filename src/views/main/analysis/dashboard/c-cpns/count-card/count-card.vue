<template>
  <div class="count-card">
    <div class="header">
      <div class="left">{{ title }}</div>
      <div class="right">{{ tips }}</div>
    </div>
    <div class="count" ref="countup1Ref">{{ number1 }}</div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="countup2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CountUp } from 'countup.js'
import { ref, onMounted } from 'vue'
interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
const props = withDefaults(defineProps<IProps>(), {
  amount: '$',
  title: '默认',
  tips: '所有商品总销量',
  number1: 1233231323,
  number2: 233333,
  subtitle: '商品总销量'
})
const countup1Ref = ref<HTMLElement>()
const countup2Ref = ref<HTMLElement>()
// 参数一: 元素 参数二: 目标 参数三: start count
onMounted(() => {
  const countup1 = new CountUp(countup1Ref.value!, props.number1, {
    startVal: 0,
    prefix: '#'
  })
  countup1.start()
  const countup2 = new CountUp(countup2Ref.value!, props.number2, {
    prefix: '$',
    startVal: 0
  })
  countup2.start()
})
</script>

<style scoped lang="less">
.count-card {
  display: flex;
  flex-direction: column;
  height: 130px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
  }
  .count {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 25px;
    font-weight: 500;
  }
  .footer {
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
