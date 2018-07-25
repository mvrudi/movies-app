import React from 'react';
import { API_KEY, API_SERVER, API_POSTER } from './server'
import '../src/styles/styles.css';

export default class Search extends React.Component {
    constructor() {
        super();
    
        this.state = { 
          search:[],
          movies:[],
          movie:''
        }
      }

    listMoviesPopular = () => {

    fetch(API_SERVER + '/movie/now_playing?api_key=' + API_KEY)
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        console.log (data);
        const movieList = data.results.map((movie, i) => {
            return (
                <div key={i}>
                <div className="card card-body p-3 mt-3 mr-3 ml-3 shadow lg-3 mb-5 bg-white rounded" style={{width: 342+'px'}}>
                    <img className="card-img-top" src={`${API_POSTER}${movie.poster_path}`} alt="post 300px"/>
                    <div className="card-body">
                        <b>{movie.title}({movie.release_date})</b>
                        <br/><br/>{movie.overview}<br/><br/>
                        <b>votes: </b> {movie.vote_count} (<b>average:</b> {movie.vote_average})
                    </div>
                </div>
            </div>
            )
        })
        this.setState ({ search:[] })
        this.setState ({ movies: movieList })
        }
    );   
    }
      
    searchMovies = (e) => {
    e.preventDefault();
    let movieSearch = this.state.movie

    if (movieSearch) {
        console.log (movieSearch);
    
        fetch(API_SERVER + '/search/movie?api_key='+ API_KEY +"&query="+movieSearch)
        .then((result) => {
        return result.json();
        })
    
        .then((data) => {
        const moviesSearch = data.results.map((movie, i) => {
            return (
                <div key={i}>
                    <div className="card card-body p-3 mt-3 mr-3 shadow lg-3 mb-5 bg-white rounded" style={{width: 342+'px'}}>
                        <img className="card-img-top" src={`${API_POSTER}${movie.poster_path}`} alt="post 300px"/>
                        <div className="card-body">
                            <b>{movie.title}({movie.release_date})</b>
                            <br/><br/>{movie.overview}<br/><br/>
                            <b>votes: </b> {movie.vote_count} (<b>average:</b> {movie.vote_average})
                        </div>
                    </div>
                </div>
            )
        })
            this.setState ({ movies:[] });
            this.setState ({ search: moviesSearch });
        })
        }
    }

    handleChange = (e) => {
    const movie = e.target.value;
    this.setState ({ movie: movie });
    }

    clearMovies = (e) => {
        this.setState ({ movies: [], search:[], movie:''})
        this.refs.inputForm.value='';
    }

    render() {
        return(
            <div>
                <div id="buttons">
                    <button
                        className="btn btn-outline-dark btn-lg ml-4"
                        onClick={this.listMoviesPopular}
                        >Popular Movies
                    </button>

                    <button 
                        className="btn btn-outline-dark btn-lg ml-4"
                        onClick={ this.clearMovies }
                        >Clear
                    </button>
                </div>
                <br/>
            <div id="form">
                <form onSubmit= {this.searchMovies}>
                <input 
                        type="text" 
                        ref="inputForm"
                        className="form-control-lg col-sm-6 ml-4 mr-4"
                        onChange={this.handleChange}
                        placeholder="type your search here"
                    />
                    <br/>
                    <button 
                        className="btn btn-outline-dark btn-lg ml-4 mt-2"
                        >Find Movies
                    </button>
                </form>
            </div>
                
                <div id="results">
                    {this.state.search}
                    {this.state.movies}
                </div>
            </div>
        );
    }
}