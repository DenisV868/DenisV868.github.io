import React from 'react';
import './App.css';
import TestAuto from "./TestAuto";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; // Import necessary components
import Product from "./Product";
import About from "./About";

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
                </header>
                <Routes>
                    <Route path="/" element={<TestAuto/>}/>
                    <Route path="/product/:name/:img/:price/:description" element={<Product cart={cart}/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </div>
            <footer>
                <div>

                    <div>
                        <Link to="/" className="home">Home</Link>
                    </div>
                    <div>
                        <Link to="/about" className="about">About</Link>
                    </div>
                    <div>

                    </div>
                    <ul>Shopping

                        <li>

                        </li>

                    </ul>
                </div>
            </footer>
        </Router>
    );
}

export default App;
