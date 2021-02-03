import React, { Fragment } from 'react';
import './App.css';

import Landing from './layout/landing'
import NavRouter from './layout/navrouter'
import NavMenu from './layout/navmenu'
import NotFound from './layout/notfound'

import Login from './views/auth/login'
import SignUp from './views/auth/signup'

import { BrowserRouter , Switch, Route ,withRouter} from 'react-router-dom'
import {TransitionGroup,CSSTransition} from 'react-transition-group'

const transitionDelay = 200

const Transitioner = withRouter(({ location }) => (
  <TransitionGroup component={null} >
    <CSSTransition 
      key={location.key} 
      classNames="fadePage" 
      timeout={transitionDelay} >
      
      <Fragment>
        <NavMenu>
          <NavSwitch location={location} />
        </NavMenu>

        <div className="spaceFixer" />

        <div className="fadePage">
          <MainSwitch location={location} />
        </div>

      </Fragment>

    </CSSTransition>
  </TransitionGroup>
));

const MainSwitch = (props:any) => (
  <Switch location={props.location}>

    <Route path="/" exact >
      <Landing /> 
    </Route>

    <Route path="/auth/singup" exact >
      <SignUp />
    </Route>

    <Route path="/auth/login" exact >
      <Login />
    </Route>

    <Route path="/*" >
      <NotFound/>
    </Route>

  </Switch>
);

const NavSwitch = (props:any) => (
    <Switch location={props.location}>

      <Route path="/" exact >
        <NavRouter />          
      </Route>

    </Switch>
);

function App(){  
  return (
    <Fragment>
      <BrowserRouter>
        <Transitioner />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
