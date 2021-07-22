// import react and useState
import React,{ useState } from 'react'

// import react router dom
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// import bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// import components
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'

// import context
import UserContext from './pages/UserContext'


function App() {


  // decoded accesstoken from localstorage
  let decoded = JSON.parse(localStorage.getItem('decodedAccessToken'))
  
  // set accesstoken in state
  const [ decodedAccessToken, setDecodedAccessToken ] = useState(decoded)

  
  // remove access token from localstorage when users log out
  let logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('decodedAccessToken')
    setDecodedAccessToken(null);
  }


  // context object
  const context = {
    decodedAccessToken: () => {
      return decodedAccessToken
    },
    setProfile: (profile) => {
      setDecodedAccessToken(profile)
    }
  }

  return (
    <UserContext.Provider value ={context}>
    <Router>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
    
            </ul>
            
          </div>
        </div>
      </nav>


      <div>
        Hello, {decodedAccessToken? decodedAccessToken.username: "guest"}
      </div>
      <button onClick={logout}>Logout</button>

      <Switch>
        
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path ='/register'>
            <Register />
          </Route>
          <Route exact path ='/profile'>
            <Profile />
          </Route>
          <Route exact path ='/cart'>
            <Cart />
          </Route>
      
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
