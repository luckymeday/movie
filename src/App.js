import React, { useState, useEffect } from 'react' // always set state
import MovieCard from './component/MovieCard'
// import SearchCard from './component/SearchCard'
// import UpcomingCard from './component/UpcomingCard';
// import Header from './component/UpcomingCard';
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Form, FormControl, Nav } from 'react-bootstrap';
import { Button, Dropdown } from 'react-bootstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import 'react-dropdown/style.css';
import video from "./component/cine.mp4";

import './App.css'

const apikey = process.env.REACT_APP_APIKEY

// how to define variable of state, how to define components
export default function App() {
  let [movies, setMovies] = useState([]); // for show on UI
  let [movieList, setMovieList] = useState([]); // for keep original list
  // let [upcomingList, setUpcomingList] = useState([])
  // let [searchList, setSearchList] = useState([])
  // let [moviePage, setMoviePage] = useState({});
  let [activePage, setActivePage] = useState(1);
  // let [searchTerm, setSearchTerm] = useState(null);
  let [genres, setGenres] = useState(null);
  let [ratingValue, setRatingValue] = useState({ min: 0, max: 10 });
  let [year, setYear] = useState({ min: 1980, max: 2020 });
  // let [modal, setModal] = useState(false);

  const CurrentPlaying = async (page) => {
    // page = 1;
    // setActivePage(1);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${page}`
    // let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()
    console.log("api ok?", data)
    // setMoviePage(data)
    setMovieList(data.results)
    setMovies(data.results) // data from results pass to movies >> setMovies
    setRatingValue({ min: 0, max: 10 });
    setYear({ min: 1980, max: 2020 });
  }

  const handlePageChange = (pageNumber) => {
    console.log('*--- handlePageChange: ---*')
    console.log('pageNumber:', pageNumber)
    CurrentPlaying(pageNumber)
    setActivePage(pageNumber)
  }

  // similar to componentDidMount and componentDidupdate
  useEffect(() => {
    getGenres()
  }, [])

  if (movies === null) {
    return <div>
      <h1>Loading...</h1>
    </div>
  }

  const searchByKeyword = async () => {
    setActivePage(1);
    // setUpcomingList(null)
    let keyword = document.getElementById("keyword").value
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${keyword}`
    let result = await fetch(url)
    let data = await result.json()
    // console.log("search ok?", data)
    // searchList = data.results
    // setSearchList(data.results)
    // setMoviePage(data);
    setMovies(data.results)
  }

  const getGenres = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
    let result = await fetch(url)
    let data = await result.json()
    setGenres(data.genres)
    // setMovies(data.results)
    CurrentPlaying(activePage)
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
    // setRatingValue(filteredMovies)
  }

  let yearSliderChange = (newValue) => {
    setYear(newValue);
    console.log('year:', year);
    console.log('movieList:', movieList)
    // console.log('value.min & max', ratingValue.value.min, ratingValue.value.max)
    let filteredMovies = movies.filter(movie => {
      return movie.release_date.split('-')[0] >= year.min && movie.release_date.split('-')[0] <= year.max;
    });
    console.log('filtered Movies:', filteredMovies)
    setMovies(filteredMovies);
  }

  const sortByRate = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movies.sort((a, b) => a.vote_average - b.vote_average);
    } else {
      sortedList = movies.sort((a, b) => b.vote_average - a.vote_average);
    } setMovies([...sortedList])
  }

  const sortByPupular = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movies.sort((a, b) => a.popularity - b.popularity);
    } else {
      sortedList = movies.sort((a, b) => b.popularity - a.popularity);
    } setMovies([...sortedList])
  }

  const upcomingMovie = async () => {
    // setActivePage(1);
    // setSearchList(null)
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()
    console.log("***api ok?", data)
    setMovieList(data.results)
    // setMoviePage(data)
    setMovies(data.results)
  }

  const topratedMovie = async () => {
    // setActivePage(1);
    // setSearchList(null)
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()
    // console.log("***api ok?", data)
    setMovieList(data.results)
    // setMoviePage(data)
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
            <Nav.Link href="#link" className="color-me" onClick={() => upcomingMovie()}>Upcoming</Nav.Link>
            <Nav.Link href="#link" className="color-me" onClick={() => topratedMovie()}>Top Rated</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search for a Movie" id="keyword" className="mr-sm-2" />
            <Button variant="outline-dark" className="search-button" onClick={() => searchByKeyword()}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <header>
        <div className="overlay"></div>
        <video src={video} preload="true" autoPlay="autoplay" loop="loop" volume="1" laysinline="playsinline" />
      </header>

      <section class="my-5">
        <div className="row main-zone border-red">
          <div className="range col-md-5 col-sm-12 mx-md-auto my-5 container-fluid text-white">
            <Dropdown className="text-center">
              <Dropdown.Toggle variant="link" className="dropdown" id="dropdown-basic">
                See by Rating or Popularity</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={() => sortByRate("dsc")}>Rating(high to low)</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={() => sortByRate("asc")}>Rating(low to high)</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={() => sortByPupular("dsc")}>Popularity(high to low)</Dropdown.Item>
                <Dropdown.Item href="#/action-4" onClick={() => sortByPupular("asc")}>Popularity(low to high)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <InputRange className="rating-bar"
              maxValue={10}
              minValue={0}
              value={ratingValue}
              onChange={(value) => ratingSliderChange(value)} />
            <p className="text-center bars"> ★ Rating</p>
            <InputRange className="year-bar"
              maxValue={2020}
              minValue={1980}
              value={year}
              onChange={(value) => yearSliderChange(value)} />
            <p className="text-center bars"> ✓ Year</p>
          </div>
          
          <div className="row list-area border-red">
            {movies.map(item => {
              console.log('item:', item)
              return (
                <MovieCard image={item.poster_path} title={item.original_title} releaseDate={item.release_date} rating={item.vote_average} overview={item.overview} genre={item.genre_ids} genres={genres} />)
            })}
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
      </section>

      <footer className="footer text-center">
        <p>Cinema Paradiso built by JEESUN</p>
      </footer>
    </div >
  )
}