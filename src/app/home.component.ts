import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Tiles } from './objects';

const MOVIES: Tiles[] = [
  { title: "Wonder Woman (2017)", rating: 9.5, image: '' },
  { title: "The Mummy (2017)", rating: 5.5, image: '' },
  { title: "50 Shades Darker", rating: 7.5, image: '' },
  { title: "Annabelle: Creation", rating: 8.5, image: '' }
];

const SERIES: Tiles[] = [
  { title: "Game Of Thrones", rating: 9.5, image: '' },
  { title: "The Flash", rating: 7.5, image: '' },
  { title: "Narcos", rating: 8.5, image: '' },
  { title: "Supernatural", rating: 8.0, image: '' }
];

@Component({
  selector: 'app-home',
  templateUrl: './html/home.component.html'
})
export class HomeComponent {
  movies = MOVIES;
  series = SERIES;

  // constructor(private http: Http) {
  //   http.get('https://movies.herokuapp.com/movies')
  //     .map(res => res.json())
  //     .subscribe(response => this.movies = response);
  //    
  //   http.get('https://movies.herokuapp.com/series')
  //     .map(res => res.json())
  //     .subscribe(repsonse => this.series = response);
  // }

}
