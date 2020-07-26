import React, { useState, useEffect } from 'react' // always set state
import MovieCard from './component/MovieCard'
// import SearchCard from './component/SearchCard'
// import UpcomingCard from './component/UpcomingCard';
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Form, FormControl, Nav } from 'react-bootstrap';
// import { Jumbotron, Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import video from "./component/cine.mp4";
// import ReactModal from 'react-modal';
import './App.css'

const apikey = process.env.REACT_APP_APIKEY

// how to define variable of state, how to define components
export default function App() {
  let [movies, setMovies] = useState([]); // for show on UI
  let [movieList, setMovieList] = useState([]); // for keep original list
  let [upcomingList, setUpcomingList] = useState([])
  let [searchList, setSearchList] = useState([])
  let [moviePage, setMoviePage] = useState({});
  let [activePage, setActivePage] = useState(1);
  let [searchTerm, setSearchTerm] = useState(null);
  let [ratingValue, setRatingValue] = useState({ min: 0, max: 10 });
  // let [modal, setModal] = useState(false);

  const CurrentPlaying = async (page) => {
    // page = 1;
    // setActivePage(1);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${page}`
    // let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()
    // console.log("api ok?", data)
    setMoviePage(data)
    setMovieList(data.results)
    setMovies(data.results) // data from results pass to movies >> setMovies
    setRatingValue({ min: 0, max: 10 });
  }

  // let openModal = async (movieID) => {
  //   let url = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apikey}&language=en-US`;
  //   let result = await fetch(url);
  //   let data = await result.json();
  //   setModal(true);
  // }

  // PAGINATION code not working 
  // const handlePageChange = async (pageNumber) => {
  //   setActivePage(pageNumber);
  //   let url = ''
  //   if (searchTerm) {
  //     url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apikey}&language=en-US&page=${pageNumber}`
  //   }
  //   // else (upcomingList) {
  //   //   url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=${pageNumber}`
  //   // }
  //   let result = await fetch(url)
  //   let data = await result.json()
  //   setMovies(data.results)
  // }
  const handlePageChange = (pageNumber) => {
    console.log('*--- handlePageChange: ---*')
    console.log('pageNumber:', pageNumber)
    CurrentPlaying(pageNumber)
    setActivePage(pageNumber)
  }

  // similar to componentDidMount and componentDidupdate
  useEffect(() => {
    CurrentPlaying(1)
  }, [])

  if (movies === null) {
    return <div>
      <h1>Loading...</h1>
    </div>
  }

  // SEARCH code not working
  // const searchByKeyword = async (keyword) => {
  //   setActivePage(1);
  //   setSearchTerm(keyword);
  //   setUpcomingList(null)
  //   if (keyword === '') {
  //     setMovies(movieList);
  //   } else {
  //     setMovies(movies.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase())));
  //     let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${keyword}`
  //     let result = await fetch(url)
  //     let data = await result.json()
  //     // console.log("search ok?", data)
  //     // searchList = data.results
  //     setMoviePage(data);
  //     setMovies(data.results);
  //   }
  // }
  const searchByKeyword = async () => {
    setActivePage(1);
    setUpcomingList(null)
    let keyword = document.getElementById("keyword").value
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${keyword}`
    let result = await fetch(url)
    let data = await result.json()
    // console.log("search ok?", data)
    // searchList = data.results
    setSearchList(data.results)
    setMoviePage(data);
    setMovies(data.results)
  }

  let ratingSliderChange = (newValue) => {
    setRatingValue(newValue);
    console.log('rating value:', ratingValue);
    console.log('movieList:', movieList)
    // console.log('value.min & max', ratingValue.value.min, ratingValue.value.max)
    let filteredMovies = movies.filter(movie => {
      return movie.vote_average >= ratingValue.min && movie.vote_average <= ratingValue.max;
    });
    console.log('filtered Movies:', filteredMovies)
    setMovies(filteredMovies);
  }

  const upcomingMovie = async () => {
    // setActivePage(1);
    setSearchList(null)
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()
    console.log("***api ok?", data)
    setMovieList(data.results)
    setMoviePage(data)
    setMovies(data.results)
  }

  // how to send data from App.js >> MovieCard (vice versa)
  // embed map to make a new array from numerous multiple results
  return (
    <div className="body container-fluix border-red">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="index.html" className="navbar-main color-me">Cinema Paradiso</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="index.html" className="color-me">Now Showing</Nav.Link>
            <Nav.Link href="#link" className="color-me" onClick={() => upcomingMovie()}>Upcoimg Movies</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search for a Movie" id="keyword" className="mr-sm-2" />
            <Button variant="outline-dark" className="search-button" onClick={() => searchByKeyword()}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      {/* <Jumbotron fluid className="bground">
        <Container>
          <div class="overlay">
            <div className="video-container">
              <video src={video} playsinline="playsinline" preload="true" autoPlay="autoplay" width="1080" loop="loop" volume="1" />
            </div></div>
        </Container>
      </Jumbotron> */}
      {/* 
      <div className="header-container">
        <div className="video-container">
          <div className="video-container">
            <video src={video} preload="true" autoPlay="autoplay" width="1200" loop="loop" volume="1" />
          </div>
        </div>
      </div> */}
      <header>
        <div className="overlay"></div>
        <video src={video} preload="true" autoPlay="autoplay" loop="loop" volume="1" laysinline="playsinline" />
        {/* <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
          <source src="cine.mp4" type="video/mp4" /></video> */}
        {/* <div className="container h-100">
          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white">
              <h1 className="display-3">Cinama Paradiso</h1>
              <p className="lead mb-0">Cinama Paradiso</p>
            </div>
          </div>
        </div> */}
      </header>

      <section class="my-5">
        {/* <div class="container"> */}
        {/* <div class="row"> */}
        {/* <div class="col-md-8 mx-auto"> */}
        <div className="row main-zone border-red">

          <div className="range col-md-5 col-sm-12 mx-md-auto my-5 container-fluid text-white rating-bar">
            <InputRange
              maxValue={10}
              minValue={0}
              value={ratingValue}
              onChange={(value) => ratingSliderChange(value)} />
            <p className="text-center"> ★ Rating</p>
          </div>

          <div className="row list-area border-red">
            {movies.map(item => {
              return (
                <MovieCard image={item.poster_path} title={item.original_title} releaseDate={item.release_date} rating={item.vote_average} />
              )
            })}
            {/* <div className="text-white d-flex justify-content-center mt-5">
              <ReactModal
                isOpen={modal}
                style={{ overlay: { display: "flex", justifyContent: "center", backgroundClip: "green" }, content: { width: "70%", height: "70%", position: "relative", margin: "auto" } }}
                onRequestClose={() => setModal(false)}>
              </ReactModal></div> */}

            {/* <div className="row search-area border-red">
              {searchList.map(item => {
                return (
                  <SearchCard image={item.poster_path} title={item.original_title} releaseDate={item.release_date} />
                )
              })}</div> */}
            {/* <div className="row upcoming-area border-red">
              {upcomingList.map(item => {
                return (
                  <UpcomingCard image={item.poster_path} title={item.original_title} releaseDate={item.release_date} />
                )
              })} </div> */}
          </div>

          <div className="pagination border-red">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              onChange={(pageNumber) => handlePageChange(pageNumber)}
              itemClass="page-item"
              linkClass="page-link" />
          </div>
        </div>
        {/* </div>
        </div> */}
      </section>
    </div >
  )
}