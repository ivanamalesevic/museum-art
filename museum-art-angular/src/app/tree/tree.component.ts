import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface CollectionNode {
  name?: string;
  collection?: CollectionNode[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  public tree: CollectionNode[] = [];
  nestedTreeControl = new NestedTreeControl<CollectionNode>(node => node.collection);
  nestedDataSource: any = new MatTreeNestedDataSource<any>();

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getItems();
    this.nestedDataSource.data = this.tree;
    console.log(this.nestedDataSource.data)
  }

  getItems() {
    let col = JSON.parse(localStorage.getItem('collection')!);
    if (col === null) {
      this.httpClient
        .get('http://localhost:3030/getCollection')
        .toPromise()
        .then((response) => {
          if (response !== undefined && response !== null) {
            localStorage.setItem('collection', JSON.stringify(response));
            this.tree.push(response)
          }
        })
        .catch((err) => console.error(err));
    } else {
      this.tree.push(col)
    }
  }

  hasChild = (_: number, node: any) => !!node.collection && node.collection.length > 0
}
