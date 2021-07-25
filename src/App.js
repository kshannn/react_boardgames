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

// import context
import UserContext from './pages/UserContext'



function App() {

  // decoded accesstoken from localstorage
  let decoded = JSON.parse(localStorage.getItem('decodedAccessToken'))

  // set accesstoken in state
  const [userInfo, setUserInfo] = useState(decoded)

  // context object
  const context = {
    userInfo: () => {
      return userInfo
    },
    setProfile: (profile) => {
      setUserInfo(profile)
    }
  }

  // remove access token from localstorage when users log out
  let logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('decodedAccessToken')
    localStorage.removeItem('userInfo')
    setUserInfo(null)
  }




  return (
    <UserContext.Provider value={context}>
      <Router>

        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/posters">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/posters">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
              </ul>
              <div className="d-flex">
                Hello, {userInfo? userInfo.username: "guest"}
                <button className="btn btn-danger" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </nav> */}

        <div>
          Hello, {userInfo ? userInfo.username : "guest"}
        </div>
        <button onClick={logout}>Logout</button>
        <Link to='/login'>
          <button>Login</button>
        </Link>
        <Link to='/'>
          <button>Home</button>
        </Link>
        <Link to='/cart'>
          <button>Your cart</button>
        </Link>
        <Link to='/register'>
          <button>Register</button>
        </Link>

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
          <Route path='/checkout/success'>
            <PaymentSuccess />
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
