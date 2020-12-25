
const RestaurantDash = (props) =>{
  return(
    <div> {!props.restaurant ? <div>Restaurant Dashboard...</div> :
		<div className = 'dash'>
			<div className= 'imageBox'><img className = 'image' src={props.restaurant.thumb} alt='Restaurant' /></div>
			<div>
				<p className = 'restName'>{props.restaurant.name}</p>
				<p className = 'restLocation'>{props.restaurant.location.address}, {props.restaurant.location.city}</p><br/>
				<p className = 'restInfo'>CUISINES</p><p className = 'info'>{props.restaurant.cuisines}</p><br/>
				<p className = 'restInfo'>PHONE NUMBER </p><p className = 'info'>{props.restaurant.phone_numbers}</p><br/>
				<p className = 'restInfo'>TIMINGS</p> <p className = 'info'>{props.restaurant.timings}</p>
			</div>
   		</div>
		}	
		</div>
 	)
}

export default RestaurantDash