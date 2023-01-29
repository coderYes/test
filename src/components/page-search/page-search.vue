<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import usePermissions from '@/hooks/usePermissions'
interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)
const formRef = ref<InstanceType<typeof ElForm>>()
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}

const searchForm = reactive(initialForm)
const handleResetFormClick = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}

const handlerQueryFormClick = () => {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="user-search" v-if="isQuery">
    <el-form
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
      :model="searchForm"
    >
      <el-row :gutter="20">
        <template v-for="item in props.searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- <component :is="'el-' + item.type"></component> -->
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>

              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  v-model="searchForm[item.prop]"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  :style="{ width: '100%' }"
                  v-model="searchForm[item.enable]"
                  placeholder="请选择查询的状态"
                  size="large"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :value="option.value" :label="option.label" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 重置,搜索 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetFormClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handlerQueryFormClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
