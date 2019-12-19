import http from '@/HttpInterceptors'
interface Param {
  method: string
  url: string
  data?: any
  params?: any
}
const request = (data: object, url: string, method: any = 'get'): any => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      let result = await http.request({
        url,
        method,
        data: method.toLowerCase() === 'get' ? {} : data,
        params: method.toLowerCase() === 'get' ? data : {}
      })
      resolve(result)
    } catch (err) {
      reject(err)
    }
  })
}

export default request
