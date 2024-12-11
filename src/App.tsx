import React from 'react';
import './App.css';
import TestAuto from "./TestAuto";
import { BrowserRouter as  Router,Routes, Route } from 'react-router-dom'; // Import necessary components
import Product from "./Product";

function App() {

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
                    not yet finished
                </div>
            </footer>
        </Router>
    );
}

export default App;
