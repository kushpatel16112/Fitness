import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home";
import About from './components/about';
import Contact from './components/contact';
import Challenges from './components/challenges';
import Programm from './components/programm';
import Sub from './components/subscribe';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/program' element={<Programm />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/challenges' element={<Challenges />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/subscribe' element={<Sub />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
