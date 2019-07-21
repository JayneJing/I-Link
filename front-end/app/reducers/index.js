import { combineReducers } from 'redux'
import { intlReducer } from 'react-intl-redux'

import wallet from './wallet'
import login from './login'
import recipient from './recipient'

const rootReducer = combineReducers({
  wallet: wallet,
  login: login,
  recipient: recipient,
  intl: intlReducer,
})

export default rootReducer
