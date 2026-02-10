import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import './i18n.js'
import 'react-date-range/dist/styles.css'; // Ana stil dosyası
import 'react-date-range/dist/theme/default.css'; // Varsayılan tema

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
