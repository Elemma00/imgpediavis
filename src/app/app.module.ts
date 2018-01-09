import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

/* Material */
import { MatCardModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';

/* App components */
import { AppComponent } from './app.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';

/* App services */
import {MainService} from './main.service';

const routes: Routes = [
  {path: 'detail/:filename', component: ImgDetailComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ImgDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    MatCardModule,
    MatGridListModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
