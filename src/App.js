import React from 'react';
import './App.css';
import { BASE_URL, API_KEY, NOW_PLAYING } from './constant/Constants'



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Movies: [],
      Page: 1
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    fetch(BASE_URL + NOW_PLAYING + "?api_key=" + API_KEY + "&page=" + this.state.Page)
      // fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=d70789f6adbe0108ea7b4cfa61b6c198")
      .then(res => res.json())
      .then((data) => {
        let currentMovies = this.state.Movies;
        currentMovies = [...currentMovies, ...data.results]
        //this.setState({ Movies: data })
        this.setState({ Movies: currentMovies })
        //  alert(JSON.stringify(data))
      })
  }

  showMovies = () => {
    if (this.state.Movies !== null) {
      let moviesGrid = [];
      this.state.Movies.map((item) => {
        let row =
          <div className="">

            <img src={"http://image.tmdb.org/t/p/w185/" + item.poster_path}
              style={{ "height": "325px", "width": window.innerWidth / 4, "background-color": "red" }} />

            <div className="row">
              <div className="col">{item.title}</div>
              <div className="col">Language: {item.original_language}</div>
            </div>
            <div className="row" ml-5>
              <div className="col">❤️ {item.vote_average}%</div>
              <div className="col">Vote: {item.vote_count}</div>
            </div>
          </div>
        moviesGrid.push(
          <div>{row}</div>

        
        
        )
      })
      return moviesGrid
    }
  }

  onMoreClick = () => {
    this.setState({ ...this.state, Page: this.state.Page + 1 }, () => { this.getMovies() });
  }

  render() {
    return (
      <div className="">
        <nav className="navbar navbar-danger bg-danger">
          <span className="navbar-brand mb-0 h2">
            <h2>BookMyShow</h2>
          </span>
        </nav>
        <div className="bg-form" >
          <div className="row">
            {this.showMovies()}
          </div>
        </div>
        <div>
          <input type='button' className="btn btn-primary form-control" onClick={() => { this.onMoreClick() }} value='Find More' />
        </div>
      </div>
    );
  }
}
export default App;
