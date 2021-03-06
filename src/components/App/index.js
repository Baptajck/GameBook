/* eslint-disable react/prefer-stateless-function */
// == Import : npm
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

// == Import : local
import './app.scss';
import Footer from 'src/containers/Footer';
import PageNotFound from 'src/components/PageNotFound';
import Home from 'src/containers/Home';
import Contact from 'src/components/Contact';
import Terms from 'src/components/Terms';
import Mentions from 'src/components/Mentions';
import Signin from 'src/containers/Signin';
import Forgotten from 'src/containers/Forgotten';
import Signup from 'src/containers/Signup';
import Categories from 'src/containers/Categories';
import CreateStory from 'src/containers/CreateStory';
import Profile from 'src/containers/Profile';
import Team from 'src/components/Team';
import StartStory from 'src/containers/StartStory';
import NavNew from 'src/containers/NavNew';
import ScrollToTop from 'src/components/ScrollToTop';
import UploadMyFile from 'src/components/UploadMyFile';


toast.configure();

// == Composant

class App extends React.Component {
  componentDidMount() {
    const { getHome } = this.props;
    getHome();
  }

  render() {
    const { isConnected } = this.props;
    return (
      <div id="app">
        <ToastContainer autoClose={5000} />
        <ScrollToTop />
        <NavNew isConnected={isConnected} />
        <Switch>
          <Route exact path="/">
            <Home isConnected={isConnected} />
          </Route>
          <Route path="/concept">
            <div>Voici notre concept</div>
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/mentions">
            <Mentions />
          </Route>
          <Route path="/signup">
            {isConnected ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route path="/signin">
            {isConnected ? <Redirect to="/" /> : <Signin />}
          </Route>
          <Route path="/forgotten">
            <Forgotten />
          </Route>
          <Route path="/signout">
            <Redirect to="/" />
          </Route>

          <Route exact path="/categories">
            <Home isConnected={isConnected} />
          </Route>
          {isConnected ? (
            <>
              <Route exact path="/categories/:id" component={Categories} />
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/createstory">
                <CreateStory />
              </Route>
            </>
          )
            : (
              <Route>
                <PageNotFound />
              </Route>

            )}
          <Route path="/about">
            <div>A propos</div>
          </Route>
          <Route path="/story/:id">
            <StartStory isConnected={isConnected} />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
        <Footer isConnected={isConnected} />
      </div>
    );
  }
}

App.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  getHome: PropTypes.func.isRequired,
};

// == Export
export default App;
