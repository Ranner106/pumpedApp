import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './App.css'
import './index.css'

class App extends React.Component {
  render() {
    return (

      <BrowserRouter className='app'>

        <Switch>

          <Route
            exact
            path="/"
            component={ Login }
          />

          <Route
            exact
            path="/search"
            component={ Search }
            // render={ () => (
            //   <div>

            //     <Header />
            //     <Search />
            //   </div>
            // ) }
          />

          <Route
            exact
            path="/album/:id"
            component={ Album }
            // render={ () => (
            //   <div>

            //     <Header />
            //     <Album />
            //   </div>
            // ) }
          />

          <Route
            exact
            path="/favorites"
            component={ Favorites }
            // render={ () => (
            //   <div>

            //     <Header />
            //     <Favorites />
            //   </div>
            // ) }
          />

          <Route
            exact
            path="/profile"
            component={ Profile }
            // render={ () => (
            //   <div>
            //     <Header />
            //     <Profile />
            //   </div>
            // ) }
          />

          <Route
            exact
            path="/profile/edit"
            component={ ProfileEdit }
            // render={ () => (
            //   <div>
            //     <Header />
            //     <ProfileEdit />
            //   </div>
            // ) }
          />

          <Route
            exact
            path="*"
            component={ NotFound }
          />

        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;

