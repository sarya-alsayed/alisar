import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css'
import Cites from './components/cities';
import RestaurantInfo from './components/restaurantInfo'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
  export default function Home() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Cites />
          </Route>
          <Route exact path="/restaurants/:id/:name" render={(props) => <App {...props}/>} /> 
					<Route exact path="/restaurant/:id" render={(props) => <RestaurantInfo {...props}/>} /> 
        </Switch>   
    	</Router>
  	);
	}

ReactDOM.render( <Home />,document.getElementById('root'));

