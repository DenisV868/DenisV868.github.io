import React, {useState} from "react";
//@ts-ignore
import NameOfApp from "./NameOfApp.tsx";

let apps:string[] = ["settings"];
const  Menu = () =>{

    const [hovered2, setHovered2] = useState(false);

    const hoverHandler2 = () => {

        setHovered2(true);

    }

    const mouseOf2 = () => {

        setHovered2(false);

    }


    return(<p className={"menu-menu"}>

        <p className="settings" onMouseOver={hoverHandler2} onMouseOut={mouseOf2}>
            settings
        </p>


        {hovered2 && <NameOfApp name={apps[0]}/>}
    </p>)
}

export default Menu;