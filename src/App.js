import React from 'react';
import Login from './components/front-end/login';
import Admin from './components/front-end/admin';
import CreateData from './components/front-end/create';
import UpdateData from './components/front-end/update';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Router>
       <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/create" element={<CreateData/>} />
        <Route path="/update" element={<UpdateData/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
