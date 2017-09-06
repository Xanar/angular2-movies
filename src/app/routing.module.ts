import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ListComponent } from './list.component';
import { MovieComponent} from './movie.component';
import { SeriesComponent} from './series.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'list/:genre', component: ListComponent },
    { path: 'movie/:movie-id', component: MovieComponent },
    { path: 'series/:series-id', component: SeriesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }