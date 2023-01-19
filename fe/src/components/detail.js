import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import baseUrl from "./baseurl";
import Loading from "./loading";

const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: 'http://akuntesterwork-001-site1.ctempurl.com/api',
});
const Detail = () => {
  const [products, setProduct] = useState([]);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  
  

  useEffect(() => {
    setTimeout(() => setLoading(true), 650)
  }, []);

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
    const response = await api(baseUrl + `/api/products/${id}`);
    setProduct(response.data.product);
  };

  return (
    <div>
      <div class="section pt-4 pb-0">
        <nav class="breadcrumb has-arrow-separator">
          <ul class="is-size-6 container">
            <li>
              <a href="/" class="has-text-grey">
                All Products
              </a>
            </li>
            <li class="is-active">
              <a href="#">Product</a>
            </li>
          </ul>
        </nav>
      </div>

      {loading ? ( 
      <section class="section pt-0 pb-0">
        <div class="container">
          <div class="columns is-vcentered pt-1 is-multiline">
            <div class="column is-6-tablet is-3-desktop">
              <h1 class="is-size-3-mobile is-size-2-desktop title mb-2">
                {products.name}
              </h1>
              <p>{products.description}</p>
            </div>
            <div class="column is-12-mobile is-6-tablet is-5-desktop has-text-centered">
              <img src={products.picture} alt="gambar" class="px-6" />
            </div>
            <div class="column is-12-mobile is-12-tablet is-4-desktop">
              <h6 class="title is-6 mb-1">{products.price}</h6>
              {currentUser && (
                <div>
                  <div class="is-size-10 mb-1">
                    Please choose desired quantity
                  </div>
                  <form>
                    <div class="control mb-3">
                      <div class="select is-dark">
                        <select>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                    </div>
                    <button class="button is-primary is-primary">Order</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
   ) : (<Loading loading={loading} /> )}
      <div class="section pt-4 pb-0 pr-6">
      {loading ? ( 
        <div class="column pl-0 pt-0 pr-8 is-6-tablet is--desktop">
          <h1 class="is-size-6-mobile is-size-5-tablet is-size-8-desktop title mb-0 mt-3">
            Product Description
          </h1>
          <h1 class="is-size-7-mobile is-size-7-tablet is-size-7-desktop subtitle mt-2 mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
            reprehenderit voluptates! Quisquam dolores distinctio minima
            eligendi, sint enim quaerat. Totam eaque eligendi quis, itaque
            beatae id sit fuga voluptatibus a autem debitis sequi, officiis
            dolores corporis! Necessitatibus, libero voluptate? Fuga, natus
            iusto! Perspiciatis iure officiis rerum, illo temporibus iusto
            voluptatum.
          </h1>
          <h1 class="is-size-6-mobile is-size-5-tablet is-size-8-desktop title mb-0 mt-3">
            Delivery Information
          </h1>
          <span class="icon is-large pr-2">
            <img src={require("../assets/jne.png")} />
          </span>
          <span class="icon is-large pr-2">
            <img src={require("../assets/sicepat.png")} />
          </span>
          <span class="icon is-large pr-2">
            <img src={require("../assets/gojek.png")} />
          </span>
          <span class="icon is-large pr-2">
            <img src={require("../assets/grab.png")} />
          </span>
          <span class="icon is-large pr-2">
            <img src={require("../assets/fedex.png")} />
          </span>
          <span class="icon is-medium pr-2">
            <img src={require("../assets/dagadu.jpg")} />
          </span>
          <span class="icon is-large">
            <img src={require("../assets/trivago.png")} />
          </span>
        </div>
         ) : ("")}
      </div>
    
      </div>

  );
};
export default Detail;
