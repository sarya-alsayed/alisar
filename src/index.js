import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css'
import Cites from './components/cities';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
  export default function Home() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Cites />
          </Route>
          <Route exact path="/restaurants/:id/:name" render={(props) => <App {...props}/>} /> 
        </Switch>   
    	</Router>
  	);
	}

ReactDOM.render( <Home />,document.getElementById('root'));

