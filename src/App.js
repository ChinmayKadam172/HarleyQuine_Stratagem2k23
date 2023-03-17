import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FaceRec from "./components/FaceRec";
import HomeScreen from "./components/Landing Page/HomeScreen";

function App() {
  return (
    <div className="screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/face" element={<FaceRec />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
