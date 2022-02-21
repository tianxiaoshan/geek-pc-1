import request from '../../utils/request'

// 保存文章列表到redux
export const saveArticle = (payload) => {
  return {
    type: 'save/article',
    payload,
  }
}
// 获取文章列表
export const getArticle = (params) => {
  return async (dispatch) => {
    const res = await request({
      url: 'mp/articles',
      method: 'get',
      params,
    })

    dispatch(saveArticle(res.data))
  }
}

//
