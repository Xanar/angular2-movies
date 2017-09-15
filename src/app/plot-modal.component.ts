import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plot-modal',
  templateUrl: './html/plot-modal.component.html',
  styles: []
})
export class PlotModalComponent implements OnInit {
  @Input() title;
  @Input() plot;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
