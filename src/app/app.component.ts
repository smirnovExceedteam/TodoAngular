import { Component, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
  text: string = ""
  input = false;

  onKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.text = String(event.target.value).trim()
      event.target.value = ""
    }
  }

  constructor() {
    setTimeout(() => {
      this.input = true
    }, 10000)
  }

}
