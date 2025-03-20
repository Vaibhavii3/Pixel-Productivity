import { useState } from "react";
import { login } from "../Services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const data = await login(email, password);
        console.log("Login response:", data);

        if (data.token) {
            console.log("Token received, navigating to home...");
            localStorage.setItem("token", data.token);  // Save token for authentication
            navigate("/home");  // Navigate immediately
        } else {
            alert("Login failed, please try again.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
