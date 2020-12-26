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
      categoryAttributes: [],
      sideBarList: [],
      loading: false,
      city_id: this.props.match.params.id,
      city_name: this.props.match.params.name,
    };
    this.handleInputCuisinesChange = this.handleInputCuisinesChange.bind(this);
    this.handleInputCategoryChange = this.handleInputCategoryChange.bind(this);
  }

  mergeArrays(array) {
    var mergedArray = [];
    console.log(array)
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== undefined) {
        for (var j = 0; j < array[i].length; j++) {
          mergedArray.push(array[i][j]);
        }
      }
    }
    return mergedArray;
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

  handleInputCuisinesChange(event) {
    if(event.target.checked){
      this.state.cuisinesAttributes.push(event.target.id); 
    }else{
      this.state.cuisinesAttributes = this.removeElementFromArray(this.state.cuisinesAttributes, event.target.id);
    }    
  }

  handleInputCategoryChange(event) {
    if(event.target.checked){
      this.state.categoryAttributes.push(event.target.id); 
    }else{
      this.state.categoryAttributes = this.removeElementFromArray(this.state.categoryAttributes, event.target.id);
    }    
  }

  getQuery(atttributes) {
    var query= "";
    for (var i = 0; i < atttributes.length; i++) {
      query = atttributes[i] + '%2C' + query;
    }
    query = query.substring(0, query.length-3);
    return query
  }

  // filter restaurants by categories and cuisines
  filterRestaurants(start, queryCuisine, queryCategory) {
    const apiUrl2 = `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city_id}&entity_type=city&cuisines=${queryCuisine}&category=${queryCategory}&start=${start}`;
    console.log(apiUrl2)
    const headers = { 
      'Content-Type': 'application/json',
      'user-key': '228ac77f20d86fa18e10986505837b57'
    } 
    return new Promise(function (resolve, reject) {
    fetch(apiUrl2, {method:'GET',headers})
      .then(res => res.json())
      .then(
        (result) => {
          resolve(result.restaurants);   
        },
        (error) => {
          reject(error)
        }
      )
    });
  }

  getAllFilterRestaurants(e) {
    e.preventDefault();
    if (this.state.categoryAttributes.length === 0 && this.state.cuisinesAttributes.length === 0) {
      this.setState({
        loading: false,
        restaurants: this.state.sideBarList
      });
    } else {
      this.setState({
        loading: true
      })
      var queryCuisine;
      var queryCategory;
      queryCuisine = this.getQuery(this.state.cuisinesAttributes);
      queryCategory = this.getQuery(this.state.categoryAttributes);
      var allRestaurants = [];
      Promise.all([this.filterRestaurants(0, queryCuisine, queryCategory),
        this.filterRestaurants(20, queryCuisine, queryCategory),
        this.filterRestaurants(40, queryCuisine, queryCategory),
        this.filterRestaurants(60, queryCuisine, queryCategory),
        this.filterRestaurants(80, queryCuisine, queryCategory)])
        .then ((array) => {
          console.log(array)
          allRestaurants = this.mergeArrays(array); 
          this.setState({
            loading: false,
            restaurants: allRestaurants
          });
        }).catch((error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
      }
  }

  loader() {
    if (this.state.restaurantInfo === false){ 
      return ( 
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )
    }
  }
  
  // serch restaurants in  acity depending on city id
  SearchRestaurantsInCity(start) {
    var restaurantsData = [];
    const apiUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city_id}&entity_type=city&city_id=${this.state.city_id}&start=${start}`;
    const headers = { 
      'Content-Type': 'application/json',
      'user-key': '228ac77f20d86fa18e10986505837b57'
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

  getAllRestaurants() {
    var allRestaurants = [];
    Promise.all([this.SearchRestaurantsInCity(0),
      this.SearchRestaurantsInCity(20),
      this.SearchRestaurantsInCity(40),
      this.SearchRestaurantsInCity(60),
      this.SearchRestaurantsInCity(80)])
      .then((array) => {
        console.log(array)
        allRestaurants = this.mergeArrays(array);
        this.setState({
          isLoaded: true,
          restaurants: allRestaurants,
          sideBarList: allRestaurants
        })
      }).catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  componentDidMount() {
    this.getAllRestaurants();
  }

  render() {
    const { error, isLoaded, restaurants, restaurantInfo, loading} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className = 'spinner'>
                <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only" >Loading...</span>
                </div>
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-info" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>;
    } else {
      return (
        <div className = 'container'>
          <div className = 'filterDiv'>
            <form className = 'cuisines form-check'>
              <div>
              <label className = 'cuiLabel'>CATEGORY</label><br/>
                <input  className="form-check-input" type="checkbox" id="1" name="category" value="Delivery" onChange={this.handleInputCategoryChange} />
                <label  className='cui form-check-label'>Delivery</label><br/>
                <input  className="form-check-input" type="checkbox" id="2" name="category" value="Dine-out" onChange={this.handleInputCategoryChange} />
                <label className='cui form-check-label'>Dine-out</label><br/>
                <input className="form-check-input"type="checkbox" id="3" name="category" value="Nightlife" onChange={this.handleInputCategoryChange} />
                <label className='cui form-check-label'>Nightlife</label><br/>
                <input className="form-check-input" type="checkbox" id="4" name="category" value="Catching-up" onChange={this.handleInputCategoryChange} />
                <label className='cui form-check-label'>Catching-up</label><br/>
              </div>
              <div className="checkboxDiv">
                <br/>
                <input className="form-check-input" type="checkbox" id="5" name="category" value="Takeaway" onChange={this.handleInputCategoryChange} />
                <label className='cui form-check-label'>Takeaway</label><br/>
                <input className="form-check-input" type="checkbox" id="6" name="category" value="Cafes" onChange={this.handleInputCategoryChange} />
                <label className='cui form-check-label'>Cafes</label><br/>
                <input className="form-check-input" type="checkbox" id="7" name="category" value="Daily Menus" onChange={this.handleInputCategoryChange} />
                <label className='cui form-check-label'>Daily Menus</label><br/>
                <input className="form-check-input" type="checkbox" id="8" name="category" value="Breakfast" onChange={this.handleInputCategoryChange} />
                <label className='cui form-check-label'>Breakfast</label><br/>
              </div>
              <div>
                <label className = 'cuiLabel'>CUISINE</label><br/>
                <input className="form-check-input" type="checkbox" id="25" name="cuisines" value="Chinese" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Chinese</label><br/>
                <input className="form-check-input" type="checkbox" id="161" name="cuisines" value="Coffee and Tea" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Coffee and Tea</label><br/>
                <input className="form-check-input" type="checkbox" id="401" name="cuisines" value="Asian Fusion" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Asian Fusion</label><br/>
                <input className="form-check-input" type="checkbox" id="131" name="cuisines" value="Australian" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Australian</label><br/>
              </div>
              <div className = 'checkboxDiv'>
                <br/>
                <input className="form-check-input" type="checkbox" id="1035" name="cuisines" value="Afghan" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Afghan</label><br/>
                <input className="form-check-input" type="checkbox" id="1" name="cuisines" value="American" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>American</label><br/>
                <input className="form-check-input" type="checkbox" id="168" name="cuisines" value="Burger" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Burger</label><br/>
                <input className="form-check-input" type="checkbox" id="268" name="cuisines" value="Drinks Only" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Drinks Only</label><br/>
              </div>
              <div className="checkboxDiv">
                <br/>
                <input className="form-check-input" type="checkbox" id="1039" name="cuisines" value="Cafe Food" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Cafe Food</label><br/>
                <input className="form-check-input" type="checkbox" id="40" name="cuisines" value="Fast Food" onChange={this.handleInputCuisinesChange} />
                <label className='cui form-check-label'>Fast Food</label><br/>
                <input className="form-check-input" type="checkbox" id='5' name="cuisines" value="Bakery" onChange={this.handleInputCuisinesChange}/>
                <label className='cui form-check-label'>Bakery</label><br/><br/>
              </div>
              <div className = 'filterButton'>
                <br/>
                <br/>
                <button className="btn btn-info btn-lg" onClick={(e) => this.getAllFilterRestaurants(e) } disabled={loading}>
                  {loading && (<span className="spinner-border spinner-border-sm"></span>
                  )}
                  {loading && <span>Loading..... </span>}
                  {!loading && <span>Filter Restaurants</span>}
                </button>
              </div>
            </form>
          </div>
          <div className = 'restaurantList overflow-auto'><RestaurantsList restaurants = {restaurants}  handleRestaurantClick = {this.handleRestaurantClick.bind(this)} /></div>
          <div className = 'restaurantDash'><RestaurantDash restaurant = {restaurantInfo} /></div>
        </div>
      );
    }
  }
}

export default App;