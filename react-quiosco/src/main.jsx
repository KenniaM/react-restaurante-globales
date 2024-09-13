import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import { QuioscoProvider } from './context/QuioscoProvider.jsx'
import router from './router.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuioscoProvider>
      <RouterProvider  router={router}/>
    </QuioscoProvider>
  </React.StrictMode>,
)
