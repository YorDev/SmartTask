import Form from "../components/Form";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <Form route="/api/token/" method="login" />
      <p className="mt-4 text-sm text-black">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}

export default Login;
