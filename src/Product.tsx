import React from "react";
import {useParams} from "react-router-dom";


const Product = () => {

    const { name,img,price} = useParams()

    if (img != null) {
        const decodedImg = decodeURIComponent(img);

        return<div className = "site-product">
            <div className="product">
                <h1>{name}</h1>
                <img src={decodedImg} alt="" className="productImg" />
                <p>{price}</p>
            </div>
        </div>
    }
    return <h1>ERROR</h1>
}

export default Product