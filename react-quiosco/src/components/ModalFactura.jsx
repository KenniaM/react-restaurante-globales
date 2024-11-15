import { formatearDinero } from "../helpers";

export default function ModalFactura({ pedido, total, onClose }) {
  const fechaHoy = new Date().toLocaleDateString(); 
  const ivaPorcentaje = 0.5; 
  const subtotal = total / (1 + ivaPorcentaje); 
  const iva = total - subtotal; 
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Factura del Pedido</h2>

        <p className="text-sm text-gray-500 mb-4">Fecha: {fechaHoy}</p>
        
        <ul>
          {pedido.map((producto) => (
            <li key={producto.id} className="flex justify-between mb-2">
              <span>{producto.nombre}</span>
              <span>{formatearDinero(producto.precio * producto.cantidad)}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg mt-4">
          Subtotal: {formatearDinero(subtotal)}
        </p>
        <p className="text-lg">
          IVA (5%): {formatearDinero(iva)}
        </p>
        <p className="text-xl font-bold mt-2">
          Total: {formatearDinero(total)}
        </p>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded mt-5 w-full"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
    </>
  );
}
