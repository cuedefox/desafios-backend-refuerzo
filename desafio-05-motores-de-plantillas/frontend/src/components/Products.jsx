import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const Products = () => {
    const [products, setProducts] = useState();
    useEffect(() => {
        axios.get('http://localhost:8080/products')
        .then((response) => {
          setProducts(response.data);
        })
        .catch(err => {
            alert(err);
        })
      }, []);
    return <>
    <h2>Productos</h2>
    {
        products ? products.map(item => {return <ProductItem item={item} />}) : <h2>No hay productos</h2>
    }
    <Link to={"/"}><button>Volver a formulario</button></Link>
    </>
}

export default Products;