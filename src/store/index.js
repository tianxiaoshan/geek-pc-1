// 创建store
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { setTokenInfo } from '../utils/storage'

const store = createStore(
  reducer,
  {
    login: setTokenInfo(),
  },
  composeWithDevTools(applyMiddleware(thunk))
)
export default store
