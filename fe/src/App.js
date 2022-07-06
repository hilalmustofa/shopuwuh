import {BrowserRouter, Routes, Route} from "react-router-dom";
//import Login from "./components/login";
import ProductList from "./components/product";
import AddProduct from "./components/addproduct";
import EditProduct from "./components/editproduct";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/products/add" element={<AddProduct/>}/>
        <Route path="/products/:id" element={<EditProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;