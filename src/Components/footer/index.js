import React from 'react'
import "./index.css";
import logo from "./img/PediaCare.png";

function Footer() {
  return (
    <div className=' footer bg-dark container-fluid     '>
    <div  className=' row    h-75  '>
     <div className='col-md-6 col-lg-3   '>
    <div className=' d-flex  logo-side w-75 mx-auto h-25 my-4'>
        <img src={logo} className='mx-4'></img>
        <h4 className='lh-lg'>Pediacare</h4> </div>
       <div className='mx-auto text-center    d-'><h4 > Location:</h4> <p> No:255,CTH road,Thiruninravur-602024</p></div> 
       <div className='   w-100 up-icons justify-content-evenly'>
        <i className= " fs-3 display-6 bi bi-facebook"></i>
        <i class="  fs-3 display-6 bi bi-youtube"></i>
        <i class="  fs-3 display-6 bi bi-instagram"></i>
        <i className="  fs-3  display-6 bi bi-twitter-x"></i>
            </div> 
     </div>
     <div className='col-md-6 col-lg-3  '>
     <div className=' d-flex   logo-side w-100 mx-auto h-75 my-4'>
        
        <ul className='mx-auto'>
        <h4 className='text-center'>Contact</h4>    
            <li className='d-flex justify-content-around'><h4 className='mx-2'>Mobile No:</h4> <p className='lh-lg'>+91 9025899267</p></li>
            <li className='d-flex justify-content-around'><h4 className='mx-2'>Email:</h4><p className='lh-lg'>pediacare@gmail.com</p></li>
        </ul>
     </div>
     </div>
     <div className='col-md-6 col-lg-3 '>
     <div className=' d-flex   logo-side w-100 mx-auto h-75 my-4'>
        
        <ul className='mx-auto'>
        <h4 className='text-center'>Support</h4>    
            <li className='d-flex justify-content-around'> <p className='lh-lg'>Donate</p></li>
            <li className='d-flex justify-content-around'> <p className='lh-lg'>Customer Service</p></li>
            <li className='d-flex justify-content-around'> <p className='lh-lg'>Emergency Care</p></li>
            <li className='d-flex justify-content-around'> <p className='lh-lg'>Visitor info </p></li>
        </ul>
     </div>
     </div>
     <div className='col-md-6 col-lg-3'>
     <div className=' d-flex   logo-side w-100 mx-auto h-75 my-4'>
        
        <ul className='mx-auto  '>
        <h4 className='text-center'>Trust & Legal</h4>    
            <li className='d-flex justify-content-around'><p className='lh-lg'>Term & Conditions</p></li>
            <li className='d-flex justify-content-around'><p className='lh-lg'>hospital Stay</p></li>
            <li className='d-flex justify-content-around'><p className='lh-lg'>Privacy policy</p></li>
        </ul>
     </div>
     </div>
    </div>
    <div className='w-100  logos p-2 d-flex justify-content-between'>
        <div className='d-flex  '>
        <h6 className='p-2'>PediaCare C 2024</h6>
        <h6 className='p-2'>Version 1.001</h6>
            </div> 
        <div className='d-flex '>
        <h6 className='p-2'>PediaCare C 2024</h6>
        <h6 className='p-2'>Version 1.001</h6>
            </div> 
        <div className='icons   w-25 justify-content-evenly'>
        <i className=" fs-3   display-6 bi bi-facebook"></i>
        <i className=" fs-3 display-6 bi bi-youtube"></i>
        <i className=" fs-3 display-6 bi bi-instagram"></i>
        <i className=" fs-3   display-6 bi bi-twitter-x"></i>
            </div> 
      
    </div>
    </div>
  )
}

export default Footer
