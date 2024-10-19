import { Link } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export default function AdminSidebar() {
    const {logout} = useAuth({middleware:'auth'});
  return (
    <aside className="md:w-72 h-screen">
        <div className="flex justify-center items-center">
            <img 
            src="/img/logo.svg" 
            alt="imagen logotipo" 
            className="w-48"
            />
        </div>
        <nav className='flex flex-col p-2'>
            <Link to="/admin" className=" text-lg font-bold hover:bg-gray-300">Ordenes</Link>
            <Link to="/admin/productos" className=" text-lg font-bold hover:bg-gray-300">Productos</Link>
            <Link to="/admin/categorias" className=" text-lg font-bold hover:bg-gray-300">Categorias</Link>
        </nav>

        <div className='my-5 px-5'>
            <button 
                type="button"
                className="bg-red-500 w-full py-2 text-white rounded-lg"
                onClick={logout}>
                Cerrar Sesión
            </button>

        </div>
    </aside>
  )
}
