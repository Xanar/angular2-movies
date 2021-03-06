import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ImdbService } from './imdb.services'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


declare var particlesJS: any;
@Component({
  selector: 'app-root',
  templateUrl: './html/app.component.html',
  styleUrls: ['./css/app.component.css'],
  providers: [ImdbService]
})
export class AppComponent implements OnInit {
  searchType = 'movie';
  selectedNavItem = 'home'
  searchValue: any;
  searchTerm$ = new Subject<string>();
  searchType$ = new Subject<string>();

  constructor(private imdb: ImdbService, private router: Router) {
    this.search();
  }

  searchOptions(searchEvent, dropdown) {
    let searchVal = searchEvent.target.value
    if (dropdown.isOpen) {
      this.searchValue = [];
    }
    if (searchVal.trim() === '') {
      dropdown.close();
      this.searchValue = [];
    } else {
      dropdown.open();
      this.searchTerm$.next(searchVal);
      this.searchType$.next(this.searchType);
    }
  }

  search() {
    this.imdb.search(this.searchTerm$, this.searchType$, 10).subscribe((data) => { this.searchValue = data }, (err) => { console.log(err), this.search(); });
  }


  navListClick(event, newValue) {
    this.selectedNavItem = newValue;
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof RoutesRecognized) {
        if (evt.state.root.firstChild.params.genre)
          this.selectedNavItem = evt.state.root.firstChild.params.genre;
        else if (evt.url == '/home')
          this.selectedNavItem = 'home'
        else
          this.selectedNavItem = '';
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0)
    });


    particlesJS('particles-js', { "particles": { "number": { "value": 350, "density": { "enable": true, "value_area": 700 } }, "color": { "value": "#f5deb3" }, "shape": { "type": "star", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "http://wiki.lexisnexis.com/academic/images/f/fb/Itunes_podcast_icon_300.jpg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 5, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "bottom-right", "random": false, "straight": true, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "grab" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }, null);
  }
}
