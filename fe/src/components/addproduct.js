import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import myAxios from "./myAxios"; 
import baseUrl from "./baseurl"; 
import Loading from "./loading";
 
const AddProduct = () => { 
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    price: "", 
    description: "", 
    picture: "" 
  }); 

  useEffect(() => {
    setTimeout(() => setLoading(true), 650)

  }, []);

  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(undefined);
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    const formData = new FormData(); 
    formData.append("name", newProduct.name); 
    formData.append("price", newProduct.price); 
    formData.append("description", newProduct.description); 
    formData.append("picture", newProduct.picture); 
 
    myAxios 
      .post(baseUrl + "/api/products", formData) 
      .then((res) => { 
        setSuccess(res.data.message)
        console.log(res); 
        setTimeout(() => {
          navigate("/");
        }, 2000); 
      }) 
      .catch((error) => { 
        setError(error.response.data.errors); 
      }); 
  }; 
 
  const handleChange = (e) => { 
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value }); 
  }; 
 
  const handlePhoto = (e) => { 
    setNewProduct({ ...newProduct, picture: e.target.files[0] }); 
  }; 
 
  return ( 
    <div> 
      <section class="section is-mobile"> 
        <div className="columns mt-0 is-mobile is-centered"> 
        {success && <div class="notification is-primary is-light"> {success}</div>}
          {error && <div class="notification is-danger is-light"> {error}</div>} 
        </div> 
 
        <div className="columns mt-2 is-centered"> 
        {loading ? ( 
          <div className="columns is-mobile is-centered"> 
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
                  /> 
                </div> 
              </div> 
              <label className="label">Decription</label> 
              <div className="control"> 
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Decription" 
                  name="description" 
                  value={newProduct.description} 
                  onChange={handleChange} 
                /> 
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
                /> 
              </div> 
              <div className="columns mt-3 is-centered"> 
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
              <div className="columns is-mobile mt-4 is-centered"> 
                <button type="submit" className="button is-success"> 
                  Submit 
                </button> 
              </div> 
            </form> 
          </div> 
          ) : (<Loading loading={loading} /> )}
        </div> 
      </section> 
    </div> 
  ); 
}; 
 
export default AddProduct;