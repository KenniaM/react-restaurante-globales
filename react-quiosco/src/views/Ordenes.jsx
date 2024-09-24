import useSWR from "swr"
import useQuisco from "../hooks/useQuiosco"
import clienteAxios from "../config/axios"
import { formatearDinero } from "../helpers"

export default function Ordenes() {
const token = localStorage.getItem('AUTH_TOKEN')
const fetcher = ()=> clienteAxios('/api/pedidos',{
  headers:{
    Authorization: `Bearer ${token}`
  }
  })

  const { data, error, isLoading } = useSWR('/api/pedidos',fetcher , {refreshInterval
    : 1000
  })
 
  const {handleclickCompletarPedido} = useQuisco()
  if(isLoading) return <p>Cargando...</p>

  return (
    <div>  
        <h1 className="text-4xl font-black">Ordenes</h1>
        <p className="text-2xl my-10">
          Administra las ordenes de tus clientes desde esta sección
        </p>

        <div className="grid grid-cols-2 gap-5">
          {data.data.data.map(pedido=>( 
            <div key={pedido.id} className="border border-gray-300 p-4 my-4 shadow space-y-2 border-b">
              <p className="text-xl font-bold text-slate-600">Contenido del pedido:</p>
              <h2 className="text-xl font-bold">Pedido: {pedido.id}</h2>
              {pedido.productos.map(producto=>( 
                
                <div key={producto.id} className="border-b border-b-slate-500 last-of-type:border-none py-5">
                  <p className="text-sm">ID:{producto.id}</p>
                  <p className="text-sm">{producto.nombre}</p>
                  <p>
                    Cantidad : {''}
                    <span className="font-bold">{producto.pivot.cantidad}</span>
                  </p>
                </div>
              ))}
              <p className="text-lg font-bold text-slate-600">Cliente: <span className="font-normal">{pedido.user.name}</span></p>
              
              <p className="text-lg font-bold text-amber-600">Total: <span className="text-slate-600 font-normal">{formatearDinero(pedido.total)}</span></p>
            
              <button type="submit"
                  className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer'
                  onClick={()=>handleclickCompletarPedido(pedido.id)}
                > Completar</button>
            </div>
          ))}
        </div>

    </div>
  )
}
