import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { ImdbService } from './imdb.services'
import { Movie } from './objects';

@Component({
  selector: 'app-movie',
  templateUrl: './html/movie.component.html',
  providers: [ImdbService]
})
export class MovieComponent {
  movieDetails: any;
  movieSynopsis: any[];
  movieId: string;
  rating = 8.5;
  moviePoster = 'assets/images/ww.jpg';

  constructor(private route: ActivatedRoute, private imdb: ImdbService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['movie-id'];
      this.movieId = this.movieId.replace(/_/g, ' ').replace(/\[/g, '(').replace(/\]/g, ')');
      this.imdb.getMoviePoster(this.movieId, 'desktop').subscribe(data => { this.moviePoster = data.image_url; });
      this.imdb.getMovieById(this.movieId).subscribe(data => { this.movieDetails = data });
      this.imdb.getMovieSynopsis(this.movieId).subscribe(data => { this.movieSynopsis = data });
    });
  }





  // constructor(private http: Http) {
  //   http.get('https://movies.herokuapp.com/getMovieById/'+this.movieId+'?.........')
  //     .map(res => res.json())
  //     .subscribe(movies => this.movies = movies);
  // }

}