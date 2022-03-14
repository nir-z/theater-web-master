import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { IMovie } from '../../../models/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {Subject} from 'rxjs';





@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})


export class MoviesGridComponent implements OnInit {

  DEFAULT_PAGE_SIZE = 20;

  displayedColumns= ["id", "title", "original_language", "popularity", "release_date"];
  moviesData!: MatTableDataSource<IMovie>;

  //external grid data source
  @Input() dataSource: Subject<MatTableDataSource<IMovie>>;
 
  @ViewChild('paginator') paginator: MatPaginator;

  constructor() { }

  ngOnInit(){

    //subscrition to input data source event -> adding the paginator
    this.dataSource.subscribe(data => { 
      this.moviesData = data;
      data.paginator = this.paginator;
    });
  }

}
