import React, { useState, useEffect } from "react";
import axios from "axios";
import myAxios from "./myAxios";
import { Link } from "react-router-dom";


const token = localStorage.getItem('token');

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

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
    const response = await axios.get("/products");
    setProduct(response.data.products);
  };


  const deleteProduct = async (id) => {
    try {
      await myAxios.delete(`/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section class="section">
        <div class="container">
          <h3 class="title has-text-centered is-size-4">All Products</h3>
          <div class=" column is-centered ">
            {products?.map((product) => (
              <div class="column is-10-mobile is-3-tablet is-3-desktop is-variable">
                <div class="card">
                  <div class="card-image">
                    <img src={product.picture} alt="gambar"></img>
                  </div>
                  <div class="card-content">
                    <p>{product.price}</p>
                    <p class="title is-size-5 centered">{product.name}</p>
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
                    </footer>
                  )}
                </div>
              </div>
            ))}
          </div>

          {currentUser && (
            <div class="column is-centered">
              <Link to={`/products/add`} className="button is-success">
                Add New
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default ProductList;
