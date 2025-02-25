import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Opener = (to: string) => {
    let navigate = useNavigate();
    return () => {
        navigate(to);
    };
};



const SettingsBg = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false); // State to track dragging
    const [color, setColor] = useState<string>(() => {
        const storedColor = localStorage.getItem("wallpapers")
        return storedColor ? storedColor : "navy"
    });
    const blueRef = useRef(null);
    const blackRef = useRef(null);


    const gridSize = 1; // Define grid size (e.g., 100px)

    const handleDragStart = (e:any) => {
        const rect = e.target.getBoundingClientRect();
        e.dataTransfer.setData("startX", e.clientX - rect.left);
        e.dataTransfer.setData("startY", e.clientY - rect.top);
    };

    const handleDrop = (e:any) => {
        const startX = e.dataTransfer.getData("startX");
        const startY = e.dataTransfer.getData("startY");

        let x = e.clientX - startX;
        let y = e.clientY - startY;

        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        const footer = document.querySelector("footer");
        const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;

        const divHeight = e.target.offsetHeight;

        if (y + divHeight > footerTop) {
            y = footerTop - divHeight;
        }

        setPosition({ x, y });
        setDragging(false);
    };

    useEffect(() => {
        const handleDragOver = (e:any) => {
            e.preventDefault();
        };

        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);

        return () => {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("drop", handleDrop);
        };
    }, []);

    const changeColor = (newColor: "navy" | "black") => {
        //@ts-ignore
        setColor(newColor)
    }

    useEffect(()=>{

        let body = document.getElementsByTagName("body")[0];
        //@ts-ignore
        body.style.backgroundColor = color

        //@ts-ignore
        localStorage.setItem("wallpapers",color)
        //@ts-ignore
        if (color ===  "navy" && blueRef.current){
            //@ts-ignore
            blueRef.current.focus()
        }
        //@ts-ignore
        if (color ===  "black" && blackRef.current){
            //@ts-ignore
            blackRef.current.focus()
        }

    },[color])

    return (
        <div className="settings-app-div">
            <div
                className="settings-app"
                draggable
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onDragOver={(e: any) => e.preventDefault()}
                style={{
                    position: "absolute",
                    left: position.x,
                    top: position.y,
                    cursor: dragging ? "grabbing" : "grab",
                }}
            >
                <div className="line">
                    <img src="/icons8-settings-16.png" alt="" className="logo" />
                    <button className="minimize">-</button>
                    <button className="square">
                        <img src="/icons8-square-30.png" alt="" />
                    </button>
                    <button onClick={Opener("/")} className="cross">
                        X
                    </button>
                </div>
                <div className="settings-menu">
                    <div className="profile">
                        <div className="username">Denis Vimr</div>
                    </div>

                    <div className="info" onClick={Opener("/settings")}>
                        <div className="sys-info-bookmark" onClick={Opener("/settings")}>
                            Info
                        </div>
                    </div>
                    <div className="home">
                        <div className="home-bookmark">Wallpapers</div>
                    </div>
                </div>
                <div className="system-info">
                    <h1>Wallpapers</h1>
                </div>

                <div
                    className="blue"
                    onClick={()=>changeColor("navy")}
                    ref={blueRef}
                    tabIndex= {0}
                ></div>
                <div
                    className="black"
                    onClick={()=>changeColor("black")}
                    ref={blackRef}
                    tabIndex= {1}
                ></div>
            </div>
            <div className="icon-on-panel">
                <img src="/icons8-settings-30.png" alt="" />
            </div>
        </div>
    );
};

export default SettingsBg;
