import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {UrlSerializer} from '@angular/router';
import {CustomUrlSerializer} from './CustomUrlSerializer';
import { AppRoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ListComponent } from './list.component';
import { MovieComponent } from './movie.component';
import { SeriesComponent } from './series.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    MovieComponent,
    SeriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [{ provide: UrlSerializer, useClass: CustomUrlSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
