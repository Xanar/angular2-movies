import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';
import { ImdbService } from './imdb.services'
import { Tiles } from './objects';
import { PlotModalComponent } from './plot-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list',
  templateUrl: './html/list.component.html',
  providers: [ImdbService]
})
export class ListComponent {
  tiles: any;
  genre = '';
  request: any;
  page: any;
  previousPage: any;
  totalPages = 1;
  pageSize = 8;
  currentPage: any
  firstLoad = false;

  constructor(private router: Router, private route: ActivatedRoute, private imdb: ImdbService, private modalService: NgbModal) {
    this.firstLoad = true;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Defaults to 1 if no query param provided.
      this.currentPage = +params['page'] || 1;
      this.pageSize = +params['size'] || 8;
    })
    this.route.params.subscribe(params => {
      this.tiles = [];
      this.genre = '';
      if (this.request instanceof Subscriber)
        this.request.unsubscribe();
      if (params['genre'].indexOf('all_movies') != -1) {
        this.genre = 'All Movies';
        this.request = this.imdb.getMovies('Action', this.currentPage, this.pageSize).subscribe(
          data => {
            this.tiles = data.results,
              this.totalPages = data.total,
              this.getPosters(),
              this.firstLoad = false,
              this.page = this.currentPage
          }
        );
      } else if (params['genre'].indexOf('tv_series') != -1) {
        this.genre = 'TV Series';
        this.request = this.imdb.getMovies('Action', this.currentPage, this.pageSize).subscribe(
          data => {
            this.tiles = data.results,
              this.totalPages = data.total,
              this.getPosters(),
              this.firstLoad = false,
              this.page = this.currentPage
          }
        );
      } else {
        this.genre = params['genre'].charAt(0).toUpperCase() + params['genre'].slice(1);
        this.request = this.imdb.getMovies(this.genre, this.currentPage, this.pageSize).subscribe(
          data => {
            this.tiles = data.results,
              this.totalPages = data.total,
              this.getPosters(),
              this.firstLoad = false,
              this.page = this.currentPage
          }
        );
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

  onShowChange(newPageSize) {
    this.pageSize = newPageSize;
    this.router.navigate([], { queryParams: { page: this.page, size: this.pageSize } });
    this.getMovieList();
  }

  loadPage(page: number) {
    if (page !== this.previousPage && !this.firstLoad) {
      this.tiles = [];
      this.router.navigate([], { queryParams: { page: page, size: this.pageSize } });
      this.previousPage = page;
      this.getMovieList();
    }
  }

  getMovieList() {
    if (this.request instanceof Subscriber)
      this.request.unsubscribe();
    if (this.genre.indexOf('All Movies') != -1) {
      this.request = this.imdb.getMovies('Action', this.page, this.pageSize).subscribe(
        data => {
          this.tiles = data.results,
            this.totalPages = data.total,
            this.getPosters()
        }
      );
    } else if (this.genre.indexOf('TV Series') != -1) {
      this.request = this.imdb.getMovies('Action', this.page, this.pageSize).subscribe(
        data => {
          this.tiles = data.results,
            this.totalPages = data.total,
            this.getPosters()
        }
      );
    } else {
      this.request = this.imdb.getMovies(this.genre, this.page, this.pageSize).subscribe(
        data => {
          this.tiles = data.results,
            this.totalPages = data.total,
            this.getPosters()
        }
      );
    }
  }

}
