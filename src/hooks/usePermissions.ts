import useLogin from '@/stores/login/login'
function usePermissions(permissionID: string) {
  const LoginStore = useLogin()
  const { permissions } = LoginStore
  // 0. 查权限
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
