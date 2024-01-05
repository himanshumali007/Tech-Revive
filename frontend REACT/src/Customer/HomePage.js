import { Routes,Link,Route } from 'react-router-dom';
import { NavLink ,useNavigate} from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { alignPropType } from 'react-bootstrap/esm/types';
// import '../Slider/Slider2';
import SliderHome from '../Slider/SliderHome';
// import logo from '/category-images/logo.jpeg'


function Home() {

  // const [userData, setUserData] = useState(null); //siuu
  // const navigate = useNavigate();


  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("userData");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUserData(foundUser);
  //     navigate(`customer/categories`); //siuu
  //   }
  // }, []);

  return (

  <div>
    <div>
        <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark">
          <div class="container">
           {/* <Link className="navbar-brand" to="#">
              <img class="circle" src={logo} alt="Logo" height="70" style={{ marginTop: '-1px' }} />
               
            </Link> */}
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  <NavLink className="nav-link white" to="/" class="nav-link">Home</NavLink>
                    
                </li>



                <li className="nav-item mx-2">
                <NavLink className="nav-link white" to="/about" class="nav-link">About Us</NavLink>

                </li>



                <li className="nav-item mx-2">
                <NavLink className="nav-link white" to="/contact" class="nav-link">Contact</NavLink>

                </li>

                <li className="nav-item mx-2">
                <NavLink className="nav-link white" to="/signin/customer" class="nav-link">Log In</NavLink>

                </li>

                <li className="nav-item mx-2">
                <NavLink className="nav-link white" to="//register/customer" class="nav-link">Register</NavLink>

                </li>
                  
                   
                     
                  {/* <li className="nav-item dropdown pe-4">
                    <li className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Customer
                    </li>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/login/customer" className="dropdown-item nav-link px-3">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register/customer" className="dropdown-item nav-link px-3" >
                          Register
                        </Link>
                      </li>
                    </ul>
                  </li> */}

                  {/* <li className="nav-item dropdown pe-4">
                    <li className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Vendor
                    </li>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/login/vendor" className="dropdown-item nav-link px-3">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register/vendor" className="dropdown-item nav-link px-3" >
                          Register
                        </Link>
                      </li>
                    </ul>
                  </li> */}

              </ul>
            </div>
          </div>
        </nav>

{/* <div>{SliderHome}</div> */}
      </div>


</div>
  );
}

export default Home;