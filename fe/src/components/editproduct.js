import React, { useState } from "react";
import myAxios from "./myAxios";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "./baseurl";

const EditProduct = () => {
  const params = useParams();
  const [name, setName] = useState(params.name ?? "");
  const [description, setDescription] = useState(params.description ?? "");
  const [price, setPrice] = useState(params.price);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await myAxios.put(baseUrl+`/api/products/${id}`, {
        name,
        description,
        price
      });
      navigate("/");
    } catch (error) {
        setError(error.response.data.errors);
    }
  };

  return (
    <div>
      <section class="section is-mobile">
    <div className="columns mt-0 is-mobile is-centered">
    { error && <div class="notification is-danger is-light"> {error}</div>} 
    </div>
   
    <div className="columns mt-2 is-centered">
      <div className="columns is-mobile is-centered">    
        <form onSubmit={updateProduct}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
          </div>
          <div className="columns is-mobile mt-4 is-centered">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
        </form>
      </div>
    </div>
    </section>
</div>
  );
};

export default EditProduct;
