import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtModel } from 'src/app/models/art-model';
import { StateServiceService } from 'src/app/services/state-service.service';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit, OnDestroy {
  item: ArtModel = {};
  constructor(private stateService: StateServiceService,  private route: ActivatedRoute, public router: Router) {
    this.stateService.hideTree.next(true)
  }
  ngOnDestroy(): void {
    this.stateService.hideTree.next(false);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => this.item = JSON.parse(localStorage.getItem(`item${+params.get('id')!}`)!));
  }
  

}
