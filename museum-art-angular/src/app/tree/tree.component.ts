import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataServiceService } from '../services/data-service.service';
import { BehaviorSubject } from 'rxjs';

interface CollectionNode {
  name?: string;
  collection?: CollectionNode[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  dataChange = new BehaviorSubject<CollectionNode[]>([]);
  nestedTreeControl = new NestedTreeControl<CollectionNode>(
    (node) => node.collection
  );
  nestedDataSource: any = new MatTreeNestedDataSource<any>();
  selectedRadio: string = 'all';
  searchName: string = '';
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.getItems()
    // this.dataChange.subscribe((data) => (this.nestedDataSource.data = data));

    this.nestedTreeControl.dataNodes = this.nestedDataSource.data;
    this.nestedTreeControl.expandAll();
    
  }

  getItems(): void{
    this.dataService.getItems().subscribe(res => this.nestedDataSource.data.push(res))
  }

  hasChild = (_: number, node: any) =>
    !!node.collection && node.collection.length > 0;

  //radioChange
  handleRadioChange(e: any) {
    this.selectedRadio = e.value;
    this.updateDataSource();
  }

  //searchInputChange
  handleSearchInputChange(e: any) {
    this.searchName = e.target.value;
    this.updateDataSource();
  }

  //filtering the tree component
  updateDataSource() {
    this.nestedDataSource.data.pop();
    this.nestedDataSource.data.push(
      JSON.parse(localStorage.getItem('collection')!)
    );
    let filteredData: any = new MatTreeNestedDataSource<any>();
    filteredData.data.push(JSON.parse(localStorage.getItem('collection')!));
    filteredData.data[0].collection = this.nestedDataSource.data[0].collection.map(
      (collection: any) => {
        return collection.collection.filter((item: any) => {
          if (
            (this.selectedRadio === 'all' ||
              this.selectedRadio === item.type) &&
            (this.searchName === '' ||
              item.name.toLowerCase().includes(this.searchName.toLowerCase()))
          )
            return item;
        });
      }
    );
    this.dataChange.next(filteredData.data)
    console.log(this.nestedDataSource.data);
  }
}
