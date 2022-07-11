import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    const response = await axios.post("/users/login", {
      email,
      password,
    });
    const data = await response.data;
    if (data) {
      navigate("/");
      localStorage.setItem('token', JSON.stringify(data.token));
      window.location.reload();
    } else {
      console.log();
    }
    navigate("/");
    console.log(response);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="field has-text-centered">
            <button type="submit" className="button is-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
