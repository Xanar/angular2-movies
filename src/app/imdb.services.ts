import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ImdbService {
  _baseUrl = "https://imdb-swagger.herokuapp.com/v1";
  constructor(
    private http: Http
  ) { }

  getMovies(genre, page, count) {
    return this.http.get(this._baseUrl + '/movie/list/' + genre + '?page=' + page + '&count=' + count)
      .map((res: Response) => res.json());
  }

  getMovieById(movieId) {
    return this.http.get(this._baseUrl + '/movie/' + movieId)
      .map((res: Response) => res.json());
  }
  getCastmovieId(movieId) {
    return this.http.get(this._baseUrl + '/movie/' + movieId)
      .map((res: Response) => res.json());
  }
  getMovieSynopsis(movieId) {
    return this.http.get(this._baseUrl + '/movie/' + movieId + '/getMovieDoc?type=plot')
      .map((res: Response) => res.json());
  }

  search(terms: Observable<string>, searchType: Observable<string>, limit) {
    let type;
    searchType.subscribe(stype => type=stype);
    return terms.debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(term => this.getSearchKeys(term, type, limit));
  }
  getSearchKeys(searchValue, type, limit) {
    return this.http.get(this._baseUrl + '/search/' + type + '?name=' + searchValue + '&limit=' + limit)
      .map((res: Response) => res.json());
  }
}