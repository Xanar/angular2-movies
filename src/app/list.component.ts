import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Tiles } from './objects';

const MOVIES: Tiles[] = [
  { title: "Wonder Woman (2017)", rating: 9.5, image: '' },
  { title: "The Mummy (2017)", rating: 5.5, image: '' },
  { title: "50 Shades Darker", rating: 7.5, image: '' },
  { title: "Annabelle: Creation", rating: 8.5, image: '' },
  { title: "The Mummy (2017)", rating: 5.5, image: '' },
  { title: "50 Shades Darker", rating: 7.5, image: '' },
  { title: "Annabelle: Creation", rating: 8.5, image: '' },
  { title: "Annabelle: Creation", rating: 8.5, image: '' }
];

@Component({
  selector: 'app-list',
  templateUrl: './html/list.component.html'
})
export class ListComponent {
  movies = MOVIES;
  genre = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['genre'].indexOf('all_movies') != -1) {
        this.genre = 'All Movies'
      } else if (params['genre'].indexOf('tv_series') != -1) {
        this.genre = 'TV Series'
      } else {
        this.genre = params['genre'].charAt(0).toUpperCase() + params['genre'].slice(1);;
      }
    });
  }
  // constructor(private http: Http) {
  //   http.get('https://movies.herokuapp.com/movies/'+this.genre+'?.........')
  //     .map(res => res.json())
  //     .subscribe(movies => this.movies = movies);
  // }

}
