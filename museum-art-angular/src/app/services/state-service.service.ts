import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {
  hideTree = new BehaviorSubject<boolean>(false);
  editIsEnabled = new BehaviorSubject<boolean>(true);
  constructor() { }
}
