// import react and useState
import React, { useState } from 'react'

// import react router dom
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// import bootstrap and css
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// import jwt_decode
import jwt_decode from "jwt-decode";

import config from './config';
import axios from 'axios'

// import components
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import ListingDetails from './pages/ListingDetails'
import PaymentSuccess from './pages/PaymentSuccess';
import OrderHistory from './pages/OrderHistory';
import ProfileUpdate from './pages/ProfileUpdate';

// import context
import UserContext from './pages/UserContext'
import ProductContext from './pages/ProductContext';



function App() {

  // decoded accesstoken from localstorage
  
  var accessToken = localStorage.getItem('accessToken')

  if (accessToken){
    var decoded = jwt_decode(accessToken)

  }
  

  // set accesstoken in state
  const [ userInfo, setUserInfo ]  = useState(decoded)
  const [ name, setName ] = useState("")
  const [ cartEmpty, setCartEmpty ] = useState(true)



  // product context object
  const productContext = {
    setCartEmpty: async (user) => {
      if(!user){
        window.location.assign(config.REACT_URL + '/login?session=expire&callback_url=' + window.location.href)
      }
      let response = await axios.get(config.API_URL + '/cart/' + user.id, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })

      if (response.data.length){
        setCartEmpty(false)
      } else {
        setCartEmpty(true)
      }
    }
  }



  // user context object
  const context = {
    userInfo: () => {
      return userInfo
    },
    setProfile: (profile) => {
      setUserInfo(profile)
    },
    setName: async() => {
      let userInfo = await axios.get(config.API_URL + '/users/profile', {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
      })
      setName(userInfo.data.username)
    },
    logoutRedirect: () => {
      // clear localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userInfo')
      // redirect user to login
      window.location.assign(config.REACT_URL + '/login?session=expire&callback_url=' + window.location.href)
    }
  }

  // remove access token from localstorage when users log out
  let logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userInfo')
    setUserInfo(null)
    window.location.assign(config.REACT_URL + '/login?loggedout=true')
  }




  return (
    <UserContext.Provider value={context}>
      <Router>

        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <div id="logoContainer"></div>
            </a>
            <div className="ms-auto userIconContainer">
            {userInfo?
                  <div className="nav-item dropdown">
                    <a className="nav-link" href="/profile" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <div id="userIcon">
                        <i className="fas fa-user-circle"></i> {name || userInfo.username}
                      </div>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link to='/profile' className="dropdown-item">View profile</Link></li>
                      <li><Link to='/register' className="dropdown-item">Create an account</Link></li>
                    </ul>
                  </div>:
                  <div id="guestIcon">
                    <i className="fas fa-user-circle"></i>Guest
                  </div> }

                  <div className="ms-auto cartIconContainer">
                  {!cartEmpty?<span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle">
                          <span class="visually-hidden">New alerts</span>
                        </span>:null }
                    <div className="nav-item" id="cartIcon">
                       
                    </div>
                      
                      <Link to='/cart'><i className="fas fa-shopping-cart"></i></Link>
                  </div>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to='/' className="nav-link navFunc" aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to='/history' className="nav-link navFunc" aria-current="page">Orders</Link>
                </li>
              </ul>

               
                  
                
                <div className="nav-item">
                  {userInfo ? <button className="navFunc logInOut" onClick={logout}>Logout</button>:<Link to='/login' className="navFunc logInOut">Login</Link>}
                </div>
            </div>
          </div>
        </nav>


        <Switch>
          
          <Route exact path='/'>
            <ProductContext.Provider value={productContext}>
              <Home />
            </ProductContext.Provider>
          </Route>
          
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
          
          <Route exact path='/cart'>
            <ProductContext.Provider value={productContext}>
              <Cart />
            </ProductContext.Provider>
          </Route>
          
          
          <Route path='/listing/:listingId'>
            <ProductContext.Provider value={productContext}>
              <ListingDetails />
            </ProductContext.Provider>
          </Route>
          
          <Route exact path='/checkout/success'>
            <PaymentSuccess />
          </Route>
          <Route exact path='/history'>
            <OrderHistory />
          </Route>
          <Route exact path='/profile/update'>
            <ProfileUpdate />
          </Route>


        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
