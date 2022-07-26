import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductList from "./components/product";
import AddProduct from "./components/addproduct";
import EditProduct from "./components/editproduct";
import Login from "./components/login";
import Signup from "./components/signup";
import NotFound from "./components/index";
import Detail from "./components/detail";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
      console.log(user);
    }
  }, []);

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("token"));
  };


  
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };




  return (
    <div>
      <nav class="navbar is-white has-shadow">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="https://i.imgur.com/WP8wDHr.png" alt="logo" />
          </a>
          <a class="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div class="navbar-menu" id="nav-links">
        <div class="navbar-item">
              {currentUser ? (
                <button class="button is-small is-danger" onClick={logout}>
                  Logout
                </button>
              ) : (
                <p>
                  <Link to={"/users/login"}>
                    <button class="button is-small is-primary">Login</button>{" "}
                  </Link>
                  <Link to={"/users/signup"}>
                    <button class="button is-small">Sign up</button>{" "}
                  </Link>
                </p>
              )}
            </div>
          </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route exact path="/users/login" element={<Login />} />
        <Route exact path="/users/signup" element={<Signup />} />
        <Route exact path={`/products/add`} element={<AddProduct />} />
        <Route exact path="/products/:id" element={<EditProduct />} />
        <Route exact path="/products/detail/:id" element={<Detail />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>

      <footer class="footer">
        <div class="content has-text-centered is-small">
          <p>
            Web ini dikembangkan hanya untuk contoh bentuk frontend dari
            Shopuwuh API
          </p>
          <p>
            <strong>Shopuwuh</strong> by <a href="/">mzhll</a> @2022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
