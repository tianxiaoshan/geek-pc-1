import request from '../../utils/request'
export const saveChannelsId = (payload) => {
  return {
    type: 'save/channelsid',
    payload,
  }
}
// 获取频道列表
export const channelsId = () => {
  return async (dispatch) => {
    const res = await request({
      url: 'channels',
      method: 'get',
    })
    dispatch(saveChannelsId(res.data.channels))
  }
}
