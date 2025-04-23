import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-blue-600">SmartTask</h1>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 text-blue-600 hover:text-blue-700"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Registrarse
            </Link>
          </div>
        </nav>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Gestiona tus tareas de manera inteligente
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            SmartTask es tu asistente personal para organizar tareas con la
            ayuda de inteligencia artificial. Simplifica tu vida y aumenta tu
            productividad.
          </p>
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Comienza Gratis
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Características Principales
          </h3>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Gestión de Tareas</h4>
              <p className="text-gray-600">
                Organiza y prioriza tus tareas de manera eficiente con nuestra
                interfaz intuitiva.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Asistente IA</h4>
              <p className="text-gray-600">
                Recibe sugerencias inteligentes y optimiza tu flujo de trabajo
                con nuestro asistente AI.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Recordatorios</h4>
              <p className="text-gray-600">
                Nunca olvides una tarea importante con nuestro sistema de
                recordatorios personalizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            ¿Listo para aumentar tu productividad?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Únete a miles de usuarios que ya están optimizando su tiempo con
            SmartTask
          </p>
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition shadow-lg inline-block"
          >
            Crear Cuenta Gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © 2025 SmartTask. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Términos
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Privacidad
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
