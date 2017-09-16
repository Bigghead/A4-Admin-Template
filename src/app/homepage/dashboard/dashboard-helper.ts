import * as c3 from 'c3';
import Chart from 'chart.js'

export class DashHelper {

    months = ['January', 'February', 'March', 'April', 'May', 'June', 
              'July', 'August', 'September', 'October', 'November', 'December']

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


    getDash2Column() {

        let arr1 = ['Male'];
        let arr2 = ['Female'];

        for (let i = 0; i < 3; i++) {

            let num = 100;
            let malePercentage = this.getRandomNum(100);
            arr1.push(malePercentage.toString());
            arr2.push((num - malePercentage).toString());
        }

        return [arr1, arr2];
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
                //   this.getDash2Column(), 
                ['Male', '56' , '44', '65' ],
                ['Female', '44', '56' , '35']
              ],
              // types: {
              //   'Male': 'bar',
              //   'Female': 'bar'
              // }
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


    buildLineChart() {

        c3.generate({
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
        });
    }
}