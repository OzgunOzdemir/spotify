import React, { Component } from 'react';

import './assets/Css/common.css'
import './assets/Css/bootstrap-grid.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';
import Newreleases from './containers/Newreleases/Newreleases';
import Playlists from './containers/Playlists/Playlists';
import Tracks from './containers/Tracks/Tracks';
import Albums from './containers/Albums/Albums';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder, faCompactDisc, faTable, faUser, faMusic, faHome, faPlay } from '@fortawesome/free-solid-svg-icons';
library.add(faFolder, faCompactDisc, faTable, faUser, faMusic, faHome, faPlay)

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <div>
            <Switch>
              <Route path="/" exact strict component={Home} />
              <Route path="/categories" exact strict component={Categories} />
              <Route path="/new-releases" exact strict component={Newreleases} />
              <Route path="/playlists" exact strict component={Playlists} />
              <Route path="/tracks" exact strict component={Tracks} />
              <Route path="/albums" exact strict component={Albums} />
              <Route component={Error} />
            </Switch>
          </div>
        </Layout>
      </Router>
    );
  }
}

const Error = () => {
  return (
    <h1>This page was not found.</h1>
  )
}

export default App;
