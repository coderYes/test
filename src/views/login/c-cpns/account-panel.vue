<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
import useLogin from '@/stores/login/login'
import { localCache } from '@/utils/cache'
const loginStore = useLogin()
const ruleFormRef = ref<FormInstance>()
// 数据
const accountForm = reactive<IAccount>({
  name: '',
  password: ''
})
function isSavePwd(val: boolean) {
  console.log('isSavePwd:', val)
  if (val) {
    localCache.setCache('user-pwd', accountForm)
  } else {
    console.log('删除key')
    localCache.removeCache('user-pwd')
  }
}

function loginActions() {
  ruleFormRef.value?.validate(async (valid) => {
    if (!valid) {
      return ElMessage.error('登录信息验证不通过!')
    }
    loginStore.AccountLoginAction(accountForm)
  })
}
onMounted(() => {
  const account = localCache.getCache('user-pwd')
  if (account) {
    accountForm.name = account.name
    accountForm.password = account.password
  }
})

defineExpose({
  loginActions,
  isSavePwd
})
// 校验规则
const rules: FormRules = {
  name: [
    { required: true, message: '帐号不能为空', trigger: 'blur' },
    { min: 3, max: 20, message: '请控制在3~20', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    { min: 6, max: 20, message: '请控制在6~20~', trigger: 'blur' }
  ]
}
</script>

<template>
  <el-form
    :rules="rules"
    label-width="60px"
    :model="accountForm"
    ref="ruleFormRef"
    size="large"
  >
    <el-form-item label="帐号:" prop="name">
      <el-input v-model="accountForm.name" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input show-password v-model="accountForm.password" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less">
.account-panel {
  color: red;
}
</style>
