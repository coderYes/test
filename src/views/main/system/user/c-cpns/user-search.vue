<script setup lang="ts"></script>

<template>
  <div class="user-search">
    <el-form label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input placeholder="请输入查询的用户名"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input placeholder="请输入查询的真实姓名"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input placeholder="请输入查询的手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--  -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select
              :style="{ width: '100%' }"
              placeholder="请选择查询的状态"
              size="large"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px 0;
  }
}
</style>
