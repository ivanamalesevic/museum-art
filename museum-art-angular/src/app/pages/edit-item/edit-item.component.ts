import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtModel } from 'src/app/models/art-model';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StateServiceService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit, OnDestroy {
  // item: ArtModel = {};
  hideEditComponent: boolean = false;
  constructor(
    private stateService: StateServiceService,
    private route: ActivatedRoute,
    public router: Router,
    private dataService: DataServiceService
  ) {
    this.stateService.hideTree.next(true);
    this.stateService.editIsEnabled.next(false);
    
  }
  ngOnDestroy(): void {
    this.stateService.hideTree.next(false);
    this.stateService.editIsEnabled.next(true);
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(
    //   (params) =>
    //     (this.item = JSON.parse(
    //       localStorage.getItem(`item${+params.get('id')!}`)!
    //     ))
    // );
    this.stateService.hideEditComponent.subscribe(res => this.hideEditComponent = res)
  }

  // saveEditedItem(): void {
  //   this.item.name = (document.getElementById(
  //     'title'
  //   ) as HTMLInputElement).value;
  //   this.item.url = (document.getElementById('url') as HTMLInputElement).value;
  //   this.item.description = (document.getElementById(
  //     'description'
  //   ) as HTMLInputElement).value;
  //   this.dataService.updateItem(this.item);
  //   this.stateService.hideTree.next(false)
  //   this.stateService.hideEditComponent.next(true)
  // }
}
