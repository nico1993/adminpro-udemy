import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  private progreso1:number = 20;
  private progreso2:number = 70;

  constructor() { }

  ngOnInit() {
  }

}
