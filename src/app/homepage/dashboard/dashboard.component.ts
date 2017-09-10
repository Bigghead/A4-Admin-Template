import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  months = ['']

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
  }

  getRandomNum( num: number ){
    return Math.floor( Math.random() * num ) + 1;
  }


  getDash1Column() :string[]{

    let day = new Date().getDate();
    let arr = ['Visitors (June)'];

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
  

}
