import React, { useState, useEffect } from "react";
import axios from "axios";
import myAxios from "./myAxios";
import { Link } from "react-router-dom";
import baseUrl from "./baseurl";


const token = localStorage.getItem('token');

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const getCurrentUser = () => {
    return JSON.parse(token);
  };

  const getProducts = async () => {
    const response = await axios.get(baseUrl + "/api/products");
    setProduct(response.data.products);
  };


  const deleteProduct = async (id) => {
    try {
      await myAxios.delete(baseUrl + `/api/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error.response.data.error.message)
      setError(error.response.data.error.message);
    }
  };

  return (
    <section class="section is-mobile">
      <div class="container mt-2 is-mobile">
        <h3 class="title has-text-centered is-size-4">All Products</h3>
        <div class="columns is-centered is-multiline">
          {products?.map((product) => (
            <div class="columns is-8-mobile is-2-tablet is-2-desktop">
              <div class="card">
                <div class="card-image">
                  <Link
                    to={`/products/detail/${product.id}`}
                    className=""
                  >
                    <img src={product.picture} alt="gambar"></img>
                  </Link>
                </div>
                <div class="card-content">
                  <p>{product.price}</p>
                  <Link
                    to={`/products/detail/${product.id}`}
                    className="title is-size-5 centered">{product.name}</Link>
                </div>
                {currentUser && (
                  <footer class="card-footer">
                    <p class="card-footer-item">
                      <Link
                        to={`/products/${product.id}`}
                        className="button is-small is-primary mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="button is-small is-danger"
                      >
                        Delete
                      </button>
                    </p>
                    {error && <p class="help is-danger"> {error} </p>}
                  </footer>
                )}
              </div>
            </div>
          ))}
        </div>

        {currentUser && (
          <div class="columns is-mobile mt-6 is-centered">
            <Link to={`/products/add`} className="button is-success">
              Add New
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default ProductList;
