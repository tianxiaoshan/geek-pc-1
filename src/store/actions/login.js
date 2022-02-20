import request from '../../utils/request'
import { setTokenInfo } from '../../utils/storage'
// 保存 token到redux里
export const saveToken = (payload) => {
  return {
    type: 'save/token',
    payload,
  }
}
// 用户登录
export const login = (data) => {
  return async (dispatch) => {
    const res = await request({
      url: 'authorizations',
      method: 'post',
      data,
    })

    dispatch(saveToken(res.data.token))
    setTokenInfo(res.data.token)
  }
}
