import Restaurant from "./restaurant"

const RestaurantsList = (props) => {
  return (   
    <div> 
      { props.restaurants.map(item => (
        <Restaurant key={item.restaurant.id} restaurant = {item.restaurant}
          handleRestaurantClick = {props.handleRestaurantClick}
        />
    ))}
    </div>
  );
}

export default RestaurantsList
