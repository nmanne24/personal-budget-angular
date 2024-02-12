import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  public dataSource : any = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#33FFAF',
                '#FF3339',
                '#A8ADA9',
            ]
    }
    ],
      labels: []
  };
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res : any) => {
      for(var i = 0; i < res.my_monthly_budget.length; i++){
        this.dataSource.datasets[0].data[i] = res.my_monthly_budget[i].budget;
        this.dataSource.labels[i] = res.my_monthly_budget[i].title;
      }
      this.createChart();
    });

  }

  createChart() {
    //var ctx = document.getElementById("myChart").getContext("2d");
    var ctx = document.getElementById("myChart");
    var myPieChart = new Chart(ctx as any, {
        type: 'pie',
        data: this.dataSource
    });
  }


}
