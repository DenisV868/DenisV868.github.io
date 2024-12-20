import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

const Opener = (to:string) => {
    let navigate = useNavigate()
    return () => {
        navigate(to);
    };
}


const Settings = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 });


    // Handle the dragging start
    const gridSize = 20; // Define the snap grid size

    const handleDragStart = (e) => {
        const rect = e.target.getBoundingClientRect();
        e.dataTransfer.setData("startX", e.clientX - rect.left);
        e.dataTransfer.setData("startY", e.clientY - rect.top);
    };

    const handleDrop = (e) => {
        const startX = e.dataTransfer.getData("startX");
        const startY = e.dataTransfer.getData("startY");

        // Calculate new position
        let x = e.clientX - startX;
        let y = e.clientY - startY;

        // Snap to nearest grid position
        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        setPosition({ x, y });
    };

    return (
        <div className={"settings-app"} draggable onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={(e:any) => e.preventDefault()} style={{ position: 'absolute',left: position.x, top: position.y,cursor: 'grab'}}>
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