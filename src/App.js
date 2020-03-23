import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.png";
import Movie from "./components/Movie";
// import Trend from './components/Trend'
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Dropdown,
  Container,
  Row,
  Col,
  Carousel,
  Spinner,
  ListGroup
} from "react-bootstrap";
//Testing branch commit

require("dotenv").config();

let apiKey = `f752f095c87a67b8ca8b17c5e3810382`;
let keyword = "";
let movieList = []; // keep the original movie list
// let trendList = []
let page = 1;

function App() {
  let [movie, setMovie] = useState(null);
  let currentPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    let data = await fetch(url);
    let dataResult = await data.json();
    console.log("result:", dataResult);
    movieList = dataResult.results;
    setMovie(movieList);
  };

  useEffect(currentPlaying, []);

  // Trending section, not finish yet

  // let [trend, setTrend] = useState(null);
  // let trendingMovie = async () => {
  //   let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
  //   let data = await fetch(url)
  //   let trendingResult = await data.json()
  //   console.log("trend:", trendingResult)
  //   trendList = trendingResult.results
  //   setTrend(trendList);
  // }

  // useEffect(trendingMovie,[]);

  if (movie == null) {
    return (
      <div>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  let searchByKeyword = e => {
    //function to search by keyword
    keyword = e.target.value;
    if (keyword === "") {
      setMovie(movieList);
    } else {
      setMovie(
        movie.filter(movie =>
          movie.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  };

  let loadMore = async () => {
    page++;
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    let data = await fetch(url);
    let dataResult = await data.json();
    setMovie(movie.concat(dataResult.results));
  };

  let sortMostPopular = () => {
    let sortedMovie = [...movie].sort((a, b) => b.popularity - a.popularity);
    setMovie(sortedMovie);
  };

  let sortLeastPopular = () => {
    let sortedMovie = [...movie].sort((a, b) => a.popularity - b.popularity);
    setMovie(sortedMovie);
  };

  let sortMostRating = () => {
    let sortedMovie = [...movie].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setMovie(sortedMovie);
  };

  let sortLeastRating = () => {
    let sortedMovie = [...movie].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setMovie(sortedMovie);
  };

  return (
    <div className="App">
      <Navbar className="Navbar" m="auto" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="100"
            height="100"
            className="d-inline-block"
          />
          Top Movie
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={e => searchByKeyword(e)}
          />
        </Form>
      </Navbar>

      {/* This is trending section, but not finish yet */}
      {/* <Col>
        <Trend trendList ={trend}/>
      </Col> */}

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./starwars.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="" alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="" alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container fluid>
        <Row>
          <Col md={2}>
            <ListGroup variant="flush">
              <Button variant="outline-light" onClick={() => sortMostPopular()}>
                Most Popular
              </Button>
              <Button
                variant="outline-light"
                onClick={() => sortLeastPopular()}
              >
                Least Popular
              </Button>
              <Button variant="outline-light" onClick={() => sortMostRating()}>
                Most Rating
              </Button>
              <Button variant="outline-light" onClick={() => sortLeastRating()}>
                Least Rating
              </Button>
            </ListGroup>
          </Col>
          <Col md={10}>
            <Movie movieList={movie} />
          </Col>
        </Row>
      </Container>
      <Container className="loadmore">
        <Button onClick={() => loadMore()}>Load More</Button>
      </Container>
    </div>
  );
}

export default App;
