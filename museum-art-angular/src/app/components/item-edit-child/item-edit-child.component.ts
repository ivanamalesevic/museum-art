import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtModel } from 'src/app/models/art-model';
import { DataServiceService } from 'src/app/services/data-service.service';
import { StateServiceService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-item-edit-child',
  templateUrl: './item-edit-child.component.html',
  styleUrls: ['./item-edit-child.component.scss']
})
export class ItemEditComponentChild implements OnInit {

  item: ArtModel = {};
  constructor(private stateService: StateServiceService,
    private route: ActivatedRoute,
    public router: Router,
    private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) =>
        (this.item = JSON.parse(
          localStorage.getItem(`item${+params.get('id')!}`)!
        ))
    );
  }

  saveEditedItem(): void {
    this.item.name = (document.getElementById(
      'title'
    ) as HTMLInputElement).value;
    this.item.url = (document.getElementById('url') as HTMLInputElement).value;
    this.item.description = (document.getElementById(
      'description'
    ) as HTMLInputElement).value;
    this.dataService.updateItem(this.item);
    this.stateService.hideTree.next(false)
    this.stateService.hideEditComponent.next(true)
  }

}
