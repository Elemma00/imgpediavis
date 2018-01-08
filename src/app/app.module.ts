import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';

import {MainService} from './main.service';

const routes: Routes = [
  {path: ':filename', component: ImgDetailComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ImgDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
