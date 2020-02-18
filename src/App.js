import React from 'react';
import Login from './components/Login';
import './App.css';
import Navbar from './components/Navbar';
import { Switch, Route } from './router';
import Landing from './components/Landing';
import Register from './components/Register';
import Footer from './components/Footer';


function App(props){
  return (
    <Switch>
      <Route exact path="/" render={() => <Main><Login/></Main>} />
      <Route exact path="/landing" component={Landing} />
      <Route exact path="/register" render={() => <Main><Register/></Main>} />
      <Route component={NotFound} />
    </Switch>
  )
}

function NotFound(props){
  return (
    <div>Page not found</div>
  )
}

function Main({children}) {
  return (
    <div className="App">
    <Navbar/>
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="box">
              <div className="content">
                {children}
              </div>
            </div>
          </div>
        <div className="col-md-3"></div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
