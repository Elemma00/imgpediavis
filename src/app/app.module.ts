import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {Routes, RouterModule, UrlSerializer} from '@angular/router';

/* Libraries */
import { DynamicModule } from 'ng-dynamic-component';

/* Material */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

/* App components */
import { AppComponent } from './components/app/app.component';
import { MainComponent } from './components/main/main.component';
import { ImgDetailComponent } from './components/img-detail/img-detail.component';
import { QueryResultComponent } from './components/query-result/query-result.component';
import { ResultColImageComponent } from './components/query-result/result-col/image/result-col-image.component';
import { ResultColUrlComponent } from './components/query-result/result-col/url/result-col-url.component';
import { ResultColValComponent } from './components/query-result/result-col/val/result-col-val.component';
import { ResultColNullComponent } from './components/query-result/result-col/null/result-col-null.component';

/* App services */
import {HttpService} from './services/http.service';

/* Utils */
import {CustomUrlSerializer} from './utils/custom-url.serializer';


const routes: Routes = [
  {path: 'query', component: MainComponent},
  {path: 'query/:q', component: MainComponent},
  {path: 'detail/:filename', component: ImgDetailComponent},
//   {path: '', redirectTo: '/query', pathMatch: 'full' }, // Ruta por defecto
//   {path: '**', redirectTo: '/query' } // Ruta para manejar rutas no encontradas
];


@NgModule({ declarations: [
        AppComponent,
        ImgDetailComponent,
        QueryResultComponent,
        MainComponent,
        ResultColUrlComponent,
        ResultColImageComponent,
        ResultColValComponent,
        ResultColNullComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            RouterModule.forRoot(routes, {
                useHash: false,
                canceledNavigationResolution: 'computed',
                paramsInheritanceStrategy: 'always',
                urlUpdateStrategy: 'deferred'
            }),
            MatButtonModule,
            MatCardModule,
            MatGridListModule,
            MatProgressSpinnerModule,
            MatToolbarModule,
            MatTabsModule,
            DynamicModule]
        , providers: [
        HttpService,
        { provide: UrlSerializer, useClass: CustomUrlSerializer },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
