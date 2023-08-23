import React, { useEffect, useState } from "react";
import Product from "../../components/Product"; 
import { TypeAnimation } from 'react-type-animation';
import './style.scss';
import { formatPrice } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {

    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    
    const productId = location.pathname.split("/")[2];
    console.log("product is ", product);

    useEffect(() => {
        fetchProductById(productId);
    }, []);

    const fetchProductById = async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`);
        console.log(response.data.data);
        if (response.data.code === 200) {
            setProduct(response.data.data);
        } else {
            console.log(response.data.message);
        }
    }


    const handleBack = () => {
        navigate("/");
    }
    
    if (!product) {
        return (
            <p>Fetching for product</p>
        )
    }
    

    return (
        <div className="ProductDetail">
            <div className="arrow-back"><i class="fa-solid fa-arrow-left" onClick={handleBack}></i></div>

            <div className="product_info_container">
                <div className="left">
                    <img src={product.imageUrl} alt="" />
                </div>
                <div className="right">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <p className="product_description">{product.description}</p>
                </div>
            </div>

        </div>
    )
}