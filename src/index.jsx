import React from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { LoginPage } from './pages/LoginPage';
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <React.StrictMode>
            <LoginPage />
        </React.StrictMode>
    </Provider>
)