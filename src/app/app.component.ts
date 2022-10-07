import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {User} from '../app/_model/user.model'
import { AccountService } from './_services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http : HttpClient, private accountservices:AccountService){}
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
   const user: User = JSON.parse(localStorage.getItem("user")!);
   this.accountservices.setCurrentUser(user);
  }

  logOut(){
    this.accountservices.logout();
  }

  title = 'client';

}
