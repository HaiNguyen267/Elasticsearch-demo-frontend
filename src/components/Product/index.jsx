import React, { useEffect, useState } from 'react';
import './style.scss';
import { truncateString, formatPrice } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
export default function ({ id, name, imageUrl, price }) {

    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/product/${id}`);
    }
    return (
        <div className="Product" onClick={handleProductClick}>
            <div className="product_image_container">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="product_info">
                <div className="product_name">{truncateString(name, 100)}</div>
                <div className="product_price">{formatPrice(price)}</div>
            </div>
        </div>
    )
}