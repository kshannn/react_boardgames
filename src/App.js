// import react router dom
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// import components
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'


function App() {

  let decoded = JSON.parse(localStorage.getItem('decodedAccessToken'))
  
  
  let logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('decodedAccessToken')
  }

  return (
    <Router>
      <div>
        Hello, {decoded? decoded.username: "guest"}
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
  );
}

export default App;
