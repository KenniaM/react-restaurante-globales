import { formatearDinero } from "../helpers";

export default function ModalFactura({ pedido, total, onClose }) {
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Factura del Pedido</h2>
        <ul>
          {pedido.map((producto) => (
            <li key={producto.id} className="flex justify-between mb-2">
              <span>{producto.nombre}</span>
              <span>{formatearDinero(producto.precio * producto.cantidad)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold mt-4">
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
