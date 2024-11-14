import { Link } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import { formatearDinero } from "../helpers";
import { useAuth } from "../hooks/useAuth"

export default function Historico() {
  const token = localStorage.getItem("AUTH_TOKEN");
  const {user} = useAuth({middleware:'auth'});
  
  const fetcher = () =>
    clienteAxios("/api/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
  const { data, error, isLoading } = useSWR("/api/pedidos", fetcher, {
    refreshInterval: 1000,
  });
  
   const pedidosFiltrados = data?.data?.data.filter((pedido) => pedido.user.id === user.id);

 if (isLoading) return <p>Cargando...</p>;
  return (
    <>
      <h1 className="text-3xl font-black">
        Historial de pedidos
      </h1>
      <div className="grid grid-cols-2 gap-5">
        {pedidosFiltrados.map((pedido) => (
          <div
            key={pedido.id}
            className="border border-gray-300 p-4 my-4 shadow space-y-2 border-b"
          >
            <p className="text-xl font-bold text-slate-600">
              Contenido del pedido:
            </p>
            <h2 className="text-xl font-bold">Pedido: {pedido.id}</h2>
            {pedido.productos.map((producto) => (
              <div
                key={producto.id}
                className="border-b border-b-slate-500 last-of-type:border-none py-5"
              >
                <p className="text-sm">ID:{producto.id}</p>
                <p className="text-sm">{producto.nombre}</p>
                <p>
                  Cantidad : {""}
                  <span className="font-bold">{producto.pivot.cantidad}</span>
                </p>
              </div>
            ))}
            <p className="text-lg font-bold text-slate-600">
              Cliente: <span className="font-normal">{pedido.user.name}</span>
            </p>

            <p className="text-lg font-bold text-amber-600">
              Total:{" "}
              <span className="text-slate-600 font-normal">
                {formatearDinero(pedido.total)}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Link
          to="/"
          className="bg-indigo-600 text-white w-40 block p-2 rounded uppercase font-bold text-center"
        >
          Volver
        </Link>
      </div>
    </>
  );
}
