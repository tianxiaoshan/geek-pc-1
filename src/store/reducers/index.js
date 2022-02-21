import login from './login'
import channels from './channels'
import article from './article'
const { combineReducers } = require('redux')

const reducer = combineReducers({
  login,
  channels,
  article,
})
export default reducer
