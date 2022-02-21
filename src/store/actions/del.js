import request from '../../utils/request'
import { saveArticle } from './article'

export const delArt = (id) => {
  return async (dispatch) => {
    const res = await request.delete('mp/articles/' + id)
    // dispatch(saveArticle(res.data))
  }
}
