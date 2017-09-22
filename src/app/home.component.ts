import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ImdbService } from './imdb.services';
import { PlotModalComponent } from './plot-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  providers: [ImdbService]
})
export class HomeComponent {
  movies: any;
  series = SERIES;

  constructor(private imdb: ImdbService, private modalService: NgbModal) {
    imdb.getMovies('Action', 1, 4).subscribe(data => { this.movies = data.results; this.getPosters(); });
  }

  getPosters() {
    this.movies.forEach(element => {
      element.image = 'assets/images/placeholder.png';
    });
    this.movies.forEach(element => {
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

  // readSeriesDetails(SeriesID) {
  //   const modalRef = this.modalService.open(PlotModalComponent);
  //   modalRef.componentInstance.title=SeriesID;
  //   this.imdb.getSeriesSynopsis(SeriesID).subscribe(data => { modalRef.componentInstance.plot=data;});
  // }

}
