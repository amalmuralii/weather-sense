import LoginForm from "../../components/Login/LoginForm";
import Register from "../../components/Register/Register";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./main.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContexts";
import Homepage from "../Home/Homepage";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setRedirect("/dashboard");
    }
  }, [isAuthenticated]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="main">
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Main;
