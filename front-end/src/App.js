import Login  from './Components/Login/Login';
import Sidebar  from './Components/Sidebar/Sidebar';
import Employees from './Components/Employees/Employees'
import Card from './Components/Card/Card'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <h1 className="">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login/>} />
          <Route path="/Sidebar" element={<Sidebar/>} />
          <Route path="/Employe" element={<Employees/>} />
          <Route path="/Statistique" element={<Card/>} />
        </Routes>
      </BrowserRouter>
    </h1>
    </div>
  );
}

export default App;
