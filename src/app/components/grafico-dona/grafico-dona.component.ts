import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() public labels:string[];
  @Input() public data:number[];
  @Input() public type:string = 'doughnut';
  @Input() public leyenda:string;

  constructor() { }

  ngOnInit() {
  }

}
