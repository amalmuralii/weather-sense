import { useState } from "react";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <button>Login</button>
    </div>
  );
};

export default LoginForm;
