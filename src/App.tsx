import React from 'react';
import './App.css';
import TestAuto from "./TestAuto";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; // Import necessary components
import Product from "./Product";


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
                </Routes>
            </div>
            <footer>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>

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
