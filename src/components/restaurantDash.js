
const RestaurantDash = (props) =>{
  return(
    <div> {!props.restaurant ? <div className="video-player">Please wait...</div> :
			<div>
    		<h4>{props.restaurant.name}</h4>
 				<h6>{props.restaurant.location.address}, {props.restaurant.location.city}</h6>
    		cuisines{props.restaurant.cuisines}, phones: {props.restaurant.phone_numbers},
    		photo<div><img src={props.restaurant.thumb} alt='Restaurant' /></div>
   			delivery:{props.restaurant.has_online_delivery} booking: {props.restaurant.has_table_booking}
   			timings: {props.restaurant.timings}
   		</div>
		}	
	</div>
 	)
}

export default RestaurantDash