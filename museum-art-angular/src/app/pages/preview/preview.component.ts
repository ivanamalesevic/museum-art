import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router';
import { ArtModel } from 'src/app/models/art-model';
import { Subscription } from 'rxjs';
import { StateServiceService } from 'src/app/services/state-service.service';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  item: ArtModel = {};
  editIsEnabled: boolean = true;
  subscription: Subscription;
  constructor(
    private dataService: DataServiceService,
    private route: ActivatedRoute,
    public router: Router,
    private stateService: StateServiceService
  ) {
    this.subscription = this.stateService.editIsEnabled.subscribe(res => this.editIsEnabled = res)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getItemById(+params.get('id')!);
    });
  }

  getItemById(id: number): void{
    this.dataService.getItemById(id).subscribe(res => this.item = res)
  }
}
