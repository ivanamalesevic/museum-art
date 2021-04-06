import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private httpClient: HttpClient) { }

  getItems() {
    let col = JSON.parse(localStorage.getItem('collection')!);
    if (col === null) {
      this.httpClient.get('http://localhost:3030/getCollection').subscribe(
        (res) => {
          if (res !== undefined && res !== null) {
            localStorage.setItem('collection', JSON.stringify(res));
            col = res;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } 
    return col;
  }
}
