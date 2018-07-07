import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() private labels:string[];
  @Input() private data:number[];
  @Input() private type:string = 'doughnut';
  @Input() private leyenda:string;

  constructor() { }

  ngOnInit() {
  }

}
