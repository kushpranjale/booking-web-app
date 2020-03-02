import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomePageComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  building_name: string;
  status = false;
  imageStatus = true;
  constructor() { }

  ngOnInit() {
  }
    OnOver( building: string) {
    //   this.imageStatus = false;
    // console.log(building);
    // this.status = true;
    this.building_name = 'A building     ok';
    }
    onOut() {
    // this.status = false;
    // this.imageStatus = true;
    }
}
