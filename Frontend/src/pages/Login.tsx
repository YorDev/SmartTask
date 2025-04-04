import Form from "../components/Form"

function Login() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Form route="/api/token/" method="login" />
        </div>
    );
};

export default Login;