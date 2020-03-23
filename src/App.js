import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.png";
import Movie from "./components/Movie";
import ReactModal from "react-modal";
import YouTube from "@u-wave/react-youtube";
import Pagination from "react-js-pagination";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
// import Trend from './components/Trend'
import {
  Navbar,
  Form,
  FormControl,
  Button,
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
let videoKey = "";

function App() {
  let [movie, setMovie] = useState(null);
  let [toggleModal, setToggleModal] = useState(false);
  let [videoResults, setVideoResults] = useState(false);
  let [rate, setRate] = useState(0);
  let [page, setPage] = useState(1);
  let [totalResult, setTotalResult] = useState(0);

  let currentPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    let data = await fetch(url);
    let dataResult = await data.json();
    setTotalResult(dataResult.total_results)
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

  let searchByRate = (value) => {
    console.log("value", value)
    setRate(value);
    let filteredData = movieList.filter((movie)=>movie.vote_average>=value)
    setMovie(filteredData)
  }

  let handlePageChange = async pageNumber => {
    console.log(`active page is ${pageNumber}`);
    setPage(pageNumber);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNumber}`;
    let data = await fetch(url);
    let dataResult = await data.json();
    console.log("result:", dataResult);
    movieList = dataResult.results;
    setMovie(movieList);
    
  }

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

  let loadVideo = async videoId => {
    console.log("videoId: ", videoId);
    let url = `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${apiKey}&language=en-US`;
    let data = await fetch(url);
    let response = await data.json();

    if (response.results !== null && response.results.length !== 0) {
      console.log("video id: ", response.results[0].key);
      console.log(response);
      videoKey = response.results[0].key;
      setVideoResults(response);
    } else {
      console.log("no video key found");
      setVideoResults(null);
    }
    setToggleModal(true);
  };
  // console.log(videoResults);
  return (
    <div className="App">
      <ReactModal
        closeTimeoutMS={1200}
        isOpen={toggleModal}
        onRequestClose={() => setToggleModal(false)}
        style={{
          overlay: {},
          contents: {
            width: "70%",
            height: "70%"
          }
        }}
      >
        {videoResults !== null ? (
          <YouTube video={videoKey} height="100%" width="100%" autoplay />
        ) : (
          "No Video Results found"
        )}
      </ReactModal>
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
      <Container className="inputContainer">
      <InputRange className="inputRange"
        maxValue={10}
        minValue={0}
        value={rate}
        onChange={value => searchByRate(value)} 
      /> 
      </Container>

      {/* This is trending section, but not finish yet */}
      {/* <Col>
        <Trend trendList ={trend}/>
      </Col> */}

      {/* <Carousel>
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
      </Carousel> */}

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
            <Movie movieList={movie} parentMethod={loadVideo} />
          </Col>
        </Row>
      </Container>
      <Container className="loadmore">
      <Pagination
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={totalResult}
          pageRangeDisplayed={5}
          onChange={handlePageChange.bind(this)}
          itemClass="page-item"
          linkClass="page-link"
        />
      </Container>
    </div>
  );
}

export default App;
