
const RestaurantDash = (props) =>{
  return(
    <div> {!props.restaurant ? <div>Restaurant Dashboard...</div> :
		<div className = 'dash'>
			<div className= 'imageBox'><img className = 'image' src={props.restaurant.thumb} alt='Restaurant' /></div>
			<div>
				<p className = 'restName'>{props.restaurant.name}</p>
				<p className = 'restLocation'>{props.restaurant.location.address}, {props.restaurant.location.city}</p><br/><br/>
				<p className = 'restInfo'>CUISINES</p><p className = 'info'>{props.restaurant.cuisines}</p><br/><br/>
				<p className = 'restInfo'>PHONE NUMBER </p><p class = 'info'>{props.restaurant.phone_numbers}</p><br/><br/>
				<br/>
				delivery:{props.restaurant.has_online_delivery} booking: {props.restaurant.has_table_booking}
				timings: {props.restaurant.timings}
			</div>
			
   		</div>
		}	
	</div>
 	)
}

export default RestaurantDash