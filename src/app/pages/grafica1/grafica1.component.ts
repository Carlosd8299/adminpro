import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  constructor() {}
  lables1 : string[] =  [ 'Dato2', 'Dato3', 'Dato4' ];
  data1: ChartData<'doughnut'> = {
    labels: this.lables1,
    datasets: [
      { data: [ 10, 10, 100 ],
        
      //hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
  };
  
  ngOnInit(): void {}
  // Doughnut
}
