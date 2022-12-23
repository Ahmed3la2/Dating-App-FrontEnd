import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {User} from '../app/_model/user.model'
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private accountservices:AccountService, private presence:PresenceService){}
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
   const user: User = JSON.parse(localStorage.getItem("user")!);
   if(user){
     this.accountservices.setCurrentUser(user);
     this.presence.createHubConnection(user);
   }
  }

  logOut(){
    this.accountservices.logout();
    this.presence.stopHubConnection()
  }

  title = 'client';

}
