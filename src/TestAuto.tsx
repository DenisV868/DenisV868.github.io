import React from "react";
import ProductPreview from "./ProductPreview";
const TestAuto = () => {
    let lis:any = []
    for(let i:number = 0; i < 5; i++){
        lis.push(<ProductPreview />)
    }
    return <ul>
        {lis.map((item:any) => <li>{item}</li>)}
    </ul>
}

export default TestAuto
