import { useState, FormEvent, ChangeEvent } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../api/Constants";
import LoadingIndicator from "./LoadingIndicator";

interface FormProps {
    route: string;
    method: "login" | "register";
}

const Form: React.FC<FormProps> = ({ route, method }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : "Error en la autenticación");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white text-black flex flex-col p-6 rounded-lg shadow-md w-96">
            <h1>{name}</h1>
            <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                placeholder="Username"
            />
            <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300" type="submit">
                {name}
            </button>
        </form>
    );
};

export default Form;