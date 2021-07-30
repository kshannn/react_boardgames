// import react and useState
import React, { useState } from 'react'

// import react router dom
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// import bootstrap and css
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

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



function App() {

  // decoded accesstoken from localstorage
  let decoded = JSON.parse(localStorage.getItem('decodedAccessToken'))
  // console.log(decoded)

  // set accesstoken in state
  const [userInfo, setUserInfo] = useState(decoded)

  // context object
  const context = {
    userInfo: () => {
      return userInfo
    },
    setProfile: (profile) => {
      setUserInfo(profile)
    },
    logoutRedirect: () => {
      // clear localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('decodedAccessToken')
      localStorage.removeItem('userInfo')
      // redirect user to login
      window.location.assign('https://3000-green-prawn-u4ktudfo.ws-us13.gitpod.io/login' + '?' + 'session=expire&' + 'callback_url=' + window.location.href)
    }
  }

  // remove access token from localstorage when users log out
  let logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('decodedAccessToken')
    localStorage.removeItem('userInfo')
    setUserInfo(null)
    window.location.assign('https://3000-green-prawn-u4ktudfo.ws-us13.gitpod.io/login')
  }




  return (
    <UserContext.Provider value={context}>
      <Router>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Brand</a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to='/' className="nav-link navFunc" aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to='/history' className="nav-link navFunc" aria-current="page">Order History</Link>
                </li>
              </ul>

              
                {userInfo?
                  <div className="nav-item dropdown">
                  <a className="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div id="userIcon">
                      <i className="fas fa-user-circle"></i> {userInfo.username}
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
              
                
                <div className="nav-item" id="cartIcon">
                  <Link to='/cart'><i className="fas fa-shopping-cart"></i></Link>
                </div>
                
                <div className="nav-item">
                  {userInfo ? <a className="navFunc logInOut" onClick={logout}>Logout</a>:<Link to='/login' className="navFunc logInOut">Login</Link>}
                </div>

            </div>
          </div>
        </nav>



        
        
       
        
        
        

        <Switch>

          <Route exact path='/'>
            <Home />
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
            <Cart />
          </Route>
          <Route path='/listing/:listingId'>
            <ListingDetails />
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
