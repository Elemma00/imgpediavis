import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { DynamicModule } from 'ng-dynamic-component';

/* Material */
import { MatCardModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

/* App components */
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';
import { QueryResultComponent } from './query-result/query-result.component';
import { SparqlResultImageComponent } from './query-result/results/sparql-result-image/sparql-result-image.component';
import { SparqlResultUrlComponent } from './query-result/results/sparql-result-url/sparql-result-url.component';
import { SparqlResultValComponent } from './query-result/results/sparql-result-val/sparql-result-val.component';


/* App services */
import {MainService} from './main.service';
import {CompCommunicationService} from './comp-communication.service';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'query', component: QueryResultComponent},
  {path: 'detail/:filename', component: ImgDetailComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ImgDetailComponent,
    QueryResultComponent,
    MainComponent,
    SparqlResultUrlComponent,
    SparqlResultImageComponent,
    SparqlResultValComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    DynamicModule.withComponents([SparqlResultUrlComponent, SparqlResultImageComponent, SparqlResultValComponent])
  ],
  providers: [MainService, CompCommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
