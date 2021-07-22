// import react and useState
import React,{ useState } from 'react'

// import react router dom
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

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
  
  
  // remove access token from localstorage when users log out
  let logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('decodedAccessToken')
  }

  // set accesstoken in state
  const [ decodedAccessToken, setDecodedAccessToken ] = useState(decoded)

  // context object
  const context = {
    decodedAccessToken: () => {
      return decodedAccessToken
    }
  }

  return (
    <UserContext.Provider value ={context}>
    <Router>
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
