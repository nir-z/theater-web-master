import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesDashboardComponent } from './components/movies-dashboard/movies-dashboard.component';


@NgModule({
    imports: [
      RouterModule.forChild([
        { path: '', component: MoviesDashboardComponent }

      ])
    ],
    exports: [RouterModule]
  })
  export class TheaterRoutingModule {}
