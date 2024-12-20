import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
// @ts-ignore
import Clock from "./Clock.tsx";
//@ts-ignore
import Menu from "./Menu.tsx";
//@ts-ignore
import Settings from "./Settings.tsx";
//@ts-ignore
import Home from "./Home.tsx";


const getDate = ():string =>{
    let date:Date = new Date();
    let day:number = date.getDate();
    let month:number = date.getMonth()+1;
    let year:number = date.getFullYear();
    return ` | ${day}.${month}.${year}`;
}

function App() {

    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    const hoverHandler = () => {
        setHovered(true);
    }

    const mouseOf = () => {
        if(!clicked) {
            setHovered(false);
        }
    }

    const clickHandler = () => {
        if(!clicked){
            setClicked(true);
        }
        if(clicked){
            setClicked(false);
        }
    }


    return (
    <Router>
        <div className="App">
            <header className="App-header">

            </header>

            <main className="main-content">
                <Routes>
                    <Route path="/" element={Home} />
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </main>


            <footer className="panel-background">
                <div className="panel">
                    <p className="date">
                        {getDate()}
                    </p>
                    <Clock/>
                    <p className="menu" onMouseOver={hoverHandler} onMouseOut={mouseOf} onClick={clickHandler}>
                        <img src="/icons8-react-30.png" alt="menu"/>
                    </p>
                    {hovered && <Menu />}
                </div>
            </footer>
        </div>
    </Router>
    );
}

export default App;
