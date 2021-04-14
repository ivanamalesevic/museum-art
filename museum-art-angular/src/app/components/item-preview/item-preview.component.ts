import { Component, Input, OnInit } from '@angular/core';
import { ArtModel } from 'src/app/models/art-model';

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.scss']
})
export class ItemPreviewComponent implements OnInit {
  @Input() editIsEnabled = true;
  @Input() item: ArtModel = {};
  @Input() hidePreviewComponent = false;
  constructor() { }

  ngOnInit(): void {
  }

}
