import React from "react";
import {useParams} from "react-router-dom";


const Product = () => {

    const { name,img,price,description} = useParams()

    if (img != null) {
        const decodedImg = decodeURIComponent(img);

        return<article className = "site-product">
            <div className="product">
                <h1>{name}</h1>
                <img src={decodedImg} alt="" className="productImg" />
                <p className={"desc"}>{description}</p>
                <p className={"price"}>{price}</p><button><img className="addCImg" src="/add-to-cart.png" alt="" style={{width:"30px",height:"30px",position:"relative", right:"2px", bottom:"0px", top:"1px"}}/></button>
            </div>
        </article>
    }
    return <h1>ERROR</h1>
}

export default Product