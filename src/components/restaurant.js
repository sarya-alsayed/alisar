
const Restaurant = (props) => {
  return (
    <div>
      <div onClick={() => props.handleRestaurantClick(props.restaurant)}>
        {props.restaurant.name}
      </div>
    </div>
  );
}

export default Restaurant;

