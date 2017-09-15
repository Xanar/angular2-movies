import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './CustomUrlSerializer';
import { AppRoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ListComponent } from './list.component';
import { MovieComponent } from './movie.component';
import { SeriesComponent } from './series.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlotModalComponent } from './plot-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    MovieComponent,
    SeriesComponent,
    PlotModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [{ provide: UrlSerializer, useClass: CustomUrlSerializer }, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [PlotModalComponent]
})
export class AppModule { }
