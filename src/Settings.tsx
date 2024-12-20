import React from "react";

import {useNavigate} from "react-router-dom";

const Opener = (to:string) => {
    let navigate = useNavigate()
    return () => {
        navigate(to);
    };
}


const Settings = () => {


    return (
        <div className={"settings-app"}>
            <div className={"line"}><img src="/icons8-settings-16.png" alt="" className={"logo"}/>
                <button className={"minimize"}>-</button>
                <button className={"square"}><img src="/icons8-square-30.png" alt=""/></button>
                <button onClick={Opener("/")} className={"cross"}>X</button>
            </div>
            <div className={"settings-menu"}>
                <div className={"username"}>Denis Vimr</div>
            </div>
        </div>)

}

export default Settings;