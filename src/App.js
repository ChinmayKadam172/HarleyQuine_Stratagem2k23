import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FaceRec from "./components/FaceRec";
import DescriptorUploader from "./components/DescriptorUploader";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <div className="screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/face" element={<FaceRec />} />
          <Route path="/regis" element={<DescriptorUploader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
