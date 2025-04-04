import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import api from "../api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../api/Constants";

interface ProtectedRoutesProps {
  children: ReactNode; // Especifica el tipo de los hijos como ReactNode
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Tipo boolean o null

  useEffect(() => {
    auth().catch(() => setIsAuthenticated(false));
  }, []);

  const refreshToken = async (): Promise<void> => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const res = await api.post("/refresh-token", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthenticated(false);
    }
  };

  const auth = async (): Promise<void> => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration && tokenExpiration < now) {
        await refreshToken();
      } else if (tokenExpiration) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/ola" />;
};

export default ProtectedRoutes;