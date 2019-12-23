import Cookie from 'js-cookie'

export default {
  /* *
   * 设置一个cookie值
   */
  setCookie: (key: string, value: string): void => {
    Cookie.set(key, value)
  },
  /* *
   * 得到一个cookie值
   */
  getCookie: (key: string): string => {
    return Cookie.get(key)
  },
  /* *
   * 删除一个cookie值
   */
  removeCookieItem: (key: string): void => {
    Cookie.remove(key)
  },
  /* *
   * 清空cookie值
   */
  clearCookie: (): void => {
    Cookie.clear()
  }
}
