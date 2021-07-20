// import react router dom
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// import components
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'


function App() {
  return (
    <Router>
    
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
