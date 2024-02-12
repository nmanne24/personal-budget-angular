import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
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
            ]
    }
    ],
      labels: []
  };

  constructor(private http: HttpClient) {}
  // ngOnInit(): void {
  generateData(){
    if(this.dataSource.datasets[0].data.length === 0){
      return this.http.get('http://localhost:3000/budget');
    }else{
      return of(this.dataSource);
    }
  }
}
