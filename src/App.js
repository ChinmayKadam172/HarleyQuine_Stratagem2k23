import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FaceRec from "./components/FaceRec";
import DescriptorUploader from "./components/DescriptorUploader";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import HomeScreen from "./components/Landing Page/HomeScreen";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Token from "./components/Token/Token";

function App() {
  return (
    <div className="screen">
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/face' element={<FaceRec/>}/> 
            <Route exact path='/form' element={<RegistrationForm/>}/> 
            <Route exact path='/token' element={<Token/>}/> 
            <Route path="/upload" element={<DescriptorUploader />} />
          </Route>
          <Route exact path='/home' element={<HomeScreen/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
