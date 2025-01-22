import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import EduSphere from './components/EduSphere/EduShpere';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/Login" exact element={<LoginPage/>}></Route>
        <Route path="/Signup" exact element={<SignUpPage />}></Route>
        <Route path="/EduSphere" exact element={<EduSphere />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
