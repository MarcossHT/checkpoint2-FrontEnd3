import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Detail from './Routes/Detail'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import { ThemeProvider } from './Hooks/useTheme'
import { AuthProvider } from './Hooks/useAuth'
import Logout from './Routes/Logout'

const root = ReactDOM.createRoot(document.getElementById('root'))
//Lembre-se de configurar suas rotas e seu contexto aqui
const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        loader: () => redirect('/home')
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'Login',
        element: <Login />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/dentist/:matricula',
        element: <Detail />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
