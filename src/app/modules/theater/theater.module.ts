import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesDashboardComponent } from './components/movies-dashboard/movies-dashboard.component';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { TheaterRoutingModule } from './theater-routing.module';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MoviesSearchComponent } from './components/movies-search/movies-search.component';

@NgModule({
  declarations: [
    MoviesDashboardComponent,
    MoviesGridComponent,
    MoviesSearchComponent
  ],
  imports: [ 
    CommonModule,
    TheaterRoutingModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSnackBarModule],
  providers: [ {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4000}}],
  exports: []
})
export class TheaterModule {}
