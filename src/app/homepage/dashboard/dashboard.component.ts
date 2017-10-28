import { HttpClient } from '@angular/common/http';
import { DashHelper } from './dashboard-helper';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { jqxCalendarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxcalendar';
import Chart from 'chart.js'; 
import * as c3 from 'c3';
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
  @ViewChild('donutChart') donutChart: ElementRef;

  weatherData;
  dashDemo: string = 'chart';
  dashChartDemo: string = 'chart';
  socialLogin = [
    { name: 'Twitter', class: 'fa fa-twitter fa-lg', checked: true },
    { name: 'Facebook', class: 'fa fa-facebook fa-lg', checked: false },
    { name: 'Google+', class: 'fa fa-google-plus fa-lg', checked: true },
    { name: 'LinkedIn', class: 'fa fa-linkedin fa-lg', checked: true },
    { name: 'Instagram', class: 'fa fa-instagram fa-lg', checked: false }
  ];
  friendList = [
    { name : 'Hello 1', invited: true },
    { name : 'Hello 2', invited: false },
    { name : 'Hello 3', invited: false },
    { name : 'Hello 4', invited: false },
    { name : 'Hello 5', invited: true },
    { name : 'Hello 6', invited: false }
  ];
  allChecked: boolean = false;
  clearList = [
    { name:'Karl', color: "#FF6384", number: 57 },
    { name:'Layla', color: "#36A2EB", number: 24 },
    { name:'Max', color: "#FFCE56", number: 33 },
    { name:'Dodo', color: '#00d9f9', number: 11 }, 
    { name:'Kero', color: '#a4c73c', number: 67 }
  ]
  

  ngOnInit() {

     this.dashHelper.drawChart1();
     this.dashHelper.drawChart2();
     this.dashHelper.buildRadarChart( this.radar );
     this.dashHelper.buildLineChart();
     this.dashHelper.buildBarChart();
     this.dashHelper.buildDonut( this.donutChart );
     this.getWeather();
  }


  getWeather(){

    this.http.get('http://ip-api.com/json')
        .switchMap( res => {
          return this.http.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${res['city']},${res['country']}&appid=332aac2b0595764b02d7634b86a9b463`)
        } )
        .subscribe( res => {
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

  


  changeInvite( index: number ){
    this.friendList[index].invited = !this.friendList[index].invited
  }

  toggleAll(){
    if( !this.allChecked ){
      this.friendList.forEach( fr => fr.invited = true )
    } else {
      this.friendList.forEach( fr => fr.invited = false )
    }
  }

}
