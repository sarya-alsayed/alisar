import {withRouter} from 'react-router-dom';
import rest from '../images/rest.jpeg';

const RestaurantDash = (props) => {
	const handleClick = (e) => {
		e.preventDefault();
			props.history.push({
				pathname: `/restaurant/${props.restaurant.id}`,
				state: {restObject: props.restaurant }
			});
  }

  return(
		<div> {!props.restaurant ? <div>Restaurant Dashboard</div> :
			<div>
        <div className = 'dash'>
          <div className= 'imageBox'>
            {props.restaurant.featured_image ? <img className = 'image' src={props.restaurant.featured_image}  /> :
             <img className = 'image' src={rest}  />}
          </div>
          <div>
            <p className = 'restName'>{props.restaurant.name}</p>
            <p className = 'restLocation'>{props.restaurant.location.address}</p><br/>
            <div className="mb-2">
              {props.restaurant.has_table_booking > 0 ?<div><span className="text-success signal">✓</span><span className="delivery">Bookings available</span></div> :
                <div><span className="text-danger del">x</span><span className="delivery">No Bookings</span></div>}
              {props.restaurant.has_online_delivery > 0 ?<div><span className="text-success signal">✓</span><span className="delivery">Delivery available</span></div> :
                <div><span className="text-danger del">x</span><span className="delivery">Delivery unavailable</span></div>}
            </div>
            <p className = 'restInfo'>CUISINES</p><p className = 'info'>{props.restaurant.cuisines}</p><br/>
            <p className = 'restInfo'>PHONE NUMBER </p><p className = 'info'>{props.restaurant.phone_numbers}</p><br/>
            <p className = 'restInfo'>TIMINGS</p> <p className = 'info'>{props.restaurant.timings}</p>
          </div>
        </div>
        <button  className="btn btn-info  btn-lg btn-block" onClick = {(e) => handleClick(e) }>see more</button>
      </div>
      }	
		</div>
 	)
}

export default  withRouter(RestaurantDash);