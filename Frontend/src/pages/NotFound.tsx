// Pagina404.tsx
import React from "react";
import { AlertTriangle } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-col items-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg mb-4">Oops... Página no encontrada</p>
        <p className="text-gray-600 mb-6 text-center">
          La página que estás buscando no existe o ha sido movida. 
          Por favor, regresa a la página principal.
        </p>
        <a
          href="/"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;