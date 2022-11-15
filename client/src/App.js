import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Project from './pages/Project';

function App() {
  return ( 
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/project/id=:id' element={<Project/>} />
        <Route path="*" element={<h1>404: Not Found</h1>} />

      </Routes>

    </>
  );
}

export default App;
