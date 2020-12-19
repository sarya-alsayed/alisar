
const Restaurant = (props) => {
  return (
    <div className = 'sidebar'>
      <a href = '#restaurant' onClick={() => props.handleRestaurantClick(props.restaurant)}>
        {props.restaurant.name}
      </a>
    </div>
  );
}

export default Restaurant;

