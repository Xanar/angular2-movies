import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';
import { ImdbService } from './imdb.services'
import { Tiles } from './objects';
import { PlotModalComponent } from './plot-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  request: any;
  constructor(private route: ActivatedRoute, private imdb: ImdbService, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tiles = [];
      this.genre = '';
      if(this.request instanceof Subscriber)
        this.request.unsubscribe();
      if (params['genre'].indexOf('all_movies') != -1) {
        this.genre = 'All Movies';
        this.request = this.imdb.getMovies('Action', 1, 8).subscribe(data => { this.tiles = data, this.getPosters(); });
      } else if (params['genre'].indexOf('tv_series') != -1) {
        this.genre = 'TV Series';
        this.request = this.imdb.getMovies('Action', 1, 8).subscribe(data => { this.tiles = data, this.getPosters(); });
      } else {
        this.genre = params['genre'].charAt(0).toUpperCase() + params['genre'].slice(1);;
        this.request = this.imdb.getMovies(this.genre, 1, 8).subscribe(data => { this.tiles = data, this.getPosters(); });
      }
    });
  }
  getPosters() {
    this.tiles.forEach(element => {
      element.image = 'assets/images/placeholder.png';
    });
    this.tiles.forEach(element => {
      this.imdb.getMoviePoster(element.MovieID, 'desktop').subscribe(data => { element.image = data.image_url; });
    });
  }

  readMovieDetails(MovieID) {
    const modalRef = this.modalService.open(PlotModalComponent);
    modalRef.componentInstance.title = MovieID;
    this.imdb.getMovieSynopsis(MovieID)
      .subscribe(
      data => {
        modalRef.componentInstance.plot = data[0].DocText;
      },
      err => {
        modalRef.componentInstance.plot = "Plot Not Available"
      }
      );
  }

}
