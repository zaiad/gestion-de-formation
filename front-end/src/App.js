import Register  from './Components/Register/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <h1 className="">
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </h1>
    </div>
  );
}

export default App;
