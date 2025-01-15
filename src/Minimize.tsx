import React from "react";
import {useNavigate} from "react-router-dom";

const Opener = (to:string) => {

    let navigate  = useNavigate()
    return()=>{
        navigate(to);
    }

}

const Op = (top) => {

    let navigateTop = useNavigate();
    return ()=>{
        navigateTop(top);
    }

}

const Minimize = (from,icon,topP) => {

    Op(topP);

    return (<div className={"minimized-icon"}>
        <img src={icon} alt="" onClick={Opener(from)}/>
    </div>)

}

export default Minimize;
