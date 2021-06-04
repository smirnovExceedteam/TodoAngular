import {Component, OnInit} from '@angular/core';
import {LoginService} from  '../../services/login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username:string = ""
  password:string = ""
  isRegister:boolean = false
  message: string = "don't have an account?"

  constructor (private loginService: LoginService){}

  ngOnInit(): void {
  }

  public submit(){
    this.isRegister? this.submitToRegister(): this.submitToLogin()
  }
  public submitToLogin(){
    if(!this.username.trim() && !this.password.trim()) return
    this.loginService.login(this.username,this.password)
    this.username = ""
    this.password = ""
  }

  public  submitToRegister(){
    if(!this.username.trim() && !this.password.trim()) return
    this.loginService.register(this.username,this.password)
    this.username = ""
    this.password = ""
  }

  public changeToRegiste(){
    this.isRegister = !this.isRegister
    this.isRegister ?  this.message = "already have an account?" : this.message = "don't have an account?"
  }

}
