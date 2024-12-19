 import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
 import Navbar, {  } from "./Components/Navbar";
 import Home from "./Components/Home/index";
 import Login from "./Components/log/login/index";
 import Signup from "./Components/log/signup/index";
 import Footer from "./Components/footer/index";
import Service from "./Components/Service/index";
 import './App.css';

function App() {
  
  return (
    <Router className="App border container-fluid text-center" >
   <Navbar></Navbar>   
   <Routes>
    <Route path='/Home' element={<Home></Home>}></Route>
    <Route path='/Login' element={<Login></Login>}></Route>
    <Route path='/Signup' element={<Signup></Signup>}></Route>
    <Route path='/Service' element={<Service></Service>}></Route>

   </Routes>
   <Footer></Footer>
    </Router>
  );
}

export default App;
