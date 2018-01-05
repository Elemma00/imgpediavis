import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';


const routes: Routes = [
  {path: 'detail', component: ImgDetailComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ImgDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
