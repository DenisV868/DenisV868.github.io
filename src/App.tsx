import React from 'react';
import './App.css';
import TestAuto from "./TestAuto";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; // Import necessary components
import Product from "./Product";
import About from "./About";


function App() {



    // @ts-ignore
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <p>
                        React lab
                    </p>
                </header>
                <Routes>
                    <Route path="/" element={<TestAuto/>}/>
                    <Route path="/product/:name/:img/:price/:description" element={<Product/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </div>
            <footer>
                <div>
                    <ul>
                        <li>
                            <Link to="/" className="home">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="home">About</Link>
                        </li>
                        <li>

                        </li>
                    </ul>
                </div>
            </footer>
        </Router>
    );
}

export default App;
