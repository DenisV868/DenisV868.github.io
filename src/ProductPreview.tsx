import React from "react";

// @ts-ignore
const ProductPreview = ({name, img,price}) => {

    return <div className={"container-for-product"}>
        <p style={{fontSize:"10px"}}>{name}</p>
        <img src={img} alt=""/>
        <p className={"description"}>sansfknfnfnfksnfkwkndwjkfnwfknkwfnf
            wmnfkwfnnkd sjfvhbjfdb
            igvfsdhjdzfhbfdhvsfegyvwer</p>
        <p style={{fontSize:"8px"}}>Cena: {price}</p>
        <button style={{ color:"white"}}>Buy</button>
    </div>

}

export default ProductPreview;