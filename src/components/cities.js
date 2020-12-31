import React, { Component } from 'react'; 
import {withRouter} from 'react-router-dom';

let cityId;
let cityName;
class Cites extends Component  {

  handleChange(e) {
    var sel = document.getElementById('select_id');
    cityId = e.target.value;
    cityName = sel.options[sel.selectedIndex].text;
  }

  handleClick(e){
    e.preventDefault();
    if (cityId === undefined){
      alert ( 'Please select a city');
    }
    else {
      this.props.history.push(`/restaurants/${cityId}/${cityName}`);
    }
   }
   
  render () {
    return (
      <div>
        <div className="alisar">
              <div className="logo">Alisar</div>
              <h1>Discover The Best Restaurants In Cities, Australia</h1>
              <form className="searchBar"  >
                <div className = "listBox">
                  <select id="select_id" className="city form-control" onChange={(e)=> this.handleChange(e)}>
                      <option value="0" hidden>Select City</option>
                      <option value="297" name= "Adelaide">Adelaide</option>
                      <option value="260" name= "Sydney" >Sydney</option>
                      <option value="259" name= "Melbourne">Melbourne</option>
                      <option value="298" name=" Brisbane">Brisbane</option>
                      <option value="1323" name="Darwin">Darwin</option>
                      <option value="296" name="Perth">Perth</option>			  
                    </select>
                    <button id = "getMessage" className = "search-btn" onClick = {(e)=> this.handleClick(e) }>Search</button>
                </div>
              </form>
          </div>
          <div className = "d-flex justify-content-center">
            <div className="card cardImage">
              <img className="card-img-top homeCard1"  alt="Card" />
              <div className="card-body">
                <h4 className="card-title">Search By Cities</h4>
                <p className="card-text">Find the best restaurants in cities of Australia.</p>
              </div>
            </div>
            <div className="card cardImage">
              <img className="card-img-top homeCard2"  alt="Card" />
              <div className="card-body">
                <h4 className="card-title">Search for your favorite dish</h4>
                <p className="card-text">Find restaurants filtered by cuisines and category.</p>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


export default withRouter( Cites);