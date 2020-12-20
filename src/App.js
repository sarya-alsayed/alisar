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

  filterRestaurants(e) {
    e.preventDefault();
    console.log(this.state.filterAttributes)
    const attributes = this.state.filterAttributes;
    var queryCuisine = "";
    var queryCategory = "";
    for (const key in attributes){
      if (attributes[key] == 'cuisine') {
        queryCuisine = key + '%2C' + queryCuisine;
      } else {
        queryCategory = key + '%2C' + queryCategory;
      }
    }
    queryCuisine = queryCuisine.substring(0, queryCuisine.length-3);
    queryCategory = queryCategory.substring(0, queryCategory.length-3)
    const apiUrl2 = `https://developers.zomato.com/api/v2.1/search?city_id=297&cuisines=${queryCuisine}&category=${queryCategory}`;
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
          Restaurants In Adelaide Australia
          <div className = 'filterDiv'>
            <form className = 'cuisines'>
              <div>
              <label className = 'cuiLabel'>CATEGORY</label><br/>
                <input type="checkbox" id="1" name="cuisines" value="category" onChange={this.handleInputChange} />
                <label className='cui'>Delivery</label><br/>
                <input type="checkbox" id="2" name="cuisines" value="category" onChange={this.handleInputChange} />
                <label className='cui'>Dine-out</label><br/>
                <input type="checkbox" id="3" name="cuisines" value="category" onChange={this.handleInputChange} />
                <label className='cui'>Nightlife</label><br/>
                <input type="checkbox" id="4" name="cuisines" value="category" onChange={this.handleInputChange} />
                <label className='cui'>Catching-up</label><br/>
              </div>
              <div>
                <label className = 'cuiLabel'>CUISINE</label><br/>
                <input type="checkbox" id="25" name="cuisines" value="cuisine" onChange={this.handleInputChange} />
                <label className='cui'>Chinese</label><br/>
                <input type="checkbox" id="161" name="cuisines" value="cuisine" onChange={this.handleInputChange} />
                <label className='cui'>Coffee and Tea</label><br/>
                <input type="checkbox" id="401" name="cuisines" value="cuisine" onChange={this.handleInputChange} />
                <label className='cui'>Asian Fusion</label><br/>
                <input type="checkbox" id="131" name="cuisines" value="cuisine" onChange={this.handleInputChange} />
                <label className='cui'>Australian</label><br/>
              </div>
              <div>
                <br/>
                <input type="checkbox" id="1039" name="cuisines" value="cuisine" onChange={this.handleInputChange} />
                <label className='cui'>Cafe Food</label><br/>
                <input type="checkbox" id="40" name="cuisines" value="cuisine" onChange={this.handleInputChange} />
                <label className='cui'>Fast Food</label><br/>
                <input type="checkbox" id='5' name="cuisines" value="cuisine" onChange={this.handleInputChange}/>
                <label className='cui'>Bakery</label><br/><br/>
              </div>
              <button onClick={(e) => this.filterRestaurants(e)}>filter</button>
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