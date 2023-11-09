import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor(private http:HttpClient) { }

  apiURL = 'https://jsonplaceholder.typicode.com/todos';

  getTableData() : Observable<any> {
    return this.http.get<any>(this.apiURL);
  }
}
