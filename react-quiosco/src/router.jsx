import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout"
import AuthLayout from "./layouts/AuthLayout";
import Inicio from "./views/Inicio"
import Login from "./views/Login"
import Registro from "./views/Registro"
import AdminLayout from "./layouts/AdminLayout";
import Ordenes from "./views/Ordenes";
import Productos from "./views/Productos";
import Historico from "./views/Historico";
import Categorias from "./views/Categorias"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            },
            {
                path:'/historico',
                element: <Historico />
            }
        ]
        
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children:[
            {
                path:'/auth/login',
                element: <Login /> 
            },
            {
                path:'/auth/registro',
                element: <Registro /> 
            }
        ]
      
    },
    {
        path:'/admin',
        element: <AdminLayout />,
        children:[
            {
                index:true,
                element:<Ordenes />
            },
            {
                path : '/admin/productos',
                element:<Productos />
            },
            {
                path : '/admin/categorias',
                element:<Categorias />
            }

    
    ]
    }
])

export default router