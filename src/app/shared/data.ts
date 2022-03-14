import { environment } from 'src/environments/environment';

export const END_POINTS = {
    movies: {
      searchMovie: '/search/movie?query={query}&api_key={apiKey}',
      addMovie: 'v1/movies',
      getAllMovies: 'v1/movies'
    }
}

export const LOCAL_STORAGE_KEYS =
{
    typeaheads:{
      
        typeaheadTrie : 'typeaheadTrie'
    }

}