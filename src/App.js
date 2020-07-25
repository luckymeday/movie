import React, { useState, useEffect } from 'react' // always set state
import './App.css'
import MovieCard from './component/MovieCard'
import SearchCard from './component/SearchCard'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactDOM from "react-dom";
// import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
import { Navbar, Form, FormControl, Nav } from 'react-bootstrap';
import { Jumbotron, Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
const apikey = process.env.REACT_APP_APIKEY

export default function App() {
  let [movieList, setMovieList] = useState(null) // how to define variable of state, how to define components
  // let [upcomingList, setUpcomingList] = useState(null)
  let [searchList, setSearchList] = useState([]) // ******************************** why empty array? not null? ******************************** 
  let [page, setActivePage] = useState(1);
  const callMovie = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`
    let result = await fetch(url)
    let data = await result.json()
    // console.log("api ok?", data)
    setMovieList(data.results) // data from results pass to MovieList >> setMovieList
  }

  // similar to componentDidMount and componentDidupdate
  useEffect(() => {
    callMovie()
  }, [])

  if (movieList === null) {
    return <div>
      <h1>Loading...</h1>
    </div>
  }

  const searchByKeyword = async () => {
    let keyword = document.getElementById("keyword").value
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${keyword}`
    let result = await fetch(url)
    let data = await result.json()
    // console.log("search ok?", data)
    searchList = data.results
    setMovieList(data.results)
  }

  // const upcomingMovie = async () => {
  //   let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`
  //   let result = await fetch(url)
  //   let data = await result.json()
  //   // console.log("api ok?", data)
  //   upcomingList = data.results
  //   setUpcomingList(data.results) // data from results pass to MovieList >> setMovieList
  // }

  // pagination
  // let handlePageChange = async (pageNumber) => {
  //   setActivePage(pageNumber);
  //   console.log(`active page is ${pageNumber}`);
  //   console.log('key current is:', key);
  //   let url = ''
  //   if (movieList) {
  //     url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${pageNumber}`
  //   }
  //   else if (searchList) {
  //     url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${keyword}&page=${pageNumber}`
  //   }
  //   else (upcomingList) {
  //     url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=${pageNumber}`
  //   }
  //   let result = await fetch(url)
  //   let data = await result.json()
  //   setMovieList(data.results)
  // }

  // how to send data from App.js >> MovieCard (vice versa)
  // embed map to make a new array from numerous multiple results
  return (
    <div className="container-fluix border-red">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="index.html">Cinema Paradiso</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#link">Now Showing</Nav.Link>
            {/* <Nav.Link href="#link" onClick={() => upcomingMovie()}>Upcoimg Movies</Nav.Link> */}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search for a Movie" id="keyword" className="mr-sm-2" />
            <Button variant="outline-dark" onClick={() => searchByKeyword()}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron fluid>
        <Container>
          <h1>Cinema Paradiso</h1>
          <p>
            Put comments.</p>
        </Container>
      </Jumbotron>
      <div className="row main-zone border-red">
        {/* <div className="row upcoming-area border-red">
          {upcomingList.map(item => {
            return (
              <SearchCard image={item.poster_path} title={item.original_title} releaseDate={item.release_date} />
            )
          })}
        </div> */}
        <div className="row search-area border-red">
          {searchList.map(item => {
            return (
              <SearchCard image={item.poster_path} title={item.original_title} releaseDate={item.release_date} />
            )
          })}
        </div>
        <div className="row list-area border-red">
          {movieList.map(item => {
            return (
              <MovieCard image={item.poster_path} title={item.original_title} releaseDate={item.release_date} />
            )
          })}
        </div>

        {/* <Pagination className="pagination m-5 p-5"
          prevPageText='prev'
          nextPageText='next'
          firstPageText='first'
          lastPageText='last'
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={moviePage.total_results}
          onChange={(pageNumber) => handlePageChange(pageNumber)}
          itemClass="page-item"
          linkClass="page-link"
        /> */}
      </div>
    </div>
  )
}
