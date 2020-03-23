import React from 'react'
import {Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Movie(props) {

    console.log("Movie list", props.movieList)
    let htmlMovie = props.movieList.map((movie) => {
        return (
          <Card m="auto" style={{ width: '12rem' }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} />
            <Card.Body>
              <Card.Text>
                Rate: {movie.vote_average}
                {/* <FontAwesomeIcon icon="fas fa-star" /> */}
              </Card.Text>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.popularity}</Card.Text>
              <Card.Text>Release Dare: {movie.release_date}</Card.Text>
            </Card.Body>
          </Card>
        )
    })
    return (
        <div className="row">
            {htmlMovie}
        </div>
    )
}
