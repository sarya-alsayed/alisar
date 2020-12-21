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
      filterAttributes: {},
      cuisinesAttributes: [],
      sideBarList: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  mergeArrays(array) {
    var mergedArray = [];
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].length; j++) {
        mergedArray.push(array[i][j]);
      }
    }
    return mergedArray;
  }

  includesIn(string, array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      if (string.includes(array[i])){
        result.push (array[i])
      }
    }
    return result;
  }

  removeElementFromArray(array, element) {
    for(var i = 0; i < array.length; i++) { 
      if (array[i] == element) { 
        array.splice(i, 1); 
      }
    }
    return array
  }

  handleRestaurantClick(restaurant) {
    this.setState({
      restaurantInfo: restaurant
    });
  }

  // handleInputChange(event) {
  //   if(event.target.checked){
  //     this.state.filterAttributes[event.target.id] = event.target.value; 
  //   }else{
  //     delete this.state.filterAttributes[event.target.id];
  //   }    
  // }

  handleInputChange(event) {
    if(event.target.checked){
      this.state.cuisinesAttributes.push(event.target.value); 
    }else{
      this.state.cuisinesAttributes = this.removeElementFromArray(this.state.cuisinesAttributes, event.target.value);
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

  SearchRestaurantsInCity(start) {
    var restaurantsData = [];
    const entity_id = '297';
    const city_id = '297';
    const apiUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=city&city_id=${city_id}&start=${start}&count=20`;
    const headers = { 
      'Content-Type': 'application/json',
      'user-key': '621df21dc5fe4ac84e874b3ddaf3536e'
    } 
    return new Promise(function (resolve, reject) {
    fetch(apiUrl, {method:'GET',headers})
      .then(res => res.json())
      .then(
        (result) => {
          restaurantsData = result.restaurants;
          resolve(restaurantsData);
        },
        (error) => {
          reject(error);
        }
      )
    }); 
  }

  async getAllRestaurants() {
    var restaurantBunch;
    var allRestaurants = [];
    for (var i = 0; i < 100; i = i + 20) {
      restaurantBunch = await this.SearchRestaurantsInCity(i);
      if (restaurantBunch != null) {
        allRestaurants.push(restaurantBunch);
      }    
    }
    localStorage.setItem('myData',JSON.stringify(allRestaurants));
  }

  filterRestaurantsByCuisines(e) {
    e.preventDefault();
    console.log(this.state.cuisinesAttributes)
    var filterResult = [];
    var list = this.state.sideBarList;
    var b;
    for (var i = 0; i < this.state.cuisinesAttributes.length; i++) {
      for (var j = 0; j < list.length; j++ ) {
        b = list[j].restaurant.cuisines.includes(this.state.cuisinesAttributes[i]);
        if (b) {
          for ( var x = 0; x < filterResult.length; x++) {
            if (list[j].restaurant.id == filterResult[x].restaurant.id) {
              break;
            }
          }  
          if ( x === filterResult.length) {
            filterResult.push(list[j]);
          }     
        }
      }
    }
    if (this.state.cuisinesAttributes.length === 0) {
      this.setState({
        isLoaded: true,
        restaurants: this.state.sideBarList
      })
    } else {
      this.setState({
        isLoaded: true,
        restaurants: filterResult 
      })
    } 
  }

  componentDidMount() {
    this.getAllRestaurants();
    var myList = localStorage.getItem('myData')
    myList = JSON.parse(myList);
    myList = this.mergeArrays(myList);
    this.state.sideBarList = myList;
    console.log(myList)
    this.setState({
      isLoaded: true,
      restaurants: myList
    })
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
              {/* <div>
              <label className = 'cuiLabel'>CATEGORY</label><br/>
                <input type="checkbox" id="1" name="cuisines" value="category" onChange={this.handleInputChange} />
                <label className='cui'>Delivery</label><br/>
                <input type="checkbox" id="2" name="cuisines" value="category" onChange={this.handleInputChange} />
                <label className='cui'>Dine-out</label><br/>
                <input type="checkbox" id="3" name="cuisines" value="category" onChange={this.handleInputChange} />
                <label className='cui'>Nightlife</label><br/>
                <input type="checkbox" id="4" name="cuisines" value="category" onChange={this.handleInputChange} />
                <label className='cui'>Catching-up</label><br/>
              </div> */}
              <div>
                <label className = 'cuiLabel'>CUISINE</label><br/>
                <input type="checkbox" id="25" name="cuisines" value="Chinese" onChange={this.handleInputChange} />
                <label className='cui'>Chinese</label><br/>
                <input type="checkbox" id="161" name="cuisines" value="Coffee and Tea" onChange={this.handleInputChange} />
                <label className='cui'>Coffee and Tea</label><br/>
                <input type="checkbox" id="401" name="cuisines" value="Asian Fusion" onChange={this.handleInputChange} />
                <label className='cui'>Asian Fusion</label><br/>
                <input type="checkbox" id="131" name="cuisines" value="Australian" onChange={this.handleInputChange} />
                <label className='cui'>Australian</label><br/>
              </div>
              <div>
                <br/>
                <input type="checkbox" id="1035" name="cuisines" value="Afghan" onChange={this.handleInputChange} />
                <label className='cui'>Afghan</label><br/>
                <input type="checkbox" id="1" name="cuisines" value="American" onChange={this.handleInputChange} />
                <label className='cui'>American</label><br/>
                <input type="checkbox" id="168" name="cuisines" value="Burger" onChange={this.handleInputChange} />
                <label className='cui'>Burger</label><br/>
                <input type="checkbox" id="268" name="cuisines" value="Drinks Only" onChange={this.handleInputChange} />
                <label className='cui'>Drinks Only</label><br/>
              </div>
              <div>
                <br/>
                <input type="checkbox" id="1039" name="cuisines" value="Cafe Food" onChange={this.handleInputChange} />
                <label className='cui'>Cafe Food</label><br/>
                <input type="checkbox" id="40" name="cuisines" value="Fast Food" onChange={this.handleInputChange} />
                <label className='cui'>Fast Food</label><br/>
                <input type="checkbox" id='5' name="cuisines" value="Bakery" onChange={this.handleInputChange}/>
                <label className='cui'>Bakery</label><br/><br/>
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