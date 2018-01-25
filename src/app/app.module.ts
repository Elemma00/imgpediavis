import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule, UrlSerializer} from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { DynamicModule } from 'ng-dynamic-component';


/* Material */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

/* App components */
import { AppComponent } from './components/app/app.component';
import { MainComponent } from './components/main/main.component';
import { ImgDetailComponent } from './components/img-detail/img-detail.component';
import { QueryResultComponent } from './components/query-result/query-result.component';
import { ResultColImageComponent } from './components/query-result/result-col/image/result-col-image.component';
import { ResultColUrlComponent } from './components/query-result/result-col/url/result-col-url.component';
import { ResultColValComponent } from './components/query-result/result-col/val/result-col-val.component';


/* App services */
import {HttpService} from './services/http.service';

import {CustomUrlSerializer} from './utils/custom-url.serializer';
import { ResultColNullComponent } from './components/query-result/result-col/null/result-col-null.component';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'query', component: MainComponent},
  {path: 'query/:q', component: MainComponent},
  {path: 'detail/:filename', component: ImgDetailComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ImgDetailComponent,
    QueryResultComponent,
    MainComponent,
    ResultColUrlComponent,
    ResultColImageComponent,
    ResultColValComponent,
    ResultColNullComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: false}),
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    DynamicModule.withComponents([ResultColUrlComponent, ResultColImageComponent, ResultColValComponent, ResultColNullComponent])
  ],
  providers: [
    HttpService,
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
