import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-intl-redux'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

import Router from './router'
import store from './configureStore'

import './app.css'

addLocaleData([...en, ...zh])

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router />
    </Provider>
  </AppContainer>
  , document.getElementById('app'),
)
