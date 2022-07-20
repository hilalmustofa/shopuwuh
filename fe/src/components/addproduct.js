import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import myAxios from "./myAxios";
import baseUrl from "./baseurl";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    picture: ""
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("picture", newProduct.picture);

    myAxios
      .post(baseUrl+"/api/products", formData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.error.message)
        setError(error.response.data.error.message);
      });
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewProduct({ ...newProduct, picture: e.target.files[0] });
  };

  return (
    <div className="column mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label className="label">Price</label>
          <div className="control">
            <input
              type="number"
              className="input"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="column mt-3 is-centered">
            <div class="file is-centered">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  onChange={handlePhoto}
                  required
                />
                <span class="file-cta">
                  <i class="fas fa-upload"></i>
                  <span class="file-label">Choose a photo...</span>
                </span>
              </label>
            </div>
          </div>
          { error && <p class="help is-danger"> {error} </p>}

          <div className="column">
            <div className="field">
              <button type="submit" className="button is-success">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
