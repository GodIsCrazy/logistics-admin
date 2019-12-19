import Api from '@/api/login/index'
export default {
  'LOGIN_IN': async ({ commit }: any, data: any) => {
    let result = await Api.submitLogin(data)
    console.log(result)
    commit('SET_TOKEN', result.token)
  }
}
