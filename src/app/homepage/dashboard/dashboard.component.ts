import { DashHelper } from './dashboard-helper';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';
import Chart from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private dashHelper: DashHelper ) { }

  @ViewChild('radar') radar: ElementRef;
  @ViewChild('line') line: ElementRef;
  

  ngOnInit() {

     this.dashHelper.drawChart1();
     this.dashHelper.drawChart2();
     this.dashHelper.buildRadarChart( this.radar );
     this.dashHelper.buildLineChart();
  }


  ngAfterViewInit(){
    setTimeout( () => {
      let datePicker = <HTMLElement> document.querySelector('.datepicker-container');
      datePicker.style.zIndex = '0';
      datePicker.style.margin = '0 auto';      
      // datePicker.className += " datepicker-small"
    }, 500)
   
  }

}
