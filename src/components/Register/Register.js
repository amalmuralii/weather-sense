import React from "react";
import { useState } from "react";

const Register = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            required
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            type="password"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Location">Location:</label>
          <input
            id="Location"
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </form>
      <button>Login</button>
    </div>
  );
};

export default Register;
