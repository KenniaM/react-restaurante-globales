import useSWR from "swr"
import clienteAxios from "../config/axios"
import Producto from "../components/Producto"
import ModalAgregarProducto from "../components/ModalAgregarProducto";
import { useState } from "react";

export default function Productos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProducto, setModalProducto] = useState(null);

  const openModal = (producto = null) => {
    setModalProducto(producto); // Configura el producto para editar o null para agregar
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = ()=> clienteAxios('/api/productos', {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then(data=>data.data)

  const { data, error, isLoading } = useSWR('/api/productos',fetcher,{
    refreshInterval: 10000
  })

  if (isLoading) return <p>Cargando...</p>


  return (
    <div>
      <h1 className="text-4xl font-black">Productos</h1>
        <p className="text-2xl my-10">
          Maneja las disponibilidad de tus productos desde esta sección
        </p>
        <button
          type="button"
          className="bg-green-600 text-white p-3 uppercase font-bold absolute right-0 top-0 mt-6 mr-6"
          onClick={() => openModal()} // Al hacer clic se abre el modal para agregar
        >
          Agregar Producto
        </button>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {data.data.map(producto=>(
              <Producto
              key={producto.imagen}
              producto={producto}
              btnAgregarProducto={true}
              botonEditar={true}
              botonEliminar={true}
              botonDisponible={true}
              />
          ))}
        </div>
        {modalOpen && (
        <ModalAgregarProducto
          producto={modalProducto}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
