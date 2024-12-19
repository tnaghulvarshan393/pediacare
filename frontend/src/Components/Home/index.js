import React from 'react' 
import  "./index.css";
import diet from "./img/Untitled design (5).png";
import tablet from "./img/Untitled design (2).png";
import personal from "./img/Untitled design (6).png";
import carousel1 from './img/carousel1.png'; 
import carousel3 from "./img/carousel3.png";
import carousel2 from "./img/carouse2.png";
import Doc from "./img/doc.png";
import { useNavigate } from "react-router-dom";
import {useEffect,useState  } from "react";

function Home() {

  const navigate= useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin=()=>{
    navigate("/login");
  }
  const handleHelloCaretaker=()=>{

  }

  useEffect(() => {
    // Check if the user is logged in by inspecting localStorage
    const user = localStorage.getItem('user'); // Adjust if you're using another method to store login state
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
 
  return (
    <div className='container home-com  '>
      {/* doctor banner */}
      <div className='w-100 carousel-banner  position-relative   '>
        <p className=' display-3   text-center'>CHILDCARE CLINIC</p>
        <img className='img-fluid  ' src={Doc}></img>
        <nav className=' text-center '>
        <h2>{isLoggedIn ? " " : "For more services "}</h2>
            <button  className='btn btn-warning display-4' onClick={isLoggedIn ? handleHelloCaretaker : handleLogin} > {isLoggedIn ? "Hello Caretaker" :   "Login"} </button> {/** if loggged in it should  display hello care taker */}
        </nav>
      </div>
      {/* Book Slot And Vaccination reminder */}
    <div className='row my-4'>
      <div className='col-12 col-md-6'>
      <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="3000">
      <img src={carousel1} class="d-block w-100" alt="carousel img"/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src={carousel2} class="d-block w-100" alt="carousel img"/>
    </div>
    <div class="carousel-item">
      <img src={carousel3} class="d-block w-100" alt="carousel img"/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className='col-12 row col-md-6'>

       <div className='col-12 col-xl-6   p-4'>
       <div class="card my-auto text-light p-2 bg-dark"  >
  <div class="card-body">
    <h3 class="card-title">Book Slot</h3>
    <h6 class="card-subtitle mb-2 text-body-secondary">Check-Up</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link btn btn-primary">book Slot </a>
  </div>
</div>
       </div>
       <div className=' col-12 col-xl-6   p-4 '>
       <div class="card my-auto text-light p-2 bg-dark"  >
  <div class="card-body">
    <h5 class="card-title">Upcoming Vaccination</h5>
    <h3 class="card-subtitle mb-2 text-danger">Penta 2</h3>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a   class="card-link btn btn-primary disable">opening soon</a>
  </div>
</div>
       </div>
      </div>
    </div>
      
{/* diet chart ,personal details, Doctor prescription  */}

<div className='row   '>
  {/* diet chart */}
  <div className=' col-md-4  bg-light'>

  <div class="card  my-2 text-center" >
  <img src={diet} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Recommende Diet</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Get Diet</a>
  </div>
</div>
  </div>
  {/* personal data */}
  <div className=' col-md-4 bg-light'> 
  <div class="card  my-2 text-center" >
  <img src={tablet} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Medicine precription</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">show prescription</a>
  </div>
</div>
  </div>
  {/* { doctor priscription} */}
  <div className='  col-md-4 bg-light '> 
  <div class="card   my-2 text-center" >
  <img src={personal}class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Personal Details</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button  class="btn btn-primary mx-auto  "> personal details </button>
  </div>
</div>
  </div>
  
  
</div>
      
    </div>
  )
}

export default Home