import { useLocation } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Overview from './overview';
import Reviews from './reviews';
import rest from '../images/rest.jpeg';

const RestaurantInfo = ( ) => {
  
  const location = useLocation();

  return(
    <div className="container"> 
      <div className="row" >
        <div className="col" >
          {location.state.restObject.featured_image ? <img src= {location.state.restObject.featured_image} className="img-fluid img-thumbnail restImage" alt="Responsive" /> :
          <img src= {rest} className="img-fluid img-thumbnail restImage" alt="Responsive" />}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className='float-right'>
            <h4><span className="badge badge-info">{location.state.restObject.user_rating.aggregate_rating}</span></h4>
          </div>
          <p className = 'restName'>{location.state.restObject.name}</p>
          <p className = 'restLocation'>{location.state.restObject.location.address}</p> 
          <p className = 'restLocation'>{location.state.restObject.location.city}</p>
          <span className="text-danger">{location.state.restObject.user_rating.votes} votes</span>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Reviews</Tab>
            </TabList>
            <TabPanel>
              <Overview restObject = {location.state.restObject} />
            </TabPanel>
            <TabPanel>
              <Reviews restObject = {location.state.restObject} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default RestaurantInfo