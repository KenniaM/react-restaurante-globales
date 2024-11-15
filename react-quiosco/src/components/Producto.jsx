import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuiosco";
import ModalAgregarProducto from "./ModalAgregarProducto";
import { useState } from "react";

export default function Producto({producto , botonAgregar=false,btnAgregarProducto=false, botonEditar=false, botonEliminar=false, botonDisponible=false}) {
  
  const { handleClickModal, handleSetProducto, handleclickProductoAgotado, handleEditarProducto, handleEliminarProducto} = useQuisco();
  const { nombre, imagen, precio } = producto;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProducto, setModalProducto] = useState(null);

  const openModal = (producto = null) => {
    setModalProducto(producto); // Configura el producto para editar o null para agregar
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className="border p-3 shadow bg-white">
      
      <img
        alt={`imagen ${nombre}`}
        className="w-full"
        src={`/img/${imagen}.jpg`}
      />
      <div className="p-5">
          <h3 className="text-2xl font-bold">{nombre}</h3>
          <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>

          {botonAgregar && (
          <button
            type="button"
            className="bg-green-600 text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={() => {
              handleClickModal();
              handleSetProducto(producto); // Setea el producto en el contexto para agregar
            }}
          >
            Agregar
          </button>
        )}
          {botonEditar &&(
            <button type="button" className="bg-yellow-500 text-white w-full mt-5 p-3 uppercase font-bold" onClick={() => {
              
              openModal(producto)
            }}>
             Editar
            </button>
          )}  

          {botonEliminar &&(
            <button type="button" className="bg-red-600 text-white w-full mt-5 p-3 uppercase font-bold" onClick={() => { 
              handleEliminarProducto(producto.id);
            }}>
             Eliminar
            </button>
          )} 

          {botonDisponible &&(
            <button type="button" className="bg-indigo-600 text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={()=> handleclickProductoAgotado(producto.id)}>
            Producto Agotado
           </button>
          )}
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
