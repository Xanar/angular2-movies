import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Movie } from './objects';

@Component({
  selector: 'app-movie',
  templateUrl: './html/movie.component.html'
})
export class MovieComponent {
  movieDetails : Movie;
  movieId: string ;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.movieId=params['movie-id']
    });
  }
  // constructor(private http: Http) {
  //   http.get('https://movies.herokuapp.com/getMovieById/'+this.movieId+'?.........')
  //     .map(res => res.json())
  //     .subscribe(movies => this.movies = movies);
  // }

}