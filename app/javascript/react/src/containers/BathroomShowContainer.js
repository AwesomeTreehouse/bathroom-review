import React, { Component } from 'react'
import BathroomTile from '../components/BathroomTile'
import SearchBar from '../components/SearchBar'
import BathroomInfo from '../components/BathroomInfo'
import ReviewTile from '../components/ReviewTile'

class BathroomShowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      bathroomInfo: {},
      reviewInfo: [],
      user: {}
    }
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount(){
    let bathroomId = this.props.params.id
    fetch(`/api/v1/bathrooms/${bathroomId}`)
    .then(response => response.json())
    .then(body => {
      this.setState({
        bathroomInfo: body.bathrooms,
        reviewInfo: body.reviews
       })
    })

    fetch(`/api/v1/users.json`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ user: body })
    })
  }

  handleDelete(id) {
    fetch(`/api/v1/bathrooms/${id}`, {
      credentials: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: 'delete'
    })
  }


  render(){
    let reviews = this.state.reviewInfo;
    let parsed_reviews;
    if (reviews.length !== 0) {
      parsed_reviews = reviews.map(review => {
        return(
          <ReviewTile
            key={review.review_info.id}
            id={review.review_info.id}
            city={review.user_info.city}
            state={review.user_info.state}
            username={review.user_info.username}
            createdAt={review.review_created_at}
            rating={review.review_info.rating}
            body={review.review_info.body}
            profilePhoto={review.user_info.profile_photo.url}
            currentUser={this.state.user}
            votes={review.review_votes}
          />
        )
      })
    }

    if (this.state.bathroomInfo.id == this.state.user.id || this.state.user.role == "admin") {
      return(
        <div>
          <BathroomInfo
            bathroomInfo={this.state.bathroomInfo}
          />
          <div className="button" onClick={this.handleDelete(this.state.bathroomInfo.id)}>ButtonDiv!</div>
          {parsed_reviews}
        </div>
      )
    } else {
      return(
        <div>
          <BathroomInfo
            bathroomInfo={this.state.bathroomInfo}
          />
          {parsed_reviews}
        </div>
      )
    }
    end
  }
}

export default BathroomShowContainer;
