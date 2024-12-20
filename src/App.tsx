import React, {useState} from "react";
import './App.css';
// @ts-ignore
import Clock from "./Clock.tsx";
//@ts-ignore
import Menu from "./Menu.tsx";
//@ts-ignore
import Window from "./Window.tsx";
//@ts-ignore
import Settings from "./Settings.tsx";


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
    const [appClicked, setAppClicked] = useState(false);

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

    const clickHandler2 = () => {
        if(!appClicked) {
            setAppClicked(true);
            Window(Settings())
        }else{
            setAppClicked(false);
        }
    }


    return (
    <div className="App">
      <header className="App-header">

      </header>

      <footer className="panel-background">
            <div className="panel">
                <p className="date">
                    {getDate()}
                </p>
                <Clock />
                <p className="menu" onMouseOver={hoverHandler} onMouseOut={mouseOf} onClick={clickHandler}>
                    <img src="/icons8-react-30.png" alt="menu" />
                </p>
                {hovered && <Menu handlerClick={clickHandler2} a={appClicked}/>}
            </div>
      </footer>
    </div>
  );
}

export default App;
