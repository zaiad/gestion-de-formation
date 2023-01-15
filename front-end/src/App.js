import Login  from './Components/Login/Login';
import Sidebar  from './Components/Sidebar/Sidebar';
import Employe from './Components/Employe/Employe'
import Card from './Components/Card/Card'
import Organisme from './Components/Organisme/Organisme'
import Formation from './Components/Formation/Formation'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <h1 className="">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/Employe" element={<Employe />} />
          <Route path="/Statistique" element={<Card />} />
          <Route path="/Organisme" element={<Organisme />} />
          <Route path="/Formation" element={<Formation />} />
        </Routes>
      </BrowserRouter>
    </h1>
    </div>
  );
}

export default App;
