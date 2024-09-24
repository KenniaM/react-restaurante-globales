import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuiosco";

export default function Producto({producto , botonAgregar=false, botonDisponible=false}) {
  
  const { handleClickModal, handleSetProducto, handleclickProductoAgotado} = useQuisco();
  const { nombre, imagen, precio } = producto;

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

          {botonAgregar &&(
            <button type="button" className="bg-indigo-600 text-white w-full mt-5 p-3 uppercase font-bold" onClick={() => {handleClickModal(); handleSetProducto(producto);}}>
             Agregar
            </button>
          )}

          {botonDisponible &&(
            <button type="button" className="bg-indigo-600 text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={()=> handleclickProductoAgotado(producto.id)}>
            Producto Agotado
           </button>
          )}
      </div>
    </div>
  )
}
