import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router';
import { ArtModel } from 'src/app/models/art-model';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  item: ArtModel = {};
 
  constructor(
    private dataService: DataServiceService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getItemById(+params.get('id')!);
    });
  }

  getItemById(id: number): void{
    this.dataService.getItemById(id).subscribe(res => this.item = res)
  }
}
