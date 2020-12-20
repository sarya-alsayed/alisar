import React, { Component } from 'react'; 
import RestaurantsList from './components/restaurants'
import RestaurantDash from './components/restaurantDash'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      restaurants: [],
      restaurantInfo: null,
      filterAttributes : {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleRestaurantClick(restaurant) {
    this.setState({
      restaurantInfo: restaurant
    });
  }

  handleInputChange(event) {
    if(event.target.checked){
      this.state.filterAttributes[event.target.id] = event.target.value; 
    }else{
      delete this.state.filterAttributes[event.target.id];
    }    
  }

  filterRestaurantsByCuisines(e) {
    e.preventDefault();
    console.log(this.state.filterAttributes)
    const attributes = this.state.filterAttributes;
    var query = "";
    for (const key in attributes){
      query = key + '%2C' + query;
    }
    query = query.substring(0, query.length-3)
    console.log(query)
    const apiUrl2 = `https://developers.zomato.com/api/v2.1/search?city_id=297&cuisines=${query}`;
    const headers = { 
      'Content-Type': 'application/json',
      'user-key': '621df21dc5fe4ac84e874b3ddaf3536e'
    } 
    fetch(apiUrl2, {method:'GET',headers})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            restaurants: result.restaurants
          });
          console.log(result)
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    const entity_id = '297';
    const city_id = '297';
    const apiUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=city&q=${city_id}&count=200`;
    const headers = { 
      'Content-Type': 'application/json',
      'user-key': '621df21dc5fe4ac84e874b3ddaf3536e'
    } 
    fetch(apiUrl, {method:'GET',headers})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            restaurants: result.restaurants
          });
          console.log(result)
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, restaurants, restaurantInfo} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className = 'container'>
          <div className = 'filterDiv'>
            <label id = 'cui'>cuisines</label>
            <form className = 'cuisines'>
              <div>
              <input type="checkbox" id="25" name="cuisines" value="Chinese" onChange={this.handleInputChange} />
              <label className='cui'>Chinese</label><br/>
              <input type="checkbox" id="161" name="cuisines" value="Coffee and Tea" onChange={this.handleInputChange} />
              <label className='cui'>Coffee and Tea</label><br/>
              <input type="checkbox" id="1" name="cuisines" value="American" onChange={this.handleInputChange} />
              <label className='cui'>American</label><br/>
              <input type="checkbox" id="4" name="cuisines" value="Arabian" onChange={this.handleInputChange} />
              <label className='cui'>Arabian</label><br/>
              </div>
              <div>
              <input type="checkbox" id="1039" name="cuisines" value="Cafe Food" onChange={this.handleInputChange} />
              <label className='cui'>Cafe Food</label><br/>
              <input type="checkbox" id="40" name="cuisines" value="Fast Food" onChange={this.handleInputChange} />
              <label className='cui'>Fast Food</label><br/>
              <input type="checkbox" id='3' name='cuisines' value='Asian'  onChange={this.handleInputChange}/>
              <label className='cui'> Asian</label><br/><br/>
              </div>
              <button onClick={(e) => this.filterRestaurantsByCuisines(e)}>filter</button>
            </form>
          </div>
          <div className = 'restaurantList'><RestaurantsList restaurants = {restaurants}  handleRestaurantClick = {this.handleRestaurantClick.bind(this)} /></div>
          <div className = 'restaurantDash'><RestaurantDash restaurant = {restaurantInfo} /></div>
        </div>
      );
    }
  }
}

export default App;