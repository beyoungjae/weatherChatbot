import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Provider } from 'react-redux'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   // <React.StrictMode>
   <RecoilRoot>
      <BrowserRouter future={{ v7_fetcherPersist: true, v7_startTransition: true, v7_relativeSplatPath: true }}>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>
   </RecoilRoot>
   // </React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
