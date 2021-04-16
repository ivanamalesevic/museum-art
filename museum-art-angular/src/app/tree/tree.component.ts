import { Component, OnDestroy, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataServiceService } from '../services/data-service.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StateServiceService } from '../services/state-service.service';
import { ArtModel } from '../models/art-model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, OnDestroy {
  filteredData = new MatTreeNestedDataSource<ArtModel>();
  filterTree = new BehaviorSubject<boolean>(false);
  subscription: Subscription;
  filterSubscription: Subscription;
  nestedTreeControl = new NestedTreeControl<ArtModel>(
    (node) => node.collection
  );
  nestedDataSource: any = new MatTreeNestedDataSource<ArtModel>();
  selectedRadio: string = 'all';
  searchName: string = '';
  constructor(
    private dataService: DataServiceService,
    private stateService: StateServiceService
  ) {
    this.subscription = this.stateService.updateTree.subscribe((res) => {
      if (res) {
        this.initTree();
        this.stateService.updateTree.next(false);
      }
    });

    this.filterSubscription = this.filterTree.subscribe((res) => {
      if (res) {
        this.nestedDataSource.data = null;
        this.nestedDataSource.data = this.filteredData.data;
        this.nestedTreeControl.dataNodes = this.nestedDataSource.data;
        this.nestedTreeControl.expandAll();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getItems();
  }

  initTree(): void {
    this.nestedTreeControl.dataNodes = this.nestedDataSource.data;
    this.nestedTreeControl.expandAll();
  }

  getItems(): void {
    this.dataService.getItems().subscribe((res) => {
      this.nestedDataSource.data[0] = res;
      this.initTree();
    });
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
    this.nestedDataSource.data[0] = JSON.parse(
      localStorage.getItem('collection')!
    );
    this.filteredData.data[0] = JSON.parse(localStorage.getItem('collection')!);
    this.filteredData.data[0].collection = this.nestedDataSource.data[0].collection.map(
      (collection: any) => {
        collection.collection = collection.collection.filter((item: any) => {
          if (
            (this.selectedRadio === 'all' ||
              this.selectedRadio === item.type) &&
            (this.searchName === '' ||
              item.name.toLowerCase().includes(this.searchName.toLowerCase()))
          )
            return item;
        });
        return collection;
      }
    );
    this.filterTree.next(true);
  }
}
