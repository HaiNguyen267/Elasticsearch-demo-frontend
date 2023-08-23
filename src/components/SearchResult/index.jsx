import React, { useEffect, useState } from 'react';
import './style.scss';
import { truncateString, formatPrice } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
export default function ({ id, name, imageUrl, price, description, descriptionMatchHighlight: descriptionMatchHighlight }) {

    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/product/${id}`);
    }   

        // if there is a match highlight, use it, otherwise use the original description
    const decriptionContent = descriptionMatchHighlight ? truncateString(descriptionMatchHighlight, 150)
        : truncateString(description, 150)


    return (
        <div className="SearchResult" onClick={handleProductClick}>

            <div className="left">
                <div className="product_image_container">
                    <img src={imageUrl} alt={name} />
                </div>
                <div className="product_info_container">
                    <div className="product_name">{truncateString(name, 100)}</div>
                    <div className="product_price">{formatPrice(price)}</div>
                </div>
            </div>
            <div className="right">
                <div className="product_description" >

                    <p
                        dangerouslySetInnerHTML={{ __html: decriptionContent} }></p>

                    
                </div>
            </div>
        </div>
    )
}