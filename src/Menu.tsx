import React from "react";


let apps:string[] = ["shutdown", "reboot", "settings"];
let appIcons:string[] = ["/switch.png","/interface.png","/icons8-settings-30.png"];

const  Menu = () =>{

    const handleShutdown = () => {

        window.close()//browser will not do it

    }

    const handleReboot = () => {

        window.location.reload()//browser will not do it

    }


    return(<p className={"menu-menu"}>
        <div className={"item-1"}>
            <p className="settings">
                <img src={appIcons[2]} alt={apps[2]}/>
            </p>
        </div>
        <div className={"item-2"}>
            <p className="reboot" onClick={handleReboot}>
                <img src={appIcons[1]} alt={apps[1]}/>
            </p>
        </div>
        <div className={"item-3"}>
            <p className="shutdown" onClick={handleShutdown}>
                <img src= {appIcons[0]} alt= {apps[0]} />
            </p>
        </div>

    </p>)
}

export default Menu;