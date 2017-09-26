import * as c3 from 'c3';
import Chart from 'chart.js'

export class DashHelper {

    months = ['January', 'February', 'March', 'April', 'May', 'June', 
              'July', 'August', 'September', 'October', 'November', 'December']



    randomNumber() {
      return Math.floor(Math.random() * 256);
    }

    drawChart1(){
        c3.generate( {
            bindto: '#dash-chart-1',
            data: {
              x: 'x',
              columns: [
                ['x', '2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01', '2017-06-01', '2017-07-01', '2017-08-01', '2017-09-01'],
                ['data1', 66, 289, 177, 424, 150, 251, 323, 577, 611]
              ],
              type: 'area'
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
    }


    drawChart2(){

        c3.generate( { 
            bindto: '#dash-chart-2',
            data: {
              columns : [
                ['Male', '56' , '44', '65' ],
                ['Female', '44', '56' , '35']
              ],
              type: 'bar',
              groups: [ 
                ['Male', 'Female']
              ],
              colors: {
                  Male: 'rgb(57, 147, 237)', 
                  Female: 'rgb(242, 12, 127)'
              }
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


    buildRadarChart( el ) {

        let ctx = el.nativeElement;

        let data = {
            labels: ['Angular', 'React', 'Vue', 'Ember', 'Polymer', 'Preact'],
            datasets: [
                {
                    label: 'Popularity',
                    backgroundColor: "rgba(228, 41, 228, .5)",
                    data: [9, 9, 8, 7, 6, 5]
                }, {
                    label: 'Ease of Use',
                    backgroundColor: "rgba(75, 225, 75, .5)",
                    data: [7, 8, 9, 7, 6, 9]
                }]
        }

        const myChart = new Chart(ctx, {
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
        })

    }

    
    buildDonut( el ){

        let newArr = [];
        for ( let i = 0 ; i <= 5; i ++ ){
            newArr.push(`rgba(${this.randomNumber()}, ${this.randomNumber()}, ${this.randomNumber()}, 0.8)`)
        }
        
        const myChart = new Chart(el.nativeElement, {
            type: 'doughnut',
            data: {
                datasets: [ {
                    data: [57, 24, 33, 11, 67],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        '#00d9f9', 
                        '#a4c73c'
                    ]
                } ],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Karl',
                    'Layla',
                    'Max',
                    'Dodo',
                    'Kero'
                ]
                
            }

        } )
    }


    buildLineChart() {

        c3.generate( {
            bindto: '#linejs',
            data: {
                type: 'bar',
                columns: [
                    ['data1', 30, 50, 77, 120, 100, 65, 150, 120, 90, 77, 55]
                ],
                colors: {
                    data1: '#a0dfcc'
                }
            },
            axis: {
                x: { show: false },
                y: { show: false }
            },
            legend: {
                show: false
            }
        } );
    }

    buildBarChart(){
       c3.generate( { 
            bindto: '#barjs',
            data: {
              columns : [
                ['Atom', '56' , '44', '25', '17', '30', '20', '19'],
                ['VSCode', '10', '30' , '25', '32', '42', '28', '70']
              ],
              type: 'bar',
              groups: [ 
                ['Atom', 'VSCode']
              ],
              colors: {
                  Atom: '#D67F6B',
                  VSCode: '#debc85' 
              }
            },
            axis: {
              x: {
                type: 'category', 
                categories: [ '0', '1', '2', '3', '4', '5'],
                show: false
              }, 
              y: {
                max: 90
              }
            }
           } )
    }
}