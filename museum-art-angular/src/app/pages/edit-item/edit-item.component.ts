import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  item: ArtModel = {};
  itemPreview: ArtModel = {};
  // hideEditComponent: boolean = false;
  constructor(
    private stateService: StateServiceService,
    public router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService
  ) {
    this.stateService.hideTree.next(true);
    this.stateService.editIsEnabled.next(false);
    // this.stateService.hideEditComponent.next(false);
  }
  ngOnDestroy(): void {
    this.stateService.hideTree.next(false);
    this.stateService.editIsEnabled.next(true);
  }

  ngOnInit(): void {
    // this.stateService.hideEditComponent.subscribe(
    //   (res) => (this.hideEditComponent = res)
    // );
    this.route.paramMap.subscribe(
      (params) =>
        {
          if(params.get('id')){
            this.dataService.getItemById(+params.get('id')!).subscribe(
              res => {
                this.item = res;
                this.itemPreview = res;
              }
            )
          }
          
        }
    );
  }

  saveEditedItem(form: NgForm): void {
    this.item.name = form.value.title;
    this.item.url = form.value.url;
    this.item.description = form.value.description;
    this.dataService.updateItem(this.item).subscribe((res) => {
      if (res) {
        this.stateService.updateTree.next(true);
        this.router.navigate([`item/${this.item.id}`]);
      }
    });
  }

  previewEdit(form: NgForm): void {
    this.itemPreview.name = form.value.title;
    this.itemPreview.url = form.value.url;
    this.itemPreview.description = form.value.description;
  }
}
