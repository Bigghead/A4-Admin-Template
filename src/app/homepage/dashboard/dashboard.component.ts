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
  @ViewChild('line') line: ElementRef

  months = ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December']

  

  ngOnInit() {

    c3.generate( {
      bindto: '#dash-chart-1',
      data: {
        x: 'x',
      columns: [
        ['x', '2013-04-01', '2013-05-02', '2013-06-03', '2013-07-04', '2013-08-05', '2013-09-06'],
        ['data1', 30, 200, 100, 400, 150, 250]
        ]
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: function (x) {
                    // if((x.getMonth()+1) % 6 === 0) {
                    //     return ('0' + (x.getMonth()+1)).slice(-2) + '/' + x.getFullYear().toString().substr(2,2);
                    // }
                    return   '0' + (new Date(x.toString()).getMonth() + 1) + '/' + new Date(x.toString()).getFullYear().toString().substr(2, 2);
                }
            }
        }
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
     this.buildLineChart();
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
      datasets: [ 
        { 
          label: 'Popularity',
          backgroundColor: "rgba(228, 41, 228, .2)",
          data: [ 9, 9 , 8, 7, 6, 5]
        }, {
          label: 'Ease of Use',
          backgroundColor: "rgba(75, 225, 75, .2)",
          data: [7, 8, 9, 7, 6, 9]
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


  buildLineChart(){

    // let ctx = this.line.nativeElement.getContext('2d');

    // const lineChart = new Chart( ctx, {
    //   type: 'bar', 
    //    data: {
    //   labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    //   datasets: [
    //     {
    //       label: "Population (millions)",
    //       backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
    //       data: [2478,5267,734,784,433]
    //     }
    //   ]
    // },
    // options: {
    //   legend: { display: false }, 
    //   scaleFontSize:0,
    //   scales: {
    //     yAxes: [{
    //       dsiplay: false,
    //     }]
    //   }
    // }
    // })
    c3.generate({
    bindto: '#linejs',
    data: {
        type: 'bar',
        columns: [
            ['data1', 30,50, 77, 120, 100, 65, 150, 120, 90, 77, 55]
        ],
        colors: {
          data1: '#a0dfcc'
        }
    },
        axis: {
            x: {show:false},
            y: {show:false}
        },
        legend: {
          show: false
        }
});
  }
  

}
