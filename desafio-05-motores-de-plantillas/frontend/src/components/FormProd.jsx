import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FormProd = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        thumbnail: ''
    })

    const handleInputChange = (event) => {
        console.log(formValues)
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const post = formValues;
        try {
          const res = await axios.post('http://localhost:8080/products', post)
          setFormValues({
            name: '',
            price: '',
            thumbnail: ''
        })
        alert('producto enviado')
          console.log(res.data)
        } catch (e) {
          alert(e)
        }
    }

    return <div className="form-container">
        <h1>Ingrese su producto</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={handleInputChange} value={formValues.name} />
            <input type="number" name="price" onChange={handleInputChange} value={formValues.price} />
            <input type="text" name="thumbnail" onChange={handleInputChange} value={formValues.thumbnail} />
            <input type="submit" value="Enviar" />
        </form>
        <Link to={"/products"}>
            <button>Ir a productos</button>
        </Link>
    </div>
}

export default FormProd;