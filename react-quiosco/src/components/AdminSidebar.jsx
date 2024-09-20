import { Link } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export default function AdminSidebar() {
    const {logout} = useAuth({middleware:'auth'});
  return (
    <aside className="md:w-72 h-screen">
        <div className="p-4">
            <img 
            src="/img/logo.svg" 
            alt="imagen logotipo" 
            className="w-40"
            />
        </div>
        <nav className='flex flex-col p-4'>
            <Link to="/admin" className=" hover:bg-gray-300">Ordenes</Link>
            <Link to="/admin/productos" className=" hover:bg-gray-300">Productos</Link>
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
