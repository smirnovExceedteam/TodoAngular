import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { FooterComponent } from './components/footer/footer.component';
import { BorderOfTasksComponent } from './components/border-of-tasks/border-of-tasks.component';
import { LogoComponent } from './components/logo/logo.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FooterComponent,
    BorderOfTasksComponent,
    LogoComponent,
    TaskItemComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
