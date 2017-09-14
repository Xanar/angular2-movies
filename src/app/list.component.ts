import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { ImdbService } from './imdb.services'
import { Tiles } from './objects';

// const MOVIES: Tiles[] = [
//   { MovieID: "Wonder Woman (2017)", rating: { Rating: 9.5 }, image: '' },
//   { MovieID: "The Mummy (2017)", rating: { Rating: 5.5 }, image: '' },
//   { MovieID: "50 Shades Darker", rating: { Rating: 7.5 }, image: '' },
//   { MovieID: "Annabelle: Creation", rating: { Rating: 8.5 }, image: '' },
//   { MovieID: "Wonder Woman (2017)", rating: { Rating: 9.5 }, image: '' },
//   { MovieID: "The Mummy (2017)", rating: { Rating: 5.5 }, image: '' },
//   { MovieID: "50 Shades Darker", rating: { Rating: 7.5 }, image: '' },
//   { MovieID: "Annabelle: Creation", rating: { Rating: 8.5 }, image: '' }
// ];

@Component({
  selector: 'app-list',
  templateUrl: './html/list.component.html',
  providers: [ImdbService]
})
export class ListComponent {
  tiles: any;
  genre = '';
  constructor(private route: ActivatedRoute, private imdb: ImdbService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['genre'].indexOf('all_movies') != -1) {
        this.genre = 'All Movies';
        this.imdb.getMovies('Action', 1, 8).subscribe(data => { this.tiles = data, this.getPosters(); });
      } else if (params['genre'].indexOf('tv_series') != -1) {
        this.genre = 'TV Series';
        this.imdb.getMovies('Action', 1, 8).subscribe(data => { this.tiles = data, this.getPosters(); });
      } else {
        this.genre = params['genre'].charAt(0).toUpperCase() + params['genre'].slice(1);;
        this.imdb.getMovies(this.genre, 1, 8).subscribe(data => { this.tiles = data, this.getPosters(); });
      }
    });
  }
  getPosters() {
    this.tiles.forEach(element => {
      element.image = 'assets/images/ww.jpg';
    });
    this.tiles.forEach(element => {
      this.imdb.getMoviePoster(element.MovieID, 'desktop').subscribe(data => { element.image = data.image_url; });
    });
  }

}
