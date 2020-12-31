import React, { Component } from 'react'; 

class Reviews extends Component  {
  
  constructor(props) {
    super(props);
    this.state = {
      loaded : false,	
      reviews: null,
      error: null
    }
  }
  
  getReviews() {
    const apiUrl = `https://developers.zomato.com/api/v2.1/reviews?res_id=${this.props.restObject.id}`;
    const headers = { 
      'Content-Type': 'application/json',
      'user-key': '228ac77f20d86fa18e10986505837b57'
    } 
    fetch(apiUrl, {method:'GET',headers})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            reviews: result.user_reviews
          })
        },
        (error) => {
          this.setState({
            loaded: true,
            error: error
          })
        }
      )
  }

  componentDidMount() {
    this.getReviews();
  }

  render() {
    const {error, loaded, reviews} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!loaded) {
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
        <div>
          {reviews.map(item => (<div key={item.review.id}>
            <div className="reviews-members pt-4 pb-4">
              <div className="media">
                <img alt="Generic placeholder image" src={item.review.user.profile_image} className="mr-3 rounded-pill" />
                <div className="media-body">
                  <div className="rating float-right ml-2">
                    <h4><span className="badge badge-info" >{item.review.rating}</span></h4>
                  </div>
                  <h6 className="mb-1 text-info">{item.review.user.name}</h6>
                  <p className="text-secondary">{item.review.review_time_friendly}</p>
                  <span className="text-danger">{item.review.rating_text}</span>
                  <div>
                    <p>{item.review.review_text}</p>
                  </div>             
                </div>
              </div>
            </div>
            <hr/>
          </div>
          ) 
          )}
        </div>
      );
    }
  }
}

export default Reviews;