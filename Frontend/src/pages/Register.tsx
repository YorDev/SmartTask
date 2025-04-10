import Form from "../components/Form";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <Form route="/api/user/register" method="register" />
      <p className="mt-4 text-sm text-black">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

export default Register;
