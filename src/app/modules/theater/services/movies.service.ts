import { Injectable } from '@angular/core';
import { IMovie } from '../../models/movie';
import { ImoviesSearchResults } from '../../models/movies-search';
import { ApiService } from '../../../shared/services/api/api.service';
import { environment } from 'src/environments/environment';
import { END_POINTS } from 'src/app/shared/data';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  constructor(private apiService: ApiService) { }

  searchMovies(key: string): Observable<IMovie[]>
  {
        let domain = environment.movieDbApiUrl;
        let apiKey = environment.apiKey;
        let resource = END_POINTS.movies.searchMovie.replace("{query}",key).replace("{apiKey}",apiKey);

        return this.apiService.get<ImoviesSearchResults>(domain + resource)
        .pipe(map(r => r.results));

  }

  getMovies(): Observable<IMovie[]>
  {
    let domain = environment.mongoApiUrl;
    return this.apiService.get<IMovie[]>(`${domain}/${END_POINTS.movies.getAllMovies}`);

  }

  addMovie(movie: IMovie)
  {

    let domain = environment.mongoApiUrl;
    return this.apiService.post<IMovie>(`${domain}/${END_POINTS.movies.addMovie}`, movie);

  }

}
