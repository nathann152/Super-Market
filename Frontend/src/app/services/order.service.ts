import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderModel } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private http: HttpClient) { }
  
  public addOrder(order: OrderModel): Observable<any> {
    return this.http.post<OrderModel>(environment.orderUrl, order);
  }
  public getAllOrder(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(environment.orderUrl + 'get-all-orders');
  }
  
  public receiptDownload(name: string){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      responseType: 'blob' as 'blob'
  };
  
      return this.http.get('http://localhost:4200/assets/receipt/b36d223f-423a-4d05-b04f-c972e230d64a.txt',httpOptions);
    }
}
