import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [productProfile, setProductProfile] = useState([])

  useEffect(() => {
    getProductProfile()
  }, [])

  const getProductProfile = async () => {
    const result = await axios.get("http://localhost:4001/products")
    setProductProfile(result.data.data)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`)
    const productDelete = productProfile.filter((item) => {
      return item.id !== id;
    });
    setProductProfile(productDelete);

  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {productProfile.map((product) => {
        return(
        <div className="product-list" key={product.id}>
        <div className="product">
          <div className="product-preview">
            <img
              src={product.image}
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: {product.name}</h1>
            <h2>Product price: {product.price} Baht</h2>
            <p>Product description: {product.description}</p>
          </div>

          <button className="delete-button" onClick={() => handleDelete(product.id)}>x</button>
        </div>
      </div>
        )
      })}
    </div>
  );
}

export default App;
