import { Component } from '@angular/core';
import * as d3j from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3js',
  templateUrl: './d3js.component.html',
  styleUrls: ['./d3js.component.scss']
})
export class D3jsComponent {

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
  public data = [];
  private svg: any;
  private color: any;
  private height = 450;
  private width = 960;
  private radius = Math.min(this.width, this.height) / 2;

constructor(private dataService : DataService) {}

ngOnInit(): void{
  console.log('test');
  this.dataService.generateData().subscribe((res:any) => {
    for (var i = 0; i < res.my_monthly_budget.length; i++) {
      this.data  = res.my_monthly_budget;
    }

    this.generateChart();
  });
}

private generateChart(): void{
  this.svg = d3j
      .select("figure#pie")
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
      console.log('test');

  this.color = d3j
      .scaleOrdinal()
      .domain(this.data.map((d: any) => d.budget.toString()))
      .range(this.dataSource.datasets[0].backgroundColor);

      const pie = d3j.pie<any>().value((d: any) => Number(d.budget));


      this.svg
        .selectAll('p')
        .data(pie(this.data))
        .enter()
        .append('path')
        .attr('d', d3j.arc().innerRadius(0).outerRadius(this.radius))
        .attr('fill', (d: any, i: any) => this.color(i))
        .attr('stroke', '#FFFFFF')
        .style('stroke-width', '1px');


      const labelArc = d3j.arc()
        .innerRadius(this.radius - 30)
        .outerRadius(this.radius - 30);

      this.svg
        .selectAll('p')
        .data(pie(this.data))
        .enter()
        .append('text')
        .text((d: any) => d.data.title)
        .attr('transform', (d: any) => 'translate(' + labelArc.centroid(d) + ')')
        .style('text-anchor', 'middle')
        .style('font-size', 12);


}


}
