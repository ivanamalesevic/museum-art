import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {
  hideTree = new BehaviorSubject<boolean>(false);
  showPreview = new BehaviorSubject<boolean>(false);
  constructor() { }
}
