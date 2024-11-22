//import logo from './logo.svg';
import './App.css';
import {createRef} from "react";
//import tech from "./tech";
//import Tech from "./tech";
//import Numbers from "./tech";
//import Array from "./array";
//import Adding from "./adding";
//let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
//;
//let hi = "hi"
/*import html from './html_logo.png';
import css from './css_logo.png';
import js from './js_logo.png';
import react from './react_logo.png';

let techs = {
    "html": html,
    "css": css,
    "js": js,
    "react": react,
}*/
import List from "./Tech";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
let dateFormat = day + '.' + month + '.' + year;


const InputVal = ({inputRef,dateInputRef},) => {

    return(<div>
                <input type="text" placeholder={"todo here"} ref={inputRef}/>
                < input type = "text" placeholder={"date of completion here"} ref = {dateInputRef}/>
           </div>
    )

}

function App() {

    const inputRef = createRef(null);
    const dateInputRef = createRef(null);

    return (
    <div className="App">
      <header className="App-header">
        <p>React lab</p>
      </header>
        <p>Date: {dateFormat}</p>
        <InputVal inputRef={inputRef} dateInputRef={dateInputRef}/>
        <List inputRef={inputRef} dateInputRef={dateInputRef}/>
    </div>
  );
}

export default App;
