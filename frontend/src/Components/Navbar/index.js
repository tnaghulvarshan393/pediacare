import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';

 
import Logo from "./img/PediaCare.png";
import   "./index.css";
function Navbar() {
  



  const handleLogout = () => {
   
    localStorage.removeItem("user");
 };
  return (
    <div className='container-fluid position-sticky z-3 top-0 start   mx-auto'>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid ">
    
    <img src={Logo} className='logo-img mx-4'></img>
    <h1 className='mx-2 web-name '>PediaCare</h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse  justify-content-end" id="navbarNavAltMarkup">
      <div className="navbar-nav  w-75 justify-content-evenly ">
      <Link to='/Home ' className=" fs-4 mx-3 nav-link active" aria-current="page"   >  Home </Link> 
       <Link to='/Service' className=" fs-4 mx-3 nav-link active" aria-current="page"  > Services </Link>
        <a className=" fs-4 mx-3 nav-link dropdown "  >
        <a className="nav-link dropdown-toggle p-0 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Settings
          </a>
          <ul className="dropdown-menu position-absolute">
            <li><a className="fs-4 dropdown-item" href="#">appointment</a></li>
            <li><a className="fs-4 dropdown-item" href="#">Account</a></li>
            <li><a className="fs-4 dropdown-item" href="#">Terms & conditions</a></li>
            <li><a className="fs-4 dropdown-item" onClick={handleLogout} href="#">Logout</a></li>
          </ul>
        </a>
        <Link to='/Login' className=" fs-4 mx-3 nav-link "  >Login</Link>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar