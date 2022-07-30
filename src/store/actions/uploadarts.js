import { DatabaseOutlined } from '@ant-design/icons'
import request from '../../utils/request'

export const uploadArticle = (data) => {
  return async (dispatch) => {
    await request.post('mp/articles', data)
  }
}
