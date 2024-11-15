import { useState, useEffect } from "react";
import useQuiosco from "../hooks/useQuiosco";

export default function ModalAgregarProducto({ producto = null, onClose }) {
  const { handleSetProducto, handleEditarProducto, categorias } = useQuiosco();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [categoriaId, setCategoriaId] = useState(""); // Estado para almacenar el ID de la categoría seleccionada

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setPrecio(producto.precio);
      setImagen(producto.imagen);
      setCategoriaId(producto.categoria_id || ""); 
    }
  }, [producto]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const icono = file.name.substring(0, file.name.lastIndexOf('.'));
    setImagen(icono);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("imagen", imagen);
    formData.append("categoria_id", categoriaId); // Asigna el ID de la categoría seleccionada
    formData.append("disponible", true);

    if (producto) {
      handleEditarProducto({ ...formData, id: producto.id });
    } else {
      handleSetProducto(formData);
    }

    onClose(); // Cierra el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{producto ? "Editar Producto" : "Agregar Producto"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 font-bold">Nombre:</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold">Precio:</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold">Imagen:</label>
            <input
              type="file"
              className="border p-2 w-full"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-bold">Categoría:</label>
            <select
              className="border p-2 w-full"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded mt-3 w-full">
            {producto ? "Guardar Cambios" : "Agregar Producto"}
          </button>
          <button onClick={onClose} type="button" className="bg-gray-400 text-white py-2 px-4 rounded mt-3 w-full">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
