import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { initializeIcons } from '@fluentui/react/lib/Icons'

import { store } from './store'
import { AppRoutes } from './components/Routes'
import './index.css'

initializeIcons()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
    // </React.StrictMode>,
)
