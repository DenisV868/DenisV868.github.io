import React from "react";
import {useNavigate} from "react-router-dom";

// @ts-ignore
const ProductPreview = ({name, img,price,idP}) => {

    const navigate = useNavigate();
    function handleBtnClick ():void{
        navigate(`/product/${name}/${encodeURIComponent(img)}/${price}`);
    }

    return <div className={"container-for-product"}>
        <p style={{fontSize:"10px"}}>{name}</p>
        <img src={img} alt=""/>
        <p className={"description"}>sansfknfnfnfksnfkwkndwjkfnwfknkwfnf
            wmnfkwfnnkd sjfvhbjfdb
            igvfsdhjdzfhbfdhvsfegyvwer</p>
        <p style={{fontSize:"8px"}}>Cena: {price}</p>
        <button style={{ color:"white"}} onClick={handleBtnClick} id={idP}>Buy</button>
    </div>

}

export default ProductPreview;