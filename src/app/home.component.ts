import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {ImdbService} from './imdb.services'
import 'rxjs/add/operator/map';

import { Tiles } from './objects';

// const MOVIES: Tiles[] = [
//   { MovieID: "Wonder Woman (2017)", rating: { Rating: 9.5 }, image: '' },
//   { MovieID: "The Mummy (2017)", rating: { Rating: 5.5 }, image: '' },
//   { MovieID: "50 Shades Darker", rating: { Rating: 7.5 }, image: '' },
//   { MovieID: "Annabelle: Creation", rating: { Rating: 8.5 }, image: '' }
// ];

const SERIES: Tiles[] = [
  { MovieID: "Game Of Thrones", rating: { Rating: 9.5 }, image: '' },
  { MovieID: "The Flash", rating: { Rating: 7.5 }, image: '' },
  { MovieID: "Narcos", rating: { Rating: 8.5 }, image: '' },
  { MovieID: "Supernatural", rating: { Rating: 8.0 }, image: '' }
];

@Component({
  selector: 'app-home',
  templateUrl: './html/home.component.html',
  providers:[ImdbService]
})
export class HomeComponent {
  movies: any;
  series = SERIES;

  constructor(private imdb: ImdbService ){
    imdb.getMovies('Action',1,4).subscribe(data => {this.movies = data; this.getPosters(); });
  }

  getPosters(){
    this.movies.forEach(element => {
      element.image='assets/images/ww.jpg';
    });
    this.movies.forEach(element => {
      this.imdb.getMoviePoster(element.MovieID,'desktop').subscribe(data => {element.image = data.image_url;});      
    });
  }
}
