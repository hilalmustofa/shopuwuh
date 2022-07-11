import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import myAxios from "./myAxios";

const AddProduct = () => {
  const [newUser, setNewAuthor] = useState({
    name: "",
    price: "",
    picture: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newUser.name);
    formData.append("price", newUser.price);
    formData.append("picture", newUser.picture);

    myAxios
      .post("/products", formData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewAuthor({ ...newUser, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewAuthor({ ...newUser, picture: e.target.files[0].name });
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
                value={newUser.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <label className="label">Price</label>
          <div className="control">
            <input
              type="input"
              className="input"
              placeholder="Price"
              name="price"
              value={newUser.price}
              onChange={handleChange}
            />
          </div>

          <div className="column mt-3 is-centered">
            <div class="file is-centered">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  onChange={handlePhoto}
                  style={{ display: "none" }}
                />
                <span class="file-cta">
                  <i class="fas fa-upload"></i>
                  <span class="file-label">Choose a photo...</span>
                </span>
              </label>
            </div>
          </div>

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
