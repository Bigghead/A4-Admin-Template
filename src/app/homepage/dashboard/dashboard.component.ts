import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as c3 from 'c3';
import Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  @ViewChild('radar') radar: ElementRef;

  months = ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December']

  

  ngOnInit() {

    c3.generate( {
      bindto: '#dash-chart-1',
      data: {
      columns: [
        this.getDash1Column()
        ]
      }
    } );

    c3.generate( { 
      bindto: '#dash-chart-2',
      data: {
        columns : this.getDash2Column(), 
        // types: {
        //   'Male': 'bar',
        //   'Female': 'bar'
        // }
        type: 'bar',
        groups: [ 
          ['Male', 'Female']
        ]
      },
      axis: {
        x: {
          type: 'category', 
          categories: [ '2015', '2016', '2017']
        }, 
        y: {
          max: 90
        }
      }
     } )

     this.buildRadarChart();
  }

  getRandomNum( num: number ){
    return Math.floor( Math.random() * num ) + 1;
  }


  getDash1Column() :string[]{

    let day = new Date().getDate();
    let arr = [`Visitors (${ this.months[ new Date().getMonth()] })`];

    for( let i = 0 ; i <= day; i ++ ){
      arr.push( this.getRandomNum( 100 ).toString() )
    }
    return arr;
  }

  getDash2Column(){

    let arr1 = ['Male'];
    let arr2 = ['Female'];

    for( let i = 0 ; i < 3; i ++ ) {

      let num = 100; 
      let malePercentage = this.getRandomNum( 100 );
      arr1.push( malePercentage.toString() );
      arr2.push( ( num - malePercentage ).toString() );
    }
    
    return [ arr1, arr2 ];
  }


  buildRadarChart(){

    let ctx = this.radar.nativeElement;
    
    let data = {
      labels: ['Angular', 'React', 'Vue', 'Ember', 'Polymer', 'Preact'],
      datasets: [ { 
        backgroundColor: "rgba(200,0,0,0.2)",
        data: [ 9, 9 , 8, 7, 6, 5]
       } ]
    }

    const myChart = new Chart( ctx, {
      type: 'radar',
      data, 
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    } )

  }
  

}
