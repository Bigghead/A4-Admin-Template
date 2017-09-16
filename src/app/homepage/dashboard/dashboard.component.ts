import { HttpClient } from '@angular/common/http';
import { DashHelper } from './dashboard-helper';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';
import Chart from 'chart.js';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private dashHelper: DashHelper,
               private http: HttpClient ) { }

  @ViewChild('radar') radar: ElementRef;
  @ViewChild('line') line: ElementRef;

  weatherData;
  

  ngOnInit() {

     this.dashHelper.drawChart1();
     this.dashHelper.drawChart2();
     this.dashHelper.buildRadarChart( this.radar );
     this.dashHelper.buildLineChart();
     this.getWeather();
  }


  ngAfterViewInit(){
    setTimeout( () => {
      let datePicker = <HTMLElement> document.querySelector('.datepicker-container');
      datePicker.style.zIndex = '0';
      datePicker.style.margin = '0 auto';            
      // datePicker.className += " datepicker-small"
    }, 100)
   
  }


  getWeather(){

    this.http.get('http://ip-api.com/json')
        .switchMap( res => {
          return this.http.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${res['city']},${res['country']}&appid=332aac2b0595764b02d7634b86a9b463`)
        } )
        .subscribe( res => {
          console.log( res );
          this.weatherData = res;
        } )
  }

  tempChange( temp){
    return Math.round(temp * 9/5 - 459.67);
  }

}
