import { Component, Input, OnInit } from '@angular/core';
import { ArtModel } from 'src/app/models/art-model';

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.css']
})
export class ItemPreviewComponent implements OnInit {
  @Input() editIsEnabled = true;
  @Input() item: ArtModel = {};
  constructor() { }

  ngOnInit(): void {
  }

}
