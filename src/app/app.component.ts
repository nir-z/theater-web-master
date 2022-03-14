import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  host: {
    class:'content'
  },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-starter';
}
