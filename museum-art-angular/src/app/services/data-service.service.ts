import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ArtModel } from '../models/art-model';
import { tap } from 'rxjs/operators';
import { DataModel } from '../models/data-model';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private httpClient: HttpClient) {}

  getItems(): Observable<ArtModel> {
    let collection = JSON.parse(localStorage.getItem('collection')!);
    if (collection != null) {
      return of(collection);
    }

    return this.httpClient
      .get(`http://localhost:3030/getCollection`)
      .pipe(
        tap((data) => localStorage.setItem('collection', JSON.stringify(data)))
      );
  }

  getItemById(id: number): Observable<ArtModel> {
    let item = JSON.parse(localStorage.getItem(`item${id}`)!);
    if (item !== null) {
      return of(item);
    }

    return this.httpClient
      .get(`http://localhost:3030/getItemById/${id}`)
      .pipe(
        tap((data) =>
          localStorage.setItem(`item${data.id}`, JSON.stringify(data))
        )
      );
  }

  updateItem(item: ArtModel): void {
    this.httpClient
      .put('http://localhost:3030/updateItem', {
        item: {
          id: item.id,
          name: item.name,
          url: item.url,
          description: item.description,
          type: item.type,
        },
      })
      .subscribe((data) => {
        localStorage.setItem(
          `item${item.id}`,
          JSON.stringify((data as DataModel).item)
        );
        localStorage.setItem(
          'collection',
          JSON.stringify((data as DataModel).tree)
        );
      });
  }
}
