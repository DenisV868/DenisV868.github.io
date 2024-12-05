import React from 'react';
import './App.css';
import ProductPreview from "./ProductPreview";

function App() {
    function getUl() {
        let lis:any = []
        for(let i:number = 0; i < 5; i++){
                lis.append(<ProductPreview />)
        }
        return <ul>
            {lis.map((item:any) => <li>{item}</li>)}
        </ul>
    }

    return (
    <div className="App">
        <header className="App-header">
            <p>
                React lab
            </p>
        </header>
        {getUl()}
    </div>
  );
}

export default App;
