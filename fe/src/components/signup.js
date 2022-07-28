import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "./baseurl";
import Loading from "./loading";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(undefined);

  useEffect(() => {
    setTimeout(() => setLoading(true), 650)
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();
    const response = await axios.post(baseUrl+"/api/users/signup", {
      email,
      password,
    });
    const data = await response.data;
    if (data) {
      navigate("/users/login");
      window.location.reload();
    }
  };

  return (
    <div>
      {loading ? ( 
<section class="section is-mobile">
    <div className="columns is-mobile mt-0 is-centered">
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
                required
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
                required
              />
            </div>
          </div>
          <div className="columns is-mobile mt-4 is-centered">
          <div className="field has-text-centered">
            <button type="submit" className="button is-success">
              Signup
            </button>
          </div>
          </div>
        </form>
      </div>
      </section>
      ) : (<Loading loading={loading} /> )}
    </div>
  );
};

export default Signup;
