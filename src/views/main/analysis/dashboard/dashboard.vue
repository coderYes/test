<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CountCard from './c-cpns/count-card/count-card.vue'
import useAnalysis from '@/stores/main/analysis/analysis'
import { PieEcharts, LineEcharts, RoseEcharts } from '@/components/page-echarts'
import { computed } from 'vue'
const analysisStore = useAnalysis()
analysisStore.fetchAnalysisDataAction()
const { amountList, goodsCategoryCount, goodsCategorySale } =
  storeToRefs(analysisStore)

const dataCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const saleData = computed(() => {
  return goodsCategorySale.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
</script>

<template>
  <div class="dashboard">
    <!-- 1. 顶部数字展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.title">
        <el-col :span="6">
          <CountCard v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <PieEcharts :data-count="dataCount" />
      </el-col>
      <el-col :span="10">
        <RoseEcharts :rose-data="saleData" />
      </el-col>
      <el-col :span="7">1 </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less"></style>
