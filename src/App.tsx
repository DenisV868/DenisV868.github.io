import React from 'react';
import './App.css';
import TestAuto from "./TestAuto";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; // Import necessary components
import Product from "./Product";
import About from "./About";
import OptionsOfDelivery from "./OptionsOfDelivery";

let cart:any[] = [];

function App() {



    // @ts-ignore
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <p>
                        FG3
                    </p>
                    <div className={"header-div"}>
                        <div>
                            <Link to="/" className="home">Home</Link>
                        </div>
                        <div>
                            <Link to="/about" className="about">About</Link>
                        </div>
                    </div>

                </header>
                <Routes>
                    <Route path="/" element={<TestAuto/>}/>
                    <Route path="/product/:name/:img/:price/:description" element={<Product cart={cart}/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/delivery" element={<OptionsOfDelivery />}></Route>
                </Routes>
            </div>
            <footer>
                <div>
                    <div>Shopping

                    <div>
                        <Link to="/delivery" style={{textDecoration:"none", color:"grey"}}>Options of delivery</Link>
                    </div>

                    </div>
                </div>
            </footer>
        </Router>
    );
}

export default App;
