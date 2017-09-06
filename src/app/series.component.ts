import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Series } from './objects';

@Component({
  selector: 'app-series',
  templateUrl: './html/series.component.html'
})
export class SeriesComponent {
  seriesDetails : Series;
  seriesId: string ;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.seriesId=params['series-id']
    });
  }
  // constructor(private http: Http) {
  //   http.get('https://movies.herokuapp.com/getSeriesById/'+this.seriesId+'?.........')
  //     .map(res => res.json())
  //     .subscribe(movies => this.movies = movies);
  // }

}