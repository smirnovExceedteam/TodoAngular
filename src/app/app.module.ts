import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { FooterComponent } from './components/footer/footer.component';
import { BorderOfTasksComponent } from './components/border-of-tasks/border-of-tasks.component';
import { LogoComponent } from './components/logo/logo.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import { IndexComponent } from './components/index/index.component'
import {FormsModule} from "@angular/forms";
import { StorageServiceModule } from 'ngx-webstorage-service';
import {AuthInterceptor} from "./services/httpIntercepter.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";


const appRoutes: Routes =[
  { path: 'tasks', component: IndexComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '',   redirectTo: '/tasks', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FooterComponent,
    BorderOfTasksComponent,
    LogoComponent,
    TaskItemComponent,
    LoginComponent,
    IndexComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
