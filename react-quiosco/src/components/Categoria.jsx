import useQuisco from "../hooks/useQuiosco";

export default function Categoria({categoria, botonCategoria=true, nombreCategoria=false, botonEliminar=false}) {
    const {handleClickCategoria, categoriaActual,handleclickEliminarCategoria} = useQuisco();
    const {icono, id, nombre} = categoria;

    return (
        <div className={`${botonEliminar ? 'bg-white' : categoriaActual.id === id ? "bg-amber-400" : 'bg-white'} flex items-center justify-between gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
            <div className="flex items-center gap-4">
                <img
                    alt="Imagen Icono"
                    src={`/img/icono_${icono}.svg`}
                    className="w-12"
                />
                {botonCategoria && (
                    <button className="text-lg font-bold cursor-pointer truncate" type="button" onClick={() => handleClickCategoria(id)}>{nombre}</button>
                )}
                {nombreCategoria && (
                    <h2 className="text-lg font-bold text-center mb-2">
                        {nombre}
                    </h2>
                )}
            </div>
            {botonEliminar && (
                <button 
                    type="button"
                    className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md"
                    onClick={() => handleclickEliminarCategoria(id)}
                >
                   <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
            )}
        </div>
    );
}
