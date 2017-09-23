import { HttpClient } from '@angular/common/http';
import { DashHelper } from './dashboard-helper';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';
import Chart from 'chart.js';
import * as GMaps from 'gmaps';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

declare const google: any;


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
  dashDemo: string = 'chart';
  

  ngOnInit() {

     this.dashHelper.drawChart1();
     this.dashHelper.drawChart2();
     this.dashHelper.buildRadarChart( this.radar );
     this.dashHelper.buildLineChart();
     this.getWeather();
    //  this.getMap();
  }


  ngAfterViewInit(){

    this.checkDatepicker();
  }


  getWeather(){

    this.http.get('http://ip-api.com/json')
        .switchMap( res => {
          return this.http.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${res['city']},${res['country']}&appid=332aac2b0595764b02d7634b86a9b463`)
        } )
        .subscribe( res => {
          console.log( res );
          this.weatherData = res;
          this.getMap();
        } )
  }


  tempChange( temp){
    return Math.round(temp * 9/5 - 459.67);
  }


  getMap(){

    const map = new GMaps( {
      el: '#gMap',
      lat: this.weatherData.coord.lat,
      lng: this.weatherData.coord.lon
    } );
  }

  checkDatepicker(){

    setTimeout( () => {
      
      let datePicker = <HTMLElement> document.querySelector('.datepicker-container');
      if( !datePicker ) { return this.checkDatepicker(); };

      datePicker.style.zIndex = '0';
      datePicker.style.margin = '0 auto';            
    }, 100)
  }

}
