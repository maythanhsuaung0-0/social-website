import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Friends from './page/friends';
import Homepage from './page/homepage';
import LoginPage from './page/login';
import Register from './page/register';
import Results from './page/results';
import UserWall from './page/userWall';
import Wall from './page/wall';
import Write from './page/write';
function App() {
  return (
    <Router>
      <div className='relative'>
        <div className=''>
          <Switch>
            <Route path='/' exact>
              <Homepage />
            </Route>
            <Route path='/write' exact>
              <Write />
            </Route>
            <Route path='/results' exact>
              <Results />
            </Route>
            <Route path='/friends' exact>
              <Friends />
            </Route>
            <Route path='/userWall' exact>
              <UserWall />
            </Route>
            <Route path='/user/:id' exact>
              <Wall />
            </Route>
          </Switch>
        </div>
      </div>
      <Switch>
        <Route path='/signin' exact>
          <LoginPage />
        </Route>
        <Route path='/signup' exact>
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
