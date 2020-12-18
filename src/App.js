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
      restaurantInfo:null,
    };
  }

  handleRestaurantClick(restaurant){
    this.setState({
      restaurantInfo: restaurant
    });

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
        <div>
          <div><RestaurantDash restaurant = {restaurantInfo} /></div>
       <div><RestaurantsList restaurants = {restaurants}  handleRestaurantClick = {this.handleRestaurantClick.bind(this)} /></div>
        </div>
      );
    }
  }
}

export default App;