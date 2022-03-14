import { Component, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoviesService } from '../../services/movies.service';
import { TypeaheadService } from '../../../../shared/services/typeahead-tries/typeahead.service';
import { TrieNode } from '../../../../shared/models/trie'
import { map, switchMap, debounceTime, tap } from 'rxjs/operators';
import { fromEvent, Observable, of } from 'rxjs';
import { IMovie } from '../../../models/movie';


const MIN_LENGTH_SEARCH = 2;

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss']
})



export class MoviesSearchComponent implements AfterViewInit {

  
  @ViewChild('search', { static: true }) searchInput!: ElementRef;
  searchResults: IMovie[];
  typeaheadResults: string[];
  @Output() onMovieAddedEvent = new EventEmitter<IMovie>();
 

  constructor(private matSnackBar: MatSnackBar,
     private moviesService: MoviesService,
     private typeaheadService: TypeaheadService) { }



  ngAfterViewInit(): void {

    fromEvent<InputEvent>(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(500),//used for filtering search request depending on the input rate
      map((e: InputEvent) => (e.target as HTMLInputElement).value),
      switchMap(value => value.length >= MIN_LENGTH_SEARCH ? this.getMoviesTypeahead(value) : of([]) )
    ).subscribe({
      next: (res) =>
      {
        console.log("res" + res);
        this.searchResults = null;
        this.typeaheadResults = res;
      },
      error: (err) =>
      {
        console.log(err);
        this.matSnackBar.open(`Failure fetching movies. See console log for more info`);
      }
    });

    
  }

  //returns list of relevent autocomplete suggestions based on the input
  getMoviesTypeahead(key: string): Observable<string[]>
  {
      return of(this.typeaheadService.searchNodeByPrefix(key).topWords);
  }

  //type ahead suggestion selected
  onTypeaheadClick(input: any, val: string){

    input.value = val;

  }


  //save movie in MongoDB
  addMovie(movieToAdd: IMovie){

    this.moviesService.addMovie(movieToAdd).subscribe({
      next: () =>
      {   
        // add the movie to grid upon successful post instead of refreshing the data set
        this.onMovieAddedEvent.emit(movieToAdd);
        this.matSnackBar.open(`Movie ${movieToAdd.title} was added`);
       
      },
      error: (err) => 
      {
        let errMsg;

        console.log(err);
        switch(err?.error?.code)
        {
          case 11000:
            errMsg= `Movie ${movieToAdd.title} already exists in db`;
            break;
          default:
            errMsg = `Failure adding movie ${movieToAdd.title}. See console log for more info`;

        }
        this.matSnackBar.open(errMsg);
      }
  })
  }

 // search from the movie db
  onSearchTitle(evt: any){

        let searchTerm = evt.value;
        this.typeaheadResults = null;

        this.moviesService.searchMovies(searchTerm).pipe(map(
        movies => 
            movies.map((movie:IMovie) =>  
            ({ 
                title: movie.title,
                id: movie.id,
                original_language: movie.original_language,
                popularity: movie.popularity,
                release_date: movie.release_date  
              } as IMovie)
            )))
            .subscribe({
              next: (res) =>
              {   
                  
                this.searchResults = res;
                if(res?.length > 0){

                  this.typeaheadService.InsertWordsToTrie(searchTerm,res.map(m => m.title))    
                }

              }
            });
  }

}
