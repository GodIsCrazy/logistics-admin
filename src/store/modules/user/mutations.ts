
export default {
  'SET_TOKEN': (state: any, data: string) => {
    state.token = data
  },
  'SET_PERMISSION': (state: any, data: Array<any>) => {
    state.permissionMenu = data
  }
}
