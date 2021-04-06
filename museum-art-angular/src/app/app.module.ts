import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { TreeComponent } from './tree/tree.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PreviewComponent } from './pages/preview/preview.component';
import { RouterModule } from '@angular/router';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    PreviewComponent,
    EditItemComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatRadioModule,
    MatInputModule,
    MatTreeModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule.forRoot([
      {
        path: 'item/:id/edit',
        redirectTo: 'item/:id/edit',
      },
      {
        path: 'item/:id',
        component: PreviewComponent,
        children: [{ path: 'edit', redirectTo: '../edit' }],
      },
    ]),
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
