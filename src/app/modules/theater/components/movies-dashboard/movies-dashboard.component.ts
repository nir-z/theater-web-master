import { Component, AfterViewInit } from '@angular/core';
import { IMovie } from 'src/app/modules/models/movie';
import { MoviesService } from 'src/app/modules/theater/services/movies.service';
import { MatTableDataSource } from '@angular/material/table';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-movies-dashboard',
  templateUrl: './movies-dashboard.component.html',
  styleUrls: ['./movies-dashboard.component.scss']
})



export class MoviesDashboardComponent implements AfterViewInit {

  public dataSource: MatTableDataSource<IMovie>;
  moviesDataSubject: Subject<MatTableDataSource<IMovie>> = new Subject();

  constructor(private movieService: MoviesService) { }

  ngAfterViewInit(): void {

     this.movieService.getMovies().subscribe(res => 
      { 
        this.dataSource = new MatTableDataSource(res); 
        this.moviesDataSubject.next(this.dataSource);
      }
    );
  }

  //subscribed event function from movie search component
  onMovieAdded(evt: IMovie){
    this.dataSource.data.push(evt);
    this.dataSource.data =  [...this.dataSource.data];
  }



}
