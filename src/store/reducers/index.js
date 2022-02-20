import login from './login'
import channels from './channels'
const { combineReducers } = require('redux')

const reducer = combineReducers({
  login,
  channels,
})
export default reducer
