import Categoria from "../components/Categoria";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import useQuiosco from "../hooks/useQuiosco";
import { useState, useRef } from "react";
import Alerta from "../components/Alerta"

export default function Categorias() {
  const { handleclickAgregarCategoria } = useQuiosco();
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: '',
    icono: null
  });
  const [errores, setErrores] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nuevaCategoria.nombre.trim()) {
      setErrores('El nombre es obligatorio')
      return;
    }
    
    if (!nuevaCategoria.icono) {
      setErrores('Debes seleccionar una imagen')
      return;
    }
  
    const formData = new FormData();
    formData.append('nombre', nuevaCategoria.nombre);
    formData.append('icono', nuevaCategoria.icono);
  
    try {
      await handleclickAgregarCategoria(formData);
      setMensaje('Categoría agregada exitosamente');
      setNuevaCategoria({ nombre: '', icono: null }); // Limpiar el formulario
      fileInputRef.current.value = '';  // Limpiar el valor del input de archivo
    } catch (error) {
      setMensaje('Error al agregar la categoría');
    }
  };
  const handleChange = (e) => {
    setNuevaCategoria({
      ...nuevaCategoria,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Extraer el nombre que está entre el "_" y el "."
    const icono = file.name.split('_')[1].split('.')[0];
    
    setNuevaCategoria({
      ...nuevaCategoria,
      icono: icono
    });
  };

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clienteAxios('/api/categorias', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data);

  const { data, error, isLoading } = useSWR('/api/categorias', fetcher, {
    refreshInterval: 10000
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-4xl font-black">Categorías</h1>
      <p className="text-2xl my-5">
        Maneja las disponibilidad de tus categorías desde esta sección
      </p>
      <div className="bg-white shadow-md rounded-md mt-5 px-3 py-5">
        <form onSubmit={handleSubmit}>
        {errores ? errores.map((error,i) => <Alerta key={i}>{error}</Alerta>) : null}
          <div className="mb-3">
            <label className="text-slate-800" htmlFor="nombre">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre" 
              className="mt-1 w-full p-2 bg-gray-50"
              onChange={handleChange}
              value={nuevaCategoria.nombre}  
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium text-gray-900" htmlFor="imagen">
              Imagen:
            </label>
            <input
              type="file"
              id="icono"
              name="icono"  
              className="block w-full text-sm text-gray-900 border rounded-lg"
              onChange={handleFileChange}  
            />
          </div>
          <input
            type="submit"
            value="Agregar Categoría"
            className="bg-green-600 hover:bg-green-700 text-white w-full mt-3 p-2 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
      <h2 className="text-2xl font-black p-2">Listado de Categorías</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2">
        {data.data.map((categoria) => (
          <Categoria
            key={categoria.icono}
            categoria={categoria}
            botonCategoria={false}
            nombreCategoria={true}
            botonEliminar={true}
          />
        ))}
      </div>
    </div>
  );
}
