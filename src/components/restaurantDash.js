// import { useImperativeHandle } from "react"
import {withRouter} from 'react-router-dom';

const RestaurantDash = (props) =>{
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
			<div className= 'imageBox'><img className = 'image' src={props.restaurant.featured_image} alt='Restaurant' /></div>
			<div>
				<p className = 'restName'>{props.restaurant.name}</p>
				<p className = 'restLocation'>{props.restaurant.location.address}</p><br/>
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